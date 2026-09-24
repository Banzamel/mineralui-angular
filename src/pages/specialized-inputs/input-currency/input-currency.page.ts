import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputCurrency} from '@banzamel/mineralui-angular/inputs/input-currency'
import type {
    MCurrencyDecimalSeparator,
    MCurrencyThousandSeparator,
} from '@banzamel/mineralui-angular/inputs/input-currency'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputCurrencyForm from '@generated/examples/specialized-inputs/input-currency/input-currency-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const CURRENCIES = ['PLN', 'EUR', 'USD', 'GBP'] as const
const POSITIONS = ['start', 'end'] as const
const DECIMALS: readonly MCurrencyDecimalSeparator[] = [',', '.']
// A space is invisible in a select, so the playground names it.
const THOUSANDS = ['space', '.', ',', 'none'] as const
type ThousandOption = (typeof THOUSANDS)[number]
const THOUSAND_VALUES: Readonly<Record<ThousandOption, MCurrencyThousandSeparator>> = {
    space: ' ',
    '.': '.',
    ',': ',',
    none: '',
}

@Component({
    selector: 'doc-input-currency-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputCurrency],
    template: `
        <doc-article
            title="MInputCurrency"
            description="Money field that groups thousands while typing, keeps the caret in place and emits a number."
        >
            <doc-section
                title="Playground"
                description="Type an amount: either '.' or ',' opens the decimals. On blur the amount is padded to the precision and clamped to max."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-currency
                        label="Monthly budget"
                        helperText="The value is a number; the field shows it formatted."
                        [max]="1000000"
                        [currency]="currency()"
                        [currencyPosition]="position()"
                        [decimalSeparator]="decimal()"
                        [thousandSeparator]="thousandValue()"
                        [precision]="precision()"
                        [variant]="variant()"
                        [size]="size()"
                        [allowNegative]="allowNegative()"
                        [clearable]="clearable()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The control holds a number (null when empty) — Validators.min / max work on it; the display string stays inside the component."
            >
                <doc-preview [example]="examples.inputCurrencyForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputCurrency" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCurrencyPage {
    protected readonly examples = {inputCurrencyForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly currency = signal<(typeof CURRENCIES)[number]>('PLN')
    protected readonly position = signal<(typeof POSITIONS)[number]>('end')
    protected readonly decimal = signal<MCurrencyDecimalSeparator>(',')
    protected readonly thousand = signal<ThousandOption>('space')
    protected readonly precision = signal(2)
    protected readonly allowNegative = signal(false)
    protected readonly clearable = signal(false)
    protected readonly disabled = signal(false)

    protected readonly thousandValue = computed(() => THOUSAND_VALUES[this.thousand()])

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('currency', this.currency, CURRENCIES),
        selectControl('currencyPosition', this.position, POSITIONS),
        selectControl('decimalSeparator', this.decimal, DECIMALS),
        selectControl('thousandSeparator', this.thousand, THOUSANDS),
        sliderControl('precision', this.precision, {min: 0, max: 4}),
        booleanControl('allowNegative', this.allowNegative),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Monthly budget"',
            `currency="${this.currency()}"`,
            this.position() !== 'end' && `currencyPosition="${this.position()}"`,
            this.decimal() !== ',' && `decimalSeparator="${this.decimal()}"`,
            this.thousand() !== 'space' && `thousandSeparator="${this.thousandValue()}"`,
            this.precision() !== 2 && `[precision]="${this.precision()}"`,
            '[max]="1000000"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.allowNegative() && 'allowNegative',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="budget"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-currency\n    ${attrs.join('\n    ')}\n/>`
    })
}
