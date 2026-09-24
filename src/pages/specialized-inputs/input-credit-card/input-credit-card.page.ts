import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputCreditCard} from '@banzamel/mineralui-angular/inputs/input-credit-card'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputCreditCardPayment from '@generated/examples/specialized-inputs/input-credit-card/input-credit-card-payment'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-credit-card-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputCreditCard],
    template: `
        <doc-article
            title="MInputCreditCard"
            description="Card number field with brand detection, brand-aware grouping and a Luhn checksum."
        >
            <doc-section
                title="Playground"
                description="Test numbers: 4242 4242 4242 4242 (Visa), 5555 5555 5555 4444 (Mastercard), 3782 822463 10005 (Amex)."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-credit-card
                        label="Card number"
                        [variant]="variant()"
                        [size]="size()"
                        [showBrandIcon]="showBrandIcon()"
                        [showValidIcon]="showValidIcon()"
                        [validateOnChange]="validateOnChange()"
                        [clearable]="clearable()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Payment form"
                description="The control holds the digits and the checksum is its validator (mCardNumber error). (brandChange) fires only when the brand changes — here it sets the CVC length to 4 for Amex."
            >
                <doc-preview [example]="examples.inputCreditCardPayment" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputCreditCard" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCreditCardPage {
    protected readonly examples = {inputCreditCardPayment}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly showBrandIcon = signal(true)
    protected readonly showValidIcon = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly clearable = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('showBrandIcon', this.showBrandIcon),
        booleanControl('showValidIcon', this.showValidIcon),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Card number"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.showBrandIcon() && '[showBrandIcon]="false"',
            !this.showValidIcon() && '[showValidIcon]="false"',
            this.validateOnChange() && 'validateOnChange',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="card"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-credit-card\n    ${attrs.join('\n    ')}\n/>`
    })
}
