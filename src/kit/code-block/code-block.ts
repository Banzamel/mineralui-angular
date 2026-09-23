import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    input,
    signal,
    ViewEncapsulation,
} from '@angular/core'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import type {DocLanguage, DocSnippet} from '../doc-example'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)

const COPIED_FOR_MS = 1500

// TEMP: replace with MCodeBlock (etap 6)
@Component({
    selector: 'doc-code-block',
    imports: [MTranslatePipe],
    template: `
        <figure class="doc-code-block">
            <figcaption class="doc-code-block-bar">
                <span class="doc-code-block-title">{{ resolvedTitle() }}</span>
                <button type="button" class="doc-code-block-copy" (click)="copy()">
                    {{ (copied() ? 'ui.copied' : 'ui.copy') | mT }}
                </button>
            </figcaption>
            <!-- highlight.js escapes the source; its output is only <span class="hljs-*"> (kept by the sanitizer). -->
            <pre class="doc-code-block-pre"><code class="hljs" [innerHTML]="highlighted()"></code></pre>
            <span class="doc-visually-hidden" aria-live="polite">{{ copied() ? ('ui.copied' | mT) : '' }}</span>
        </figure>
    `,
    styleUrl: './code-block.css',
    // highlight.js markup is added through innerHTML, so the token colors must be global.
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
    /** Generated snippet (preferred): source, language and file name. */
    readonly snippet = input<DocSnippet>()
    /** Source for runtime-generated code (e.g. playground output); ignored when `snippet` is set. */
    readonly code = input('')
    readonly language = input<DocLanguage>('typescript')
    readonly title = input<string>()

    protected readonly copied = signal(false)
    private copyTimer: ReturnType<typeof setTimeout> | undefined

    private readonly source = computed(() => this.snippet()?.source ?? this.code())
    protected readonly resolvedTitle = computed(() => this.snippet()?.title ?? this.title() ?? this.resolvedLanguage())
    private readonly resolvedLanguage = computed(() => this.snippet()?.language ?? this.language())

    protected readonly highlighted = computed(
        () => hljs.highlight(this.source(), {language: this.resolvedLanguage(), ignoreIllegals: true}).value
    )

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer))
    }

    protected async copy(): Promise<void> {
        try {
            await navigator.clipboard.writeText(this.source())
        } catch {
            return
        }
        this.copied.set(true)
        clearTimeout(this.copyTimer)
        this.copyTimer = setTimeout(() => this.copied.set(false), COPIED_FOR_MS)
    }
}
