import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputDate} from '@banzamel/mineralui-angular/inputs/input-date'
import type {MDateSeparator} from '@banzamel/mineralui-angular/inputs/input-date'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import type {DateFormat} from '@banzamel/mineralui-angular/utils'
import inputDateForm from '@generated/examples/specialized-inputs/input-date/input-date-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const FORMATS: readonly DateFormat[] = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD']
const SEPARATORS: readonly MDateSeparator[] = ['/', '.', '-']

@Component({
    selector: 'doc-input-date-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputDate],
    template: `
        <doc-article
            title="MInputDate"
            description="Typed date field: digits only, separators inserted as you type, a Date value once the date is complete."
        >
            <doc-section
                title="Playground"
                description="Letters and punctuation never reach the field. Leave it to validate: incomplete, impossible (31/02) and out-of-range dates fail."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-date
                        label="Start date"
                        helperText="Not later than the end of next year"
                        [maxDate]="maxDate"
                        [format]="format()"
                        [separator]="separator()"
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
                description="The control holds a Date (null until complete). The rule checks the typed text, so a half-typed date keeps the form invalid even though the value is null (mDate error)."
            >
                <doc-preview [example]="examples.inputDateForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputDate" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDatePage {
    protected readonly examples = {inputDateForm}
    protected readonly maxDate = new Date(new Date().getFullYear() + 1, 11, 31)

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly format = signal<DateFormat>('DD/MM/YYYY')
    protected readonly separator = signal<MDateSeparator>('/')
    protected readonly validateOnChange = signal(false)
    protected readonly clearable = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('format', this.format, FORMATS),
        selectControl('separator', this.separator, SEPARATORS),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Start date"',
            '[maxDate]="maxDate"',
            this.format() !== 'DD/MM/YYYY' && `format="${this.format()}"`,
            this.separator() !== '/' && `separator="${this.separator()}"`,
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.validateOnChange() && 'validateOnChange',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="start"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-date\n    ${attrs.join('\n    ')}\n/>`
    })
}
