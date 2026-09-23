// npm run dev: docs generator in watch mode + ng serve, stopped together.
// Keep `npm run watch` running in ../angular-pro to see library changes (the package links to its dist).
import {spawn} from 'node:child_process'
import {resolve} from 'node:path'

const scripts = resolve(import.meta.dirname)
const children = [
    spawn(process.execPath, [resolve(scripts, 'generate-docs.mjs'), '--watch'], {stdio: 'inherit'}),
    spawn(process.execPath, [resolve(scripts, 'ng.mjs'), 'serve', ...process.argv.slice(2)], {stdio: 'inherit'}),
]

const stop = (code) => {
    for (const child of children) child.kill()
    process.exit(code)
}
for (const child of children) child.on('exit', (code) => stop(code ?? 1))
process.on('SIGINT', () => stop(0))
process.on('SIGTERM', () => stop(0))
