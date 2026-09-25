import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MDatePicker} from '@banzamel/mineralui-angular/dropdowns/date-picker'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import type {DateFormat} from '@banzamel/mineralui-angular/utils'
import datePickerForm from '@generated/examples/forms/date-picker/date-picker-form'
import datePickerTime from '@generated/examples/forms/date-picker/date-picker-time'
import datePickerTyping from '@generated/examples/forms/date-picker/date-picker-typing'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info']
const FORMATS: readonly DateFormat[] = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD']
const SEPARATORS = ['.', '/', '-'] as const
const TIME_FORMATS = ['24h', '12h'] as const
const FIRST_DAYS = ['monday', 'sunday'] as const

@Component({
    selector: 'doc-date-picker-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCode, MDatePicker, MList, MListItem],
    template: `
        <doc-article
            title="MDatePicker"
            description="Date field with a calendar popup: type the date (completed from today) or pick it, optionally with the time."
        >
            <doc-section
                title="Playground"
                description="Type a partial date and leave the field, or open the calendar with the button or Alt+ArrowDown."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-date-picker
                        label="Date"
                        [(value)]="value"
                        [format]="format()"
                        [separator]="separator()"
                        [withTime]="withTime()"
                        [timeFormat]="timeFormat()"
                        [minuteStep]="minuteStep()"
                        [showSeconds]="showSeconds()"
                        [firstDayOfWeek]="firstDay() === 'sunday' ? 0 : 1"
                        [showTodayButton]="showTodayButton()"
                        [inline]="inline()"
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
                description="Missing parts come from today when the field loses focus or on Enter: 12 → 12.09.2026, 1.3 → 01.03.2026, 12.03.26 → 12.03.2026. The completion shows as grey ghost text — Tab accepts it and stays in the field. Incomplete or impossible text stays as typed with a null value and an error."
            >
                <doc-preview [example]="examples.datePickerTyping" />
            </doc-section>

            <doc-section
                title="Date and time"
                description="withTime adds the time after a space and hour / minute columns beside the calendar. A date alone gets the current time; 9 becomes 09:37. minuteStep limits the minute column and rounds a typed time on blur; timeFormat 12h adds an AM / PM column."
            >
                <doc-preview [example]="examples.datePickerTime" />
            </doc-section>

            <doc-section
                title="Forms and validation"
                description="As a form control the value is a Date or null. The typed text is validated as the mDate error with a reason: incomplete, invalid, invalidTime, min, max or unavailable (min, max, disabledDates)."
            >
                <doc-preview [example]="examples.datePickerForm" />
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The calendar button has <code mCode>aria-haspopup="dialog"</code> and
                        <code mCode>aria-expanded</code>; the popup is a non-modal <code mCode>dialog</code> (WAI-ARIA
                        APG Date Picker Dialog). Clicking the text field does not open it — typing stays undisturbed.
                    </li>
                    <li mListItem>
                        Opening moves focus to the selected day (or today); Tab and Shift+Tab cycle inside the dialog,
                        Escape closes it and returns focus to the button, as does picking a day.
                    </li>
                    <li mListItem>
                        The time columns are <code mCode>listbox</code> elements: the arrows, PageUp / PageDown and Home
                        / End change the selection at once.
                    </li>
                    <li mListItem>
                        With <code mCode>name</code> a hidden input carries the value as local ISO 8601 (<code mCode
                            >2026-09-24</code
                        >, <code mCode>2026-09-24T14:37</code>).
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MDatePicker" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerPage {
    protected readonly examples = {datePickerForm, datePickerTime, datePickerTyping}

    protected readonly value = signal<Date | null>(null)
    protected readonly format = signal<DateFormat>('DD/MM/YYYY')
    protected readonly separator = signal<(typeof SEPARATORS)[number]>('.')
    protected readonly withTime = signal(false)
    protected readonly timeFormat = signal<(typeof TIME_FORMATS)[number]>('24h')
    protected readonly minuteStep = signal(1)
    protected readonly showSeconds = signal(false)
    protected readonly firstDay = signal<(typeof FIRST_DAYS)[number]>('monday')
    protected readonly showTodayButton = signal(true)
    protected readonly inline = signal(false)
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
        selectControl('separator', this.separator, SEPARATORS),
        booleanControl('withTime', this.withTime),
        selectControl('timeFormat', this.timeFormat, TIME_FORMATS),
        sliderControl('minuteStep', this.minuteStep, {min: 1, max: 30}),
        booleanControl('showSeconds', this.showSeconds),
        selectControl('firstDayOfWeek', this.firstDay, FIRST_DAYS),
        booleanControl('showTodayButton', this.showTodayButton),
        booleanControl('inline', this.inline),
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
            'label="Date"',
            '[(value)]="value"',
            this.format() !== 'DD/MM/YYYY' && `format="${this.format()}"`,
            this.separator() !== '.' && `separator="${this.separator()}"`,
            this.withTime() && 'withTime',
            this.timeFormat() !== '24h' && `timeFormat="${this.timeFormat()}"`,
            this.minuteStep() !== 1 && `[minuteStep]="${this.minuteStep()}"`,
            this.showSeconds() && 'showSeconds',
            this.firstDay() === 'sunday' && '[firstDayOfWeek]="0"',
            !this.showTodayButton() && '[showTodayButton]="false"',
            this.inline() && 'inline',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.clearable() && 'clearable',
            this.readOnly() && 'readOnly',
            this.required() && 'required',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-date-picker\n    ${attrs.join('\n    ')}\n/>`
    })
}
