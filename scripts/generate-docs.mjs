// Generates everything the docs derive from code (src/generated/ and public/downloads/ are gitignored):
//
//   node scripts/generate-docs.mjs           one run (prebuild / pretest); exits 1 on any error
//   node scripts/generate-docs.mjs --watch   regenerate on changes in src/pages and ../angular-pro (npm run dev)
//
// 1. src/generated/api.json — public API of the library from the ../angular-pro SOURCES (ts-morph): selector, entry
//    point (+ group facade), inputs / model() / outputs (alias, type, required, default, JSDoc), inputs contributed by
//    hostDirectives (`from`), content slots from JSDoc `@slot <select> <description>` (validated against
//    `<ng-content select>`), `@template` for template directives, services and exported interfaces.
//    A public input / model / output without JSDoc, or an inconsistent @slot, is an error.
// 2. src/generated/examples/** — `{component, source, title} satisfies DocExample` per `*.example.ts` (ADR 0005).
// 3. src/generated/snippets/** — one module per page with every file of `pages/**/snippets/`.
// 4. src/index.html — M_THEME_INIT_SCRIPT (from the library sources) between the `m-theme-init` markers.
// 5. public/downloads/*.css — theme starter files built from the library tokens (same output as docs-react).
import {existsSync, mkdirSync, readdirSync, readFileSync, rmSync, watch, writeFileSync} from 'node:fs'
import {basename, dirname, extname, join, relative, resolve, sep} from 'node:path'
import {Node, Project, SyntaxKind, TypeFormatFlags} from 'ts-morph'

const docsRoot = resolve(import.meta.dirname, '..')
const workspaceRoot = resolve(docsRoot, '..', 'angular-pro')
const libRoot = resolve(workspaceRoot, 'projects', 'mineralui')
const pagesRoot = resolve(docsRoot, 'src', 'pages')
const generatedRoot = resolve(docsRoot, 'src', 'generated')
const PACKAGE = '@banzamel/mineralui-angular'
const watchMode = process.argv.includes('--watch')

const toPosix = (path) => path.split(sep).join('/')

/** Writes only when the content changed, so `ng serve` does not rebuild for nothing. */
function writeIfChanged(path, content) {
    if (existsSync(path) && readFileSync(path, 'utf8') === content) return false
    mkdirSync(dirname(path), {recursive: true})
    writeFileSync(path, content)
    return true
}

function walk(dir, accept) {
    if (!existsSync(dir)) return []
    return readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) return walk(path, accept)
        return accept(path) ? [path] : []
    })
}

// ---------------------------------------------------------------------------------------------------------------
// 1. api.json
// ---------------------------------------------------------------------------------------------------------------

function createLibraryProject() {
    const project = new Project({
        compilerOptions: {
            strict: true,
            target: 99,
            module: 200, // preserve
            moduleResolution: 100, // bundler
            experimentalDecorators: true,
            skipLibCheck: true,
            baseUrl: workspaceRoot,
            paths: {[PACKAGE]: ['./projects/mineralui/src/index.ts'], [`${PACKAGE}/*`]: ['./projects/mineralui/*']},
        },
        skipAddingFilesFromTsConfig: true,
    })
    project.addSourceFilesAtPaths([
        toPosix(join(libRoot, '**', '*.ts')),
        `!${toPosix(join(libRoot, '**', '*.spec.ts'))}`,
        `!${toPosix(join(libRoot, '**', 'testing', '**'))}`,
        `!${toPosix(join(libRoot, '**', 'generated', '**'))}`,
    ])
    return project
}

/** Entry point of a library file: the nearest directory with ng-package.json. */
function entryPointOf(filePath) {
    let dir = dirname(filePath)
    while (dir.startsWith(libRoot)) {
        if (existsSync(join(dir, 'ng-package.json'))) {
            const path = toPosix(relative(libRoot, dir))
            return {dir, path, importPath: path === '' ? PACKAGE : `${PACKAGE}/${path}`}
        }
        dir = dirname(dir)
    }
    return null
}

const jsDocText = (node) =>
    node
        .getJsDocs()
        .map((doc) => doc.getDescription().trim())
        .filter(Boolean)
        .join('\n')

const jsDocTags = (node, tagName) =>
    node
        .getJsDocs()
        .flatMap((doc) => doc.getTags())
        .filter((tag) => tag.getTagName() === tagName)
        .map((tag) => (tag.getCommentText() ?? '').trim())

function decoratorArgs(cls, names) {
    const decorator = cls.getDecorators().find((item) => names.includes(item.getName()))
    const arg = decorator?.getArguments()[0]
    return decorator ? {name: decorator.getName(), options: Node.isObjectLiteralExpression(arg) ? arg : null} : null
}

function stringProperty(options, name) {
    const initializer = options?.getProperty(name)?.getInitializer?.()
    return initializer && Node.isStringLiteral(initializer) ? initializer.getLiteralText() : null
}

const SIGNAL_API = {
    input: {kind: 'input', required: false, optionsAt: 1},
    'input.required': {kind: 'input', required: true, optionsAt: 0},
    model: {kind: 'model', required: false, optionsAt: 1},
    'model.required': {kind: 'model', required: true, optionsAt: 0},
    output: {kind: 'output', required: false, optionsAt: 0},
}

const stripUndefined = (type) => type.replace(/\s*\|\s*undefined\b/g, '').trim()

function signalMembers(cls, errors) {
    const members = []
    for (const prop of cls.getProperties()) {
        const call = prop.getInitializer()
        if (!Node.isCallExpression(call)) continue
        const api = SIGNAL_API[call.getExpression().getText()]
        if (!api) continue
        const location = `${cls.getName()}.${prop.getName()}`
        if (prop.hasModifier(SyntaxKind.PrivateKeyword) || prop.hasModifier(SyntaxKind.ProtectedKeyword)) {
            errors.push(`${location}: ${api.kind} must be public`)
            continue
        }
        const description = jsDocText(prop)
        if (!description) errors.push(`${location}: public ${api.kind} without JSDoc`)

        const args = call.getArguments()
        const options = args[api.optionsAt]
        const alias = Node.isObjectLiteralExpression(options) ? stringProperty(options, 'alias') : null
        const explicitType = call.getTypeArguments()[0]?.getText()
        const inferred = prop
            .getType()
            .getTypeArguments()[0]
            ?.getText(prop, TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | TypeFormatFlags.NoTruncation)
        const hasDefault = api.kind !== 'output' && !api.required && args[0] !== undefined
        members.push({
            name: alias ?? prop.getName(),
            kind: api.kind,
            type: stripUndefined(explicitType ?? inferred ?? 'unknown') || 'void',
            required: api.required,
            default: hasDefault ? args[0].getText() : null,
            description,
            from: null,
        })
    }
    return members
}

function hostDirectiveMembers(cls, options, errors) {
    const array = options?.getProperty('hostDirectives')?.getInitializer?.()
    if (!array || !Node.isArrayLiteralExpression(array)) return []
    return array.getElements().flatMap((element) => {
        if (!Node.isObjectLiteralExpression(element)) return []
        const directiveNode = element.getProperty('directive')?.getInitializer?.()
        const inputsNode = element.getProperty('inputs')?.getInitializer?.()
        const declaration =
            directiveNode?.getSymbol()?.getAliasedSymbol()?.getDeclarations()[0] ??
            directiveNode?.getSymbol()?.getDeclarations()[0]
        if (!declaration || !Node.isClassDeclaration(declaration) || !Node.isArrayLiteralExpression(inputsNode)) {
            return []
        }
        const directiveMembers = signalMembers(declaration, errors)
        return inputsNode.getElements().flatMap((item) => {
            if (!Node.isStringLiteral(item)) return []
            const [inner, exposed] = item
                .getLiteralText()
                .split(':')
                .map((part) => part.trim())
            const member = directiveMembers.find((candidate) => candidate.name === inner)
            if (!member) {
                errors.push(`${cls.getName()}: host directive input "${inner}" not found on ${declaration.getName()}`)
                return []
            }
            return [{...member, name: exposed ?? inner, from: declaration.getName()}]
        })
    })
}

function templateOf(options, filePath) {
    const inline = options?.getProperty('template')?.getInitializer?.()
    if (inline && (Node.isStringLiteral(inline) || Node.isNoSubstitutionTemplateLiteral(inline))) {
        return inline.getLiteralText()
    }
    const url = stringProperty(options, 'templateUrl')
    return url ? readFileSync(resolve(dirname(filePath), url), 'utf8') : ''
}

function slotsOf(cls, options, filePath, errors) {
    const declared = jsDocTags(cls, 'slot').map((text) => {
        const [select, ...rest] = text.split(/\s+/)
        return {select, description: rest.join(' ')}
    })
    const templates = jsDocTags(cls, 'template').map((text) => {
        const [select, ...rest] = text.split(/\s+/)
        return {select: `ng-template[${select}]`, description: rest.join(' ')}
    })
    if (options) {
        const template = templateOf(options, filePath)
        const used = [...template.matchAll(/<ng-content\s+select="([^"]+)"/g)].map((match) => match[1])
        for (const select of used) {
            if (!declared.some((slot) => slot.select === select)) {
                errors.push(`${cls.getName()}: <ng-content select="${select}"> without a @slot tag`)
            }
        }
        for (const slot of declared) {
            if (slot.select !== 'default' && !used.includes(slot.select)) {
                errors.push(`${cls.getName()}: @slot ${slot.select} has no matching <ng-content select>`)
            }
        }
    }
    return [...declared, ...templates]
}

function serviceMembers(cls) {
    const flags = TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | TypeFormatFlags.NoTruncation
    const isPublic = (member) =>
        !member.hasModifier(SyntaxKind.PrivateKeyword) &&
        !member.hasModifier(SyntaxKind.ProtectedKeyword) &&
        !member.getName().startsWith('#')
    const properties = cls
        .getProperties()
        .filter(isPublic)
        .map((prop) => ({
            name: prop.getName(),
            kind: 'property',
            type: prop.getType().getText(prop, flags),
            required: false,
            default: null,
            description: jsDocText(prop),
            from: null,
        }))
    const methods = cls
        .getMethods()
        .filter(isPublic)
        .map((method) => ({
            name: method.getName(),
            kind: 'method',
            type: `(${method
                .getParameters()
                .map((param) => param.getText())
                .join(', ')}) => ${method.getReturnType().getText(method, flags)}`,
            required: false,
            default: null,
            description: jsDocText(method),
            from: null,
        }))
    return [...properties, ...methods]
}

function interfaceMembers(declaration) {
    return declaration.getProperties().map((prop) => ({
        name: prop.getName(),
        kind: 'property',
        type: prop.getTypeNode()?.getText() ?? 'unknown',
        required: !prop.hasQuestionToken(),
        default: null,
        description: jsDocText(prop),
        from: null,
    }))
}

function generateApi(errors) {
    const project = createLibraryProject()
    const api = {}
    const entryPoints = new Map()
    const exportedFrom = (entry, name) => {
        if (!entryPoints.has(entry.dir)) {
            const index = project.getSourceFile(join(entry.dir, 'index.ts'))
            entryPoints.set(entry.dir, index ? index.getExportedDeclarations() : new Map())
        }
        return entryPoints.get(entry.dir).has(name)
    }

    for (const file of project.getSourceFiles()) {
        const filePath = file.getFilePath()
        const entry = entryPointOf(resolve(filePath))
        if (!entry || entry.path === 'internal' || entry.path.startsWith('internal/')) continue
        const segments = entry.path.split('/')
        const facade = segments.length === 2 ? `${PACKAGE}/${segments[0]}` : null

        for (const cls of file.getClasses()) {
            const name = cls.getName()
            if (!name || !exportedFrom(entry, name)) continue
            const decorator = decoratorArgs(cls, ['Component', 'Directive', 'Pipe', 'Injectable'])
            if (!decorator) continue
            const kind = {Component: 'component', Directive: 'directive', Pipe: 'pipe', Injectable: 'service'}[
                decorator.name
            ]
            const members =
                kind === 'service'
                    ? serviceMembers(cls)
                    : [...signalMembers(cls, errors), ...hostDirectiveMembers(cls, decorator.options, errors)]
            api[name] = {
                name,
                kind,
                selector:
                    kind === 'pipe'
                        ? stringProperty(decorator.options, 'name')
                        : stringProperty(decorator.options, 'selector'),
                entryPoint: entry.importPath,
                facade,
                description: jsDocText(cls),
                members,
                slots:
                    kind === 'component' || kind === 'directive'
                        ? slotsOf(cls, decorator.options, filePath, errors)
                        : [],
            }
        }

        for (const declaration of file.getInterfaces()) {
            const name = declaration.getName()
            if (!exportedFrom(entry, name)) continue
            api[name] = {
                name,
                kind: 'interface',
                selector: null,
                entryPoint: entry.importPath,
                facade,
                description: jsDocText(declaration),
                members: interfaceMembers(declaration),
                slots: [],
            }
        }
    }

    const sorted = Object.fromEntries(Object.entries(api).sort(([a], [b]) => a.localeCompare(b)))
    writeIfChanged(join(generatedRoot, 'api.json'), JSON.stringify(sorted, null, 4) + '\n')
    return {project, api: sorted}
}

/** Every `<doc-props-table api="X">` on a page must name an entry of api.json. */
function checkApiReferences(api, errors) {
    for (const file of walk(pagesRoot, (path) => path.endsWith('.html') || path.endsWith('.page.ts'))) {
        for (const [, name] of readFileSync(file, 'utf8').matchAll(/<doc-props-table\s+api="(\w+)"/g)) {
            if (!(name in api)) errors.push(`${toPosix(relative(docsRoot, file))}: api="${name}" is not in api.json`)
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------
// 2. examples, 3. snippets
// ---------------------------------------------------------------------------------------------------------------

const LANGUAGES = {'.ts': 'typescript', '.html': 'html', '.css': 'css', '.json': 'json', '.sh': 'bash'}

function generateExamples(errors) {
    const files = walk(pagesRoot, (path) => path.endsWith('.example.ts'))
    const expected = new Set()
    for (const file of files) {
        const source = readFileSync(file, 'utf8')
        const exported = [...source.matchAll(/export class (\w+)/g)].map((match) => match[1])
        const rel = toPosix(relative(pagesRoot, file))
        if (exported.length !== 1) {
            errors.push(`${rel}: an example file must export exactly one class`)
            continue
        }
        const target = join(
            generatedRoot,
            'examples',
            rel.replace(/\/examples\//, '/').replace(/\.example\.ts$/, '.ts')
        )
        expected.add(target)
        writeIfChanged(
            target,
            [
                '// Generated by scripts/generate-docs.mjs — do not edit.',
                `import type {DocExample} from '@kit/doc-example'`,
                `import {${exported[0]}} from '@pages/${rel.replace(/\.ts$/, '')}'`,
                '',
                `export default {component: ${exported[0]}, source: ${JSON.stringify(source)}, title: ${JSON.stringify(basename(file))}} satisfies DocExample`,
                '',
            ].join('\n')
        )
    }
    removeStale(join(generatedRoot, 'examples'), expected)
    return files.length
}

const toIdentifier = (fileName) =>
    fileName
        .replace(/[^a-zA-Z0-9]+(.)?/g, (_, next = '') => next.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase())

function generateSnippets(errors) {
    const files = walk(pagesRoot, (path) => toPosix(path).includes('/snippets/'))
    const byPage = new Map()
    for (const file of files) {
        const language = LANGUAGES[extname(file)]
        const rel = toPosix(relative(pagesRoot, file))
        if (!language) {
            errors.push(`${rel}: unsupported snippet extension`)
            continue
        }
        const page = rel.slice(0, rel.indexOf('/snippets/'))
        const list = byPage.get(page) ?? []
        list.push({
            name: toIdentifier(basename(file)),
            source: readFileSync(file, 'utf8'),
            language,
            title: basename(file),
        })
        byPage.set(page, list)
    }
    const expected = new Set()
    for (const [page, snippets] of byPage) {
        const target = join(generatedRoot, 'snippets', `${page}.ts`)
        expected.add(target)
        const body = snippets
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
                (snippet) =>
                    `export const ${snippet.name} = ${JSON.stringify({
                        source: snippet.source,
                        language: snippet.language,
                        title: snippet.title,
                    })} satisfies DocSnippet`
            )
        writeIfChanged(
            target,
            [
                '// Generated by scripts/generate-docs.mjs — do not edit.',
                `import type {DocSnippet} from '@kit/doc-example'`,
                '',
                ...body,
                '',
            ].join('\n')
        )
    }
    removeStale(join(generatedRoot, 'snippets'), expected)
    return files.length
}

function removeStale(dir, expected) {
    for (const file of walk(dir, () => true)) if (!expected.has(file)) rmSync(file)
}

// ---------------------------------------------------------------------------------------------------------------
// 4. anti-FOUC script in index.html
// ---------------------------------------------------------------------------------------------------------------

function syncThemeInitScript(project, errors) {
    const provider = project.getSourceFile(join(libRoot, 'theme', 'theme.provider.ts'))
    const initializer = provider?.getVariableDeclaration('M_THEME_INIT_SCRIPT')?.getInitializer()
    if (!initializer || !Node.isNoSubstitutionTemplateLiteral(initializer)) {
        errors.push('M_THEME_INIT_SCRIPT not found in theme/theme.provider.ts')
        return
    }
    const indexPath = resolve(docsRoot, 'src', 'index.html')
    const html = readFileSync(indexPath, 'utf8')
    const pattern = /(<!-- m-theme-init:[^\n]*-->\n)([\s\S]*?)(\n\s*<!-- \/m-theme-init -->)/
    if (!pattern.test(html)) {
        errors.push('src/index.html: m-theme-init markers not found')
        return
    }
    const indent = ' '.repeat(8)
    const script = initializer
        .getLiteralText()
        .split('\n')
        .map((line) => (line ? `${indent}    ${line}` : line))
        .join('\n')
    writeIfChanged(indexPath, html.replace(pattern, `$1${indent}<script>\n${script}\n${indent}</script>$3`))
}

// ---------------------------------------------------------------------------------------------------------------
// 5. theme downloads — same output as docs-react scripts/generate-theme-downloads.mjs
// ---------------------------------------------------------------------------------------------------------------

async function generateDownloads(errors) {
    const tokensRoot = resolve(docsRoot, 'node_modules', '@banzamel', 'mineralui-angular', 'styles', 'tokens')
    if (!existsSync(tokensRoot)) {
        errors.push(`library tokens not found at ${tokensRoot} — build angular-pro and run npm install`)
        return
    }
    const {buildDownloads} = await import('./theme-downloads.mjs')
    for (const [file, content] of Object.entries(buildDownloads(tokensRoot))) {
        writeIfChanged(resolve(docsRoot, 'public', 'downloads', file), content)
    }
}

// ---------------------------------------------------------------------------------------------------------------

async function run() {
    const started = Date.now()
    const errors = []
    const {project, api} = generateApi(errors)
    checkApiReferences(api, errors)
    const examples = generateExamples(errors)
    const snippets = generateSnippets(errors)
    syncThemeInitScript(project, errors)
    await generateDownloads(errors)
    for (const error of errors) console.error(`[generate-docs] ${error}`)
    console.log(
        `[generate-docs] api ${Object.keys(api).length}, examples ${examples}, snippets ${snippets}` +
            `${errors.length ? `, ${errors.length} error(s)` : ''} (${Date.now() - started} ms)`
    )
    return errors.length === 0
}

if (!watchMode) {
    process.exit((await run()) ? 0 : 1)
}

await run()
let timer
const schedule = () => {
    clearTimeout(timer)
    timer = setTimeout(() => void run(), 250)
}
for (const dir of [pagesRoot, libRoot]) {
    watch(dir, {recursive: true}, (_event, file) => {
        if (file && !/\.spec\.ts$|[\\/]generated[\\/]/.test(file)) schedule()
    })
}
console.log('[generate-docs] watching src/pages and ../angular-pro/projects/mineralui')
