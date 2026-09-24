import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputTaxId} from '@banzamel/mineralui-angular/inputs/input-tax-id'
import type {MTaxIdType} from '@banzamel/mineralui-angular/inputs/input-tax-id'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputTaxIdForm from '@generated/examples/specialized-inputs/input-taxid/input-taxid-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const TYPES: readonly MTaxIdType[] = ['NIP', 'PESEL', 'REGON']

@Component({
    selector: 'doc-input-taxid-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputTaxId],
    template: `
        <doc-article
            title="MInputTaxId"
            description="Polish NIP, PESEL and REGON field with formatting and checksum validation."
        >
            <doc-section
                title="Playground"
                description="Try 526-025-02-74 (NIP), 44051401359 (PESEL) or 123456785 (REGON) and leave the field."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-tax-id
                        [label]="type()"
                        [taxIdType]="type()"
                        [variant]="variant()"
                        [size]="size()"
                        [formatOnChange]="formatOnChange()"
                        [showValidIcon]="showValidIcon()"
                        [validateOnChange]="validateOnChange()"
                        [clearable]="clearable()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The control holds the digits. The checksum of the chosen type is the control's validator — mNip, mPesel or mRegon, the same keys as MValidators."
            >
                <doc-preview [example]="examples.inputTaxIdForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputTaxId" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTaxIdPage {
    protected readonly examples = {inputTaxIdForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly type = signal<MTaxIdType>('NIP')
    protected readonly formatOnChange = signal(true)
    protected readonly showValidIcon = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly clearable = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('taxIdType', this.type, TYPES),
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('formatOnChange', this.formatOnChange),
        booleanControl('showValidIcon', this.showValidIcon),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            `label="${this.type()}"`,
            `taxIdType="${this.type()}"`,
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.formatOnChange() && '[formatOnChange]="false"',
            !this.showValidIcon() && '[showValidIcon]="false"',
            this.validateOnChange() && 'validateOnChange',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="taxId"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-tax-id\n    ${attrs.join('\n    ')}\n/>`
    })
}
