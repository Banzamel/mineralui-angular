import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputCVC} from '@banzamel/mineralui-angular/inputs/input-cvc'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputCvcForm from '@generated/examples/specialized-inputs/input-cvc/input-cvc-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const LENGTHS = ['3', '4'] as const

@Component({
    selector: 'doc-input-cvc-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputCVC],
    template: `
        <doc-article
            title="MInputCVC"
            description="Card security code field: 3 or 4 digits, spaced out, with a digit-count check."
        >
            <doc-section
                title="Playground"
                description="Only digits reach the field. A complete code shows the check icon after the first blur."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-cvc
                        label="Security code"
                        helperText="The last digits on the back of the card"
                        [length]="length()"
                        [variant]="variant()"
                        [size]="size()"
                        [showValidIcon]="showValidIcon()"
                        [validateOnChange]="validateOnChange()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The digit count is the control's validator (mCvc error with {length} for a translated message). See MInputCreditCard for a payment form that switches the length for Amex."
            >
                <doc-preview [example]="examples.inputCvcForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputCVC" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCvcPage {
    protected readonly examples = {inputCvcForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly lengthOption = signal<(typeof LENGTHS)[number]>('3')
    protected readonly showValidIcon = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly disabled = signal(false)

    protected readonly length = computed(() => (this.lengthOption() === '4' ? 4 : 3))

    protected readonly controls = [
        selectControl('length', this.lengthOption, LENGTHS),
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('showValidIcon', this.showValidIcon),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Security code"',
            this.length() !== 3 && `[length]="${this.length()}"`,
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.showValidIcon() && '[showValidIcon]="false"',
            this.validateOnChange() && 'validateOnChange',
            this.disabled() && 'disabled',
            '[(value)]="cvc"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-cvc\n    ${attrs.join('\n    ')}\n/>`
    })
}
