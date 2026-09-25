import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTimePicker} from '@banzamel/mineralui-angular/dropdowns/time-picker'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import timePickerForm from '@generated/examples/forms/time-picker/time-picker-form'
import timePickerFormats from '@generated/examples/forms/time-picker/time-picker-formats'
import timePickerTyping from '@generated/examples/forms/time-picker/time-picker-typing'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info']
const FORMATS = ['24h', '12h'] as const

@Component({
    selector: 'doc-time-picker-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCode, MList, MListItem, MTimePicker],
    template: `
        <doc-article
            title="MTimePicker"
            description="Time field with hour / minute columns: type the time (completed from now) or pick it, in 24h or 12h display."
        >
            <doc-section
                title="Playground"
                description="Type a partial time and leave the field, or open the columns with the clock button or Alt+ArrowDown."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-time-picker
                        label="Time"
                        [(value)]="value"
                        [format]="format()"
                        [minuteStep]="minuteStep()"
                        [showSeconds]="showSeconds()"
                        [variant]="variant()"
                        [size]="size()"
                        [color]="color()"
                        [clearable]="clearable()"
                        [readOnly]="readOnly()"
                        [required]="required()"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Typing and completion"
                description="Missing parts come from the current time when the field loses focus or on Enter: 9 → 09:37, 9:5 → 09:05, 930 → 09:30 (the colon is inserted by itself). The completion shows as grey ghost text — Tab accepts it. minuteStep rounds a typed time to the nearest step (never past midnight, min or max)."
            >
                <doc-preview [example]="examples.timePickerTyping" />
            </doc-section>

            <doc-section
                title="12h and seconds"
                description="format changes only what the field shows: the value is always canonical 24h text — HH:mm, or HH:mm:ss with showSeconds. In 12h, a missing AM / PM comes from the current time; type a or p to set it."
            >
                <doc-preview [example]="examples.timePickerFormats" />
            </doc-section>

            <doc-section
                title="Forms and validation"
                description="As a form control the value is a string or null. min and max disable the hours and minutes outside the range and are validated with the typed text as the mTime error, with a reason: incomplete, invalid, min or max."
            >
                <doc-preview [example]="examples.timePickerForm" />
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The clock button has <code mCode>aria-haspopup="dialog"</code> and
                        <code mCode>aria-expanded</code>; the popup is a non-modal <code mCode>dialog</code>. Clicking
                        the text field does not open it — typing stays undisturbed.
                    </li>
                    <li mListItem>
                        Each column is a <code mCode>listbox</code>: the arrows, PageUp / PageDown and Home / End change
                        the selection at once, skipping times outside min / max. Enter or Escape closes the dialog and
                        returns focus to the button; Tab and Shift+Tab cycle inside it.
                    </li>
                    <li mListItem>
                        With <code mCode>name</code> a hidden input carries the value as ISO 8601 time (<code mCode
                            >14:37</code
                        >).
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MTimePicker" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerPage {
    protected readonly examples = {timePickerForm, timePickerFormats, timePickerTyping}

    protected readonly value = signal<string | null>(null)
    protected readonly format = signal<(typeof FORMATS)[number]>('24h')
    protected readonly minuteStep = signal(1)
    protected readonly showSeconds = signal(false)
    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly clearable = signal(true)
    protected readonly readOnly = signal(false)
    protected readonly required = signal(false)
    protected readonly fullWidth = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('format', this.format, FORMATS),
        sliderControl('minuteStep', this.minuteStep, {min: 1, max: 30}),
        booleanControl('showSeconds', this.showSeconds),
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('clearable', this.clearable),
        booleanControl('readOnly', this.readOnly),
        booleanControl('required', this.required),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Time"',
            '[(value)]="value"',
            this.format() !== '24h' && `format="${this.format()}"`,
            this.minuteStep() !== 1 && `[minuteStep]="${this.minuteStep()}"`,
            this.showSeconds() && 'showSeconds',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.clearable() && 'clearable',
            this.readOnly() && 'readOnly',
            this.required() && 'required',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-time-picker\n    ${attrs.join('\n    ')}\n/>`
    })
}
