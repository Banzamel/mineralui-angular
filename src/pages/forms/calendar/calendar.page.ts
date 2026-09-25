import {ChangeDetectionStrategy, Component, computed, effect, signal, untracked} from '@angular/core'
import {MCalendar} from '@banzamel/mineralui-angular/dropdowns/calendar'
import type {MDateRange, MDateRangePresetsLayout} from '@banzamel/mineralui-angular/dropdowns/calendar'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import calendarConstraints from '@generated/examples/forms/calendar/calendar-constraints'
import calendarForm from '@generated/examples/forms/calendar/calendar-form'
import calendarRange from '@generated/examples/forms/calendar/calendar-range'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info']
const MONTHS = ['1', '2'] as const
const FIRST_DAYS = ['monday', 'sunday'] as const
const LAYOUTS: readonly MDateRangePresetsLayout[] = ['inline', 'sidebar']

@Component({
    selector: 'doc-calendar-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCalendar, MCode, MList, MListItem],
    template: `
        <doc-article
            title="MCalendar"
            description="A month grid for picking a date or a date range — the calendar inside the date pickers, usable on its own."
        >
            <doc-section
                title="Playground"
                description="Tab into the grid, then use the arrows, PageUp / PageDown (Shift for years) and Home / End; Enter or Space picks. Click the title for the month grid."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-calendar
                        [(value)]="value"
                        [range]="range()"
                        [months]="months() === '2' ? 2 : 1"
                        [presets]="presets()"
                        [presetsLayout]="presetsLayout()"
                        [firstDayOfWeek]="firstDay() === 'sunday' ? 0 : 1"
                        [showTodayButton]="showTodayButton()"
                        [color]="color()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Ranges and presets"
                description="range picks a start and an end in two clicks (in any order) with a hover preview. presets adds the 12 built-in quick ranges or your own; a preset's value can be a function evaluated on click."
            >
                <doc-preview [example]="examples.calendarRange" />
            </doc-section>

            <doc-section
                title="Unavailable dates"
                description="min, max and disabledDates (a list or a predicate) make days unavailable: they stay reachable with the keyboard but cannot be picked."
            >
                <doc-preview [example]="examples.calendarConstraints" />
            </doc-section>

            <doc-section
                title="Forms"
                description="MCalendar is a form control: a Date (or an MDateRange with range), null when empty."
            >
                <doc-preview [example]="examples.calendarForm" />
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        Each month is a WAI-ARIA <code mCode>grid</code> labelled by its title, with one tab stop
                        (roving <code mCode>tabindex</code>). Days carry the full date as their name; today has
                        <code mCode>aria-current="date"</code>, picked days <code mCode>aria-selected</code>.
                    </li>
                    <li mListItem>
                        Unavailable days use <code mCode>aria-disabled</code> instead of <code mCode>disabled</code>, so
                        the keyboard can move through them.
                    </li>
                    <li mListItem>
                        The title is a live region: moving to another month is announced. The month grid (title button)
                        has the same keyboard, with PageUp / PageDown moving by year.
                    </li>
                    <li mListItem>Not in react-pro — added in the Angular port (ADR 0015).</li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MCalendar" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPage {
    protected readonly examples = {calendarConstraints, calendarForm, calendarRange}

    protected readonly value = signal<Date | MDateRange | null>(null)
    protected readonly range = signal(false)
    protected readonly months = signal<(typeof MONTHS)[number]>('1')
    protected readonly presets = signal(false)
    protected readonly presetsLayout = signal<MDateRangePresetsLayout>('inline')
    protected readonly firstDay = signal<(typeof FIRST_DAYS)[number]>('monday')
    protected readonly showTodayButton = signal(true)
    protected readonly color = signal<MColor>('primary')
    protected readonly disabled = signal(false)

    protected readonly controls = [
        booleanControl('range', this.range),
        selectControl('months', this.months, MONTHS),
        booleanControl('presets', this.presets),
        selectControl('presetsLayout', this.presetsLayout, LAYOUTS),
        selectControl('firstDayOfWeek', this.firstDay, FIRST_DAYS),
        booleanControl('showTodayButton', this.showTodayButton),
        selectControl('color', this.color, COLORS),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[(value)]="value"',
            this.range() && 'range',
            this.months() === '2' && '[months]="2"',
            this.presets() && 'presets',
            this.presetsLayout() !== 'inline' && `presetsLayout="${this.presetsLayout()}"`,
            this.firstDay() === 'sunday' && '[firstDayOfWeek]="0"',
            !this.showTodayButton() && '[showTodayButton]="false"',
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-calendar\n    ${attrs.join('\n    ')}\n/>`
    })

    constructor() {
        // A single date and a range keep different value shapes.
        effect(() => {
            this.range()
            untracked(() => this.value.set(null))
        })
    }
}
