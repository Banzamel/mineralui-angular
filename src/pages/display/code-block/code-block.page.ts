import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCodeBlock} from '@banzamel/mineralui-angular/display/code-block'
import codeBlockCopied from '@generated/examples/display/code-block/code-block-copied'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SAMPLES = {
    ts: `import {ChangeDetectionStrategy, Component, signal} from '@angular/core'

@Component({
    selector: 'app-counter',
    template: \`<button mButton (click)="count.set(count() + 1)">{{ count() }}</button>\`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter {
    // Starts at zero; the template reads the signal.
    protected readonly count = signal(0)
}`,
    js: `export function formatPrice(value, currency = 'EUR') {
    return new Intl.NumberFormat('en', {style: 'currency', currency}).format(value)
}`,
    php: `<?php

final class LicenseGrant
{
    public function grant(string $siteKey): array
    {
        return ['site_key' => $siteKey, 'granted_at' => now()->toIso8601String()];
    }
}`,
    html: `<section class="hero">
    <h1>MineralUI</h1>
    <p>Ship coherent dashboards and docs faster.</p>
</section>`,
    css: `.hero {
    display: grid;
    gap: 1rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.16), transparent);
}`,
    json: `{
    "name": "@banzamel/mineralui-angular",
    "version": "1.0.0",
    "type": "module"
}`,
    bash: `npm install @banzamel/mineralui-angular
npx ng build
npx prettier --check .`,
} as const

type Language = keyof typeof SAMPLES
const LANGUAGES: readonly Language[] = ['ts', 'js', 'php', 'html', 'css', 'json', 'bash']

@Component({
    selector: 'doc-code-block-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCodeBlock],
    template: `
        <doc-article
            title="MCodeBlock"
            description="Syntax-highlighted code in a card, with an optional header: heading, language badge and copy button."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-code-block
                        [code]="sample()"
                        [language]="language()"
                        [heading]="heading() ? 'example.' + language() : undefined"
                        [showHeader]="showHeader()"
                        [showLanguage]="showLanguage()"
                        [showCopyButton]="showCopyButton()"
                        [maxHeight]="limitHeight() ? 220 : undefined"
                        [animated]="animated()"
                        [lineNumbers]="lineNumbers()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Copy feedback"
                description="The button label switches to “Copied” and a status message is announced to screen readers; (copied) lets you add your own feedback."
            >
                <doc-preview [example]="examples.copied" />
            </doc-section>

            <doc-section
                title="Server rendering"
                description="highlight.js is imported lazily on first use. Server rendering and prerendering wait for it, so the page ships the highlighted markup; an animated block renders its full code on the server and types it in the browser."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="title is heading (a string — title is a global HTML attribute). The default copy labels come from mineralui.codeBlock.copy / .copied (copyLabel / copiedLabel still override them), and the new (copied) output fires after a successful copy. The code area is a focusable, named region so long lines can be scrolled with the keyboard, the copy result is announced, and the typing animation is skipped under prefers-reduced-motion."
            />

            <doc-section title="MCodeBlock API">
                <doc-props-table api="MCodeBlock" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockPage {
    protected readonly examples = {copied: codeBlockCopied}

    protected readonly language = signal<Language>('ts')
    protected readonly heading = signal(true)
    protected readonly showHeader = signal(true)
    protected readonly showLanguage = signal(true)
    protected readonly showCopyButton = signal(true)
    protected readonly limitHeight = signal(false)
    protected readonly animated = signal(false)
    protected readonly lineNumbers = signal(false)
    protected readonly controls = [
        selectControl('language', this.language, LANGUAGES),
        booleanControl('heading', this.heading),
        booleanControl('showHeader', this.showHeader),
        booleanControl('showLanguage', this.showLanguage),
        booleanControl('showCopyButton', this.showCopyButton),
        booleanControl('limitHeight', this.limitHeight),
        booleanControl('animated', this.animated),
        booleanControl('lineNumbers', this.lineNumbers),
    ]

    protected readonly sample = computed(() => SAMPLES[this.language()])

    protected readonly code = computed(() => {
        const attrs = [
            '[code]="source"',
            `language="${this.language()}"`,
            this.heading() && `heading="example.${this.language()}"`,
            !this.showHeader() && '[showHeader]="false"',
            !this.showLanguage() && '[showLanguage]="false"',
            !this.showCopyButton() && '[showCopyButton]="false"',
            this.limitHeight() && '[maxHeight]="220"',
            this.animated() && 'animated',
            this.lineNumbers() && 'lineNumbers',
        ].filter((attr): attr is string => typeof attr === 'string')
        return `<m-code-block
    ${attrs.join('\n    ')}
/>`
    })
}
