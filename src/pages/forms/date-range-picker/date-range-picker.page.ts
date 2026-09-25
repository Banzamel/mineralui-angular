import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MDateRange} from '@banzamel/mineralui-angular/dropdowns/calendar'
import {MDateRangePicker} from '@banzamel/mineralui-angular/dropdowns/date-range-picker'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import type {DateFormat} from '@banzamel/mineralui-angular/utils'
import dateRangePickerForm from '@generated/examples/forms/date-range-picker/date-range-picker-form'
import dateRangePickerPresets from '@generated/examples/forms/date-range-picker/date-range-picker-presets'
import dateRangePickerTyping from '@generated/examples/forms/date-range-picker/date-range-picker-typing'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info']
const FORMATS: readonly DateFormat[] = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD']
const SEPARATORS = ['.', '/', '-'] as const
const PRESET_LAYOUTS = ['none', 'inline', 'sidebar'] as const
const FIRST_DAYS = ['monday', 'sunday'] as const

@Component({
    selector: 'doc-date-range-picker-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCode,
        MDateRangePicker,
        MList,
        MListItem,
    ],
    template: `
        <doc-article
            title="MDateRangePicker"
            description="One start – end field with a two-month calendar: type the range (completed from today and from the start) or pick it, with optional presets."
        >
            <doc-section
                title="Playground"
                description="Type two partial dates separated by a space, or open the calendar with the button or Alt+ArrowDown and click the start and the end."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-date-range-picker
                        label="Range"
                        [(value)]="value"
                        [format]="format()"
                        [separator]="separator()"
                        [presets]="presets() !== 'none'"
                        [presetsLayout]="presets() === 'sidebar' ? 'sidebar' : 'inline'"
                        [allowSameDay]="allowSameDay()"
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
                description="The delimiter ( – ) appears after a complete start date or a typed space. On blur or Enter the start is completed from today and the end from the start: 12.03.2026 – 15 → 12.03.2026 – 15.03.2026, 1 5 → 01.09 – 05.09 of this year. Tab accepts the grey hint: first the start, then the delimiter, then the end."
            >
                <doc-preview [example]="examples.dateRangePickerTyping" />
            </doc-section>

            <doc-section
                title="Presets"
                description="presets adds the 12 built-in ranges (today, last days, months, a year) or your own list; a preset value may be a function computed on click. presetsLayout places them in a row above the months or in a column beside them. A preset whose end is not selectable is disabled."
            >
                <doc-preview [example]="examples.dateRangePickerPresets" />
            </doc-section>

            <doc-section
                title="Forms and validation"
                description="As a form control the value is {start, end} or null — never half a range: closing the calendar after the first click keeps the previous value. The typed text is validated as the mDate error with a reason: incomplete, invalid, min, max, unavailable or order (end before start, or the same day with allowSameDay false)."
            >
                <doc-preview [example]="examples.dateRangePickerForm" />
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The calendar button has <code mCode>aria-haspopup="dialog"</code> and
                        <code mCode>aria-expanded</code>; the popup is a non-modal <code mCode>dialog</code> (WAI-ARIA
                        APG Date Picker Dialog) with two month grids.
                    </li>
                    <li mListItem>
                        The grids use roving focus: arrows, PageUp / PageDown (month), Shift+PageUp / PageDown (year),
                        Home / End; Enter or Space picks the start, then the end, with the range previewed as focus
                        moves. Escape closes and returns focus to the button, as does picking the end.
                    </li>
                    <li mListItem>
                        With <code mCode>name</code> a hidden input carries the range as an ISO 8601 interval of local
                        dates (<code mCode>2026-09-01/2026-09-24</code>).
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MDateRangePicker" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerPage {
    protected readonly examples = {dateRangePickerForm, dateRangePickerPresets, dateRangePickerTyping}

    protected readonly value = signal<MDateRange | null>(null)
    protected readonly format = signal<DateFormat>('DD/MM/YYYY')
    protected readonly separator = signal<(typeof SEPARATORS)[number]>('.')
    protected readonly presets = signal<(typeof PRESET_LAYOUTS)[number]>('none')
    protected readonly allowSameDay = signal(true)
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
        selectControl('presets', this.presets, PRESET_LAYOUTS),
        booleanControl('allowSameDay', this.allowSameDay),
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
            'label="Range"',
            '[(value)]="value"',
            this.format() !== 'DD/MM/YYYY' && `format="${this.format()}"`,
            this.separator() !== '.' && `separator="${this.separator()}"`,
            this.presets() !== 'none' && 'presets',
            this.presets() === 'sidebar' && 'presetsLayout="sidebar"',
            !this.allowSameDay() && '[allowSameDay]="false"',
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
        return `<m-date-range-picker\n    ${attrs.join('\n    ')}\n/>`
    })
}
