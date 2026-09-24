import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputUrl} from '@banzamel/mineralui-angular/inputs/input-url'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputUrlProtocols from '@generated/examples/specialized-inputs/input-url/input-url-protocols'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-url-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputUrl],
    template: `
        <doc-article
            title="MInputUrl"
            description="URL-specialized text field with built-in protocol whitelisting, an optional autoformatter that prepends the first allowed scheme on blur, and the same validation feedback as the other specialized inputs."
        >
            <doc-section
                title="Playground"
                description="Type example.com and leave the field — formatOnBlur prepends the first allowed protocol (http by default)."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-url
                        label="Website"
                        [variant]="variant()"
                        [size]="size()"
                        [formatOnBlur]="formatOnBlur()"
                        [requireProtocol]="requireProtocol()"
                        [validateOnChange]="validateOnChange()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Custom protocol whitelist"
                description="protocols limits the accepted schemes; the first one is used by formatOnBlur. As a form control the rule is the control's validator (mUrl) and re-runs when the options change."
            >
                <doc-preview [example]="examples.inputUrlProtocols" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputUrl" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputUrlPage {
    protected readonly examples = {inputUrlProtocols}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly formatOnBlur = signal(true)
    protected readonly requireProtocol = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('formatOnBlur', this.formatOnBlur),
        booleanControl('requireProtocol', this.requireProtocol),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Website"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.formatOnBlur() && 'formatOnBlur',
            !this.requireProtocol() && '[requireProtocol]="false"',
            this.validateOnChange() && 'validateOnChange',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-url\n    ${attrs.join('\n    ')}\n/>`
    })
}
