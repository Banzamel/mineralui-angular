import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputPostCode} from '@banzamel/mineralui-angular/inputs/input-post-code'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {postCodeCountries} from '@banzamel/mineralui-angular/utils'
import inputPostCodeForm from '@generated/examples/specialized-inputs/input-post-code/input-post-code-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COUNTRIES: readonly string[] = postCodeCountries.map((country) => country.value)

@Component({
    selector: 'doc-input-post-code-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputPostCode],
    template: `
        <doc-article
            title="MInputPostCode"
            description="Country-aware postal code field: a country select, masking, format hint and validation."
        >
            <doc-section
                title="Playground"
                description="Pick a country in the field or in the controls — the country is a two-way binding, the code is reformatted for it."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-post-code
                        label="Postal code"
                        [(country)]="country"
                        [selectableCountry]="selectableCountry()"
                        [variant]="variant()"
                        [size]="size()"
                        [validateOnChange]="validateOnChange()"
                        [clearable]="clearable()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The control holds the code without separators; the rule of the selected country is the control's validator (mPostCode error)."
            >
                <doc-preview [example]="examples.inputPostCodeForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputPostCode" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPostCodePage {
    protected readonly examples = {inputPostCodeForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly country = signal('PL')
    protected readonly selectableCountry = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly clearable = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('country', this.country, COUNTRIES),
        booleanControl('selectableCountry', this.selectableCountry),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Postal code"',
            '[(country)]="country"',
            !this.selectableCountry() && '[selectableCountry]="false"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.validateOnChange() && 'validateOnChange',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="postCode"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-post-code\n    ${attrs.join('\n    ')}\n/>`
    })
}
