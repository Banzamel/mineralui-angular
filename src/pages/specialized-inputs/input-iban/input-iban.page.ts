import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputIBAN} from '@banzamel/mineralui-angular/inputs/input-iban'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputIbanForm from '@generated/examples/specialized-inputs/input-iban/input-iban-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COUNTRIES = ['PL', 'DE', 'GB', 'FR', 'NL', 'CZ'] as const

@Component({
    selector: 'doc-input-iban-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputIBAN],
    template: `
        <doc-article
            title="MInputIBAN"
            description="IBAN field with a country select, grouping in fours and length plus MOD-97 checksum validation."
        >
            <doc-section
                title="Playground"
                description="Try 61 1090 1014 0000 0712 1981 2874 for PL, or GB with 29 NWBK 6016 1331 9268 19 — letters in the account part are kept."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-iban
                        label="Bank account"
                        [(countryCode)]="country"
                        [variant]="variant()"
                        [size]="size()"
                        [formatOnChange]="formatOnChange()"
                        [validateOnChange]="validateOnChange()"
                        [clearable]="clearable()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The control holds the full IBAN without spaces, country code included; writing one with another country code selects that country. Validation: mIban error."
            >
                <doc-preview [example]="examples.inputIbanForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputIBAN" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputIbanPage {
    protected readonly examples = {inputIbanForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly country = signal<string>('PL')
    protected readonly formatOnChange = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly clearable = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('countryCode', this.country, COUNTRIES),
        booleanControl('formatOnChange', this.formatOnChange),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Bank account"',
            '[(countryCode)]="country"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.formatOnChange() && '[formatOnChange]="false"',
            this.validateOnChange() && 'validateOnChange',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="iban"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-iban\n    ${attrs.join('\n    ')}\n/>`
    })
}
