import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputPhone} from '@banzamel/mineralui-angular/inputs/input-phone'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputPhoneForm from '@generated/examples/specialized-inputs/input-phone/input-phone-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COUNTRIES = ['PL', 'DE', 'US', 'GB', 'FR', 'CZ', 'SK'] as const

@Component({
    selector: 'doc-input-phone-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputPhone],
    template: `
        <doc-article
            title="MInputPhone"
            description="Phone field with country-aware grouping, a dialling prefix and digit-count validation."
        >
            <doc-section
                title="Playground"
                description="Type +49 or 0049 in front of the number to switch the country; the playground's countryCode follows it."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-phone
                        label="Phone number"
                        [(countryCode)]="country"
                        [variant]="variant()"
                        [size]="size()"
                        [showCountryCode]="showCountryCode()"
                        [formatOnChange]="formatOnChange()"
                        [validateOnChange]="validateOnChange()"
                        [clearable]="clearable()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The control holds the national number as digits; the country is a separate two-way binding. The digit count of the country is the control's validator (mPhone error)."
            >
                <doc-preview [example]="examples.inputPhoneForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputPhone" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhonePage {
    protected readonly examples = {inputPhoneForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly country = signal<string>('PL')
    protected readonly showCountryCode = signal(true)
    protected readonly formatOnChange = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly clearable = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('countryCode', this.country, COUNTRIES),
        booleanControl('showCountryCode', this.showCountryCode),
        booleanControl('formatOnChange', this.formatOnChange),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Phone number"',
            '[(countryCode)]="country"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.showCountryCode() && '[showCountryCode]="false"',
            !this.formatOnChange() && '[formatOnChange]="false"',
            this.validateOnChange() && 'validateOnChange',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="phone"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-phone\n    ${attrs.join('\n    ')}\n/>`
    })
}
