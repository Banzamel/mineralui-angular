import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MMiniCalendar} from '@banzamel/mineralui-angular/calendar/mini-calendar'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import miniCalendarForm from '@generated/examples/calendar/mini-calendar/mini-calendar-form'
import miniCalendarMarkers from '@generated/examples/calendar/mini-calendar/mini-calendar-markers'
import miniCalendarWeek from '@generated/examples/calendar/mini-calendar/mini-calendar-week'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const WEEK_STARTS = ['monday', 'sunday'] as const

@Component({
    selector: 'doc-mini-calendar-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MMiniCalendar, MCode, MList, MListItem],
    template: `
        <doc-article
            title="MMiniCalendar"
            description="A compact month grid for picking a day — beside a scheduler, in a sidebar or a popover — with marker dots and a tinted range."
        >
            <doc-section
                title="Playground"
                description="Tab into the grid, then use the arrows, PageUp / PageDown (Shift for years) and Home / End; Enter or Space picks. Moving past the month's edge turns the page."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-mini-calendar
                        [(value)]="value"
                        [size]="size()"
                        [color]="color()"
                        [weekStartsOn]="weekStart() === 'sunday' ? 0 : 1"
                        [showOutsideDays]="showOutsideDays()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Markers"
                description="markers is a function of the day returning one marker, a list or nothing. Up to three dots are drawn; color takes a palette family or any CSS colour, and the labels join the day's accessible name."
            >
                <doc-preview [example]="examples.miniCalendarMarkers" />
            </doc-section>

            <doc-section
                title="Highlighted week and the shown month"
                description="highlightRange tints a range of days (end inclusive) — here the week of the picked day, as a scheduler beside the calendar would show it. [(month)] binds the displayed month: it follows the header buttons, the keyboard and picks outside the month."
            >
                <doc-preview [example]="examples.miniCalendarWeek" />
            </doc-section>

            <doc-section
                title="Forms and unavailable days"
                description="MMiniCalendar is a form control (a Date, null when empty). min, max and disabledDates (a list or a predicate) make days unavailable; showOutsideDays off leaves the neighbouring months' cells empty."
            >
                <doc-preview [example]="examples.miniCalendarForm" />
            </doc-section>

            <doc-section title="Texts">
                <ul mList>
                    <li mListItem>
                        The header buttons are named by <code mCode>mineralui.miniCalendar.previousMonth</code> and
                        <code mCode>.nextMonth</code> from <code mCode>provideMineralI18n()</code> (English by default);
                        the <code mCode>texts</code> input overrides single keys. Day and month names follow
                        <code mCode>locale</code>.
                    </li>
                    <li mListItem>
                        react-pro also has built-in Polish defaults picked by locale; in Angular Polish comes from the
                        dictionary.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The month is a WAI-ARIA <code mCode>grid</code> labelled by its title, with one tab stop (roving
                        <code mCode>tabindex</code>). Days carry the full date (plus marker labels) as their name; today
                        has <code mCode>aria-current="date"</code>, the picked day <code mCode>aria-selected</code>.
                    </li>
                    <li mListItem>
                        Unavailable days use <code mCode>aria-disabled</code> instead of <code mCode>disabled</code>, so
                        the keyboard can move through them (react-pro disables them, which drops the tab stop).
                    </li>
                    <li mListItem>The title is a live region: turning the page is announced.</li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MMiniCalendar" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCalendarPage {
    protected readonly examples = {miniCalendarForm, miniCalendarMarkers, miniCalendarWeek}

    protected readonly value = signal<Date | null>(null)
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly weekStart = signal<(typeof WEEK_STARTS)[number]>('monday')
    protected readonly showOutsideDays = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        selectControl('weekStartsOn', this.weekStart, WEEK_STARTS),
        booleanControl('showOutsideDays', this.showOutsideDays),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[(value)]="value"',
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.weekStart() === 'sunday' && '[weekStartsOn]="0"',
            !this.showOutsideDays() && '[showOutsideDays]="false"',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-mini-calendar\n    ${attrs.join('\n    ')}\n/>`
    })
}
