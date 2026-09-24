import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputExpDate} from '@banzamel/mineralui-angular/inputs/input-exp-date'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputExpDateForm from '@generated/examples/specialized-inputs/input-exp-date/input-exp-date-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-exp-date-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputExpDate],
    template: `
        <doc-article
            title="MInputExpDate"
            description="Card expiration date picked in two segments — month and year — with range and expiry checks."
        >
            <doc-section
                title="Playground"
                description="Each segment opens a list: click it or press ↓, move with the arrows or type-ahead, pick with Enter. The date is checked after the first blur."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-exp-date
                        label="Expiration date"
                        helperText="As printed on the card"
                        [(value)]="value"
                        [variant]="variant()"
                        [size]="size()"
                        [clearable]="clearable()"
                        [validateOnChange]="validateOnChange()"
                        [readOnly]="readOnly()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The value is MM/YYYY. Completeness, the month, the year range (minYear / maxYear) and expiry are the control's validator — mExpDate error."
            >
                <doc-preview [example]="examples.inputExpDateForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputExpDate" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputExpDatePage {
    protected readonly examples = {inputExpDateForm}

    protected readonly value = signal('')
    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly clearable = signal(true)
    protected readonly validateOnChange = signal(false)
    protected readonly readOnly = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('clearable', this.clearable),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('readOnly', this.readOnly),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Expiration date"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.clearable() && 'clearable',
            this.validateOnChange() && 'validateOnChange',
            this.readOnly() && 'readOnly',
            this.disabled() && 'disabled',
            '[(value)]="expires"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-exp-date\n    ${attrs.join('\n    ')}\n/>`
    })
}
