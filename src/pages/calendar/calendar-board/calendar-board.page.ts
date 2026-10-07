import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MCalendarBoard} from '@banzamel/mineralui-angular/calendar/calendar-board'
import type {
    MCalendarAddEvent,
    MCalendarBoardView,
    MCalendarDetailsMode,
    MCalendarEvent,
    MCalendarEventActionEvent,
    MCalendarFilterOption,
} from '@banzamel/mineralui-angular/calendar/calendar-event'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MLink} from '@banzamel/mineralui-angular/typography/link'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import calendarBoardAgenda from '@generated/examples/calendar/calendar-board/calendar-board-agenda'
import calendarBoardTemplates from '@generated/examples/calendar/calendar-board/calendar-board-templates'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VIEWS: readonly MCalendarBoardView[] = ['month', 'week']
const MODES: readonly MCalendarDetailsMode[] = ['auto', 'popover', 'modal', 'none']

const today = new Date()
const day = (date: number) => new Date(today.getFullYear(), today.getMonth(), date)

const EVENTS: readonly MCalendarEvent[] = [
    {
        id: 'planning',
        title: 'Sprint planning',
        description: 'Define scope for the next framework pass.',
        date: day(3),
        startTime: '09:00',
        endTime: '10:00',
        type: 'Meeting',
        user: {id: 'anna', name: 'Anna Kowalska'},
    },
    {
        id: 'release',
        title: 'Release window',
        date: day(5),
        startTime: '12:00',
        endTime: '13:00',
        status: 'active',
        type: 'Release',
    },
    {id: 'invoices', title: 'Invoice review', date: day(6), startTime: '11:00', endTime: '11:30', type: 'Finance'},
    {id: 'polish', title: 'UI polish session', date: day(8), startTime: '15:00', endTime: '16:30', type: 'Workshop'},
    {id: 'sync', title: 'Design sync', date: day(8), startTime: '16:00', endTime: '17:00', type: 'Meeting'},
    {id: 'offsite', title: 'Team offsite', date: day(12), type: 'Meeting', status: 'done'},
    {id: 'retro', title: 'Retrospective', date: day(15), startTime: '14:00', endTime: '15:00', type: 'Meeting'},
    {id: 'audit', title: 'Accessibility audit', date: day(18), startTime: '10:00', endTime: '12:30', type: 'Workshop'},
    {
        id: 'launch',
        title: 'Launch',
        date: day(22),
        startTime: '09:30',
        endTime: '10:00',
        status: 'cancelled',
        type: 'Release',
    },
]

@Component({
    selector: 'doc-calendar-board-page',
    imports: [
        DocArticle,
        DocProNotice,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCalendarBoard,
        MCode,
        MLink,
        MList,
        MListItem,
        MStack,
        MText,
        RouterLink,
    ],
    template: `
        <doc-article
            title="MCalendarBoard"
            description="Month and week calendar of events with filters, an hour bar per day and the day's agenda — an hour timeline or an event list — in a popover or a modal."
        >
            <doc-pro-notice
                [components]="['MCalendarBoard']"
                reason="Scheduling boards and their exported building blocks are part of MineralUI Pro."
            />

            <doc-section
                title="Playground"
                description="Choose a day for its details; the hour bar in each cell shows the covered hours. The board reports (addEvent), (eventAction) and the models; the page changes events."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack>
                        <m-calendar-board
                            [events]="events()"
                            [filters]="shownFilters()"
                            [(view)]="view"
                            [(activeFilters)]="activeFilters"
                            [detailsMode]="detailsMode()"
                            [showTimeline]="showTimeline()"
                            [showHourBar]="showHourBar()"
                            [timelineStartHour]="startHour()"
                            [timelineEndHour]="endHour()"
                            [addable]="addable()"
                            [overlapWarning]="overlapWarning()"
                            [eventActions]="['edit', 'delete']"
                            (addEvent)="add($event)"
                            (eventAction)="onAction($event)"
                        />
                        <p mText size="sm" tone="muted" role="status">{{ log() }}</p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Agenda next to the grid"
                description="When the page shows the chosen day's agenda itself, detailsMode='none' keeps the days selectable — [(selectedDate)] and (dayClick) still work — and opens nothing. Here an MCalendarTimeline renders the day."
            >
                <doc-preview [example]="examples.agenda" />
            </doc-section>

            <doc-section
                title="Own badges and menus"
                description="ng-template mCalendarDayBadge replaces the event count in the cells (ng-template mCalendarDay replaces the whole cell content). dayMenuItems builds the menu in the day details; chosen items arrive in (dayAction) with the day and its events. eventMenuItems does the same for every event row — with icons, colors and disabled items — reported by (eventAction)."
            >
                <doc-preview [example]="examples.templates" />
            </doc-section>

            <doc-section title="Building blocks">
                <p mText>
                    The day details are made of public components — the event list and the hour timeline — which can
                    also be used on their own, with their own menu and rows: see
                    <a mLink tone="accent" underline="always" class="doc-prose-link" routerLink="/docs/calendar-event"
                        >Calendar events</a
                    >.
                </p>
            </doc-section>

            <doc-section title="Texts">
                <ul mList>
                    <li mListItem>
                        Labels, the view switch, the empty day and the timeline come from
                        <code mCode>mineralui.calendarBoard.*</code> in <code mCode>provideMineralI18n()</code> (English
                        by default; see
                        <a mLink tone="accent" underline="always" class="doc-prose-link" routerLink="/docs/i18n"
                            >Languages (i18n)</a
                        >); <code mCode>emptyText</code> overrides the empty day.
                    </li>
                    <li mListItem>
                        Month, day and time formats follow <code mCode>locale</code> — without it the locale of
                        <code mCode>MI18nService</code> (then <code mCode>LOCALE_ID</code>). These docs use
                        <code mCode>en</code>, so the dates are in US format.
                    </li>
                </ul>
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The days are a WAI-ARIA grid (a table named by the period title) with one Tab stop: arrows move by day and week, Home / End to the week's edges, PageUp / PageDown by month (Shift: year) — moving past the period shows the next one. Each day is named by its date and event count, the chosen day is aria-selected, today aria-current='date'. Enter or Space chooses the day and opens its details: a dialog named by the date (a modal on narrow screens) that returns focus to the day on Escape. The '+' in the cells and the hour bars are for the mouse only (hidden from screen readers) — the keyboard adds events from the day menu or the timeline. Filters and the view switch are toggle buttons (aria-pressed)."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Handlers become outputs: onDayClick → (dayClick) {date, events}, onAddEvent → (addEvent) {date, hour?}, renderDayMenu with onSelect → dayMenuItems + (dayAction), onEventEdit / onEventDelete → eventActions + (eventAction). month, view, selectedDate and activeFilters are models ([(month)]…) instead of value + default + onChange. renderDayCell / dayBadge / renderEventItem become ng-template mCalendarDay / mCalendarDayBadge / mCalendarEvent. weekStartsOn → firstDayOfWeek (as MCalendar), addEventLabel / dayMenuLabel → the translation dictionary, fullWidth dropped (the board always fills its container). The grid is a table with keyboard navigation (React: 42 buttons with a nested span role='button'); the week view keeps seven columns on narrow screens (React: 2 or 1). Hour bar tooltips are native (title). The details popover closes on a click outside instead of a transparent shield over the page."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MCalendarBoard" />
                    <doc-props-table api="MCalendarDayDef" />
                    <doc-props-table api="MCalendarDayBadgeDef" />
                    <doc-props-table api="MCalendarFilterOption" />
                    <doc-props-table api="MCalendarDayClickEvent" />
                    <doc-props-table api="MCalendarDayActionEvent" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarBoardPage {
    protected readonly examples = {agenda: calendarBoardAgenda, templates: calendarBoardTemplates}

    protected readonly events = signal<readonly MCalendarEvent[]>(EVENTS)
    protected readonly log = signal('Choose a day.')
    protected readonly filters: readonly MCalendarFilterOption[] = [
        {id: 'meetings', label: 'Meetings', predicate: (event) => event.type === 'Meeting'},
        {id: 'releases', label: 'Releases', predicate: (event) => event.type === 'Release'},
        {id: 'workshops', label: 'Workshops', predicate: (event) => event.type === 'Workshop'},
    ]

    protected readonly view = signal<MCalendarBoardView>('month')
    protected readonly detailsMode = signal<MCalendarDetailsMode>('auto')
    protected readonly showTimeline = signal(true)
    protected readonly showHourBar = signal(true)
    protected readonly startHour = signal(6)
    protected readonly endHour = signal(20)
    protected readonly withFilters = signal(true)
    protected readonly activeFilters = signal<readonly string[]>([])
    protected readonly addable = signal(true)
    protected readonly overlapWarning = signal(true)
    protected readonly controls = [
        selectControl('view', this.view, VIEWS),
        selectControl('detailsMode', this.detailsMode, MODES),
        booleanControl('showTimeline', this.showTimeline),
        sliderControl('timelineStartHour', this.startHour, {min: 0, max: 12}),
        sliderControl('timelineEndHour', this.endHour, {min: 12, max: 23}),
        booleanControl('showHourBar', this.showHourBar),
        booleanControl('filters', this.withFilters),
        booleanControl('addable', this.addable),
        booleanControl('overlapWarning', this.overlapWarning),
    ]
    protected readonly shownFilters = computed(() => (this.withFilters() ? this.filters : []))

    protected readonly code = computed(() => {
        const attrs = [
            '[events]="events()"',
            this.withFilters() && '[filters]="filters"',
            this.withFilters() && '[(activeFilters)]="activeFilters"',
            '[(view)]="view"',
            this.detailsMode() !== 'auto' && `detailsMode="${this.detailsMode()}"`,
            !this.showTimeline() && '[showTimeline]="false"',
            !this.showHourBar() && '[showHourBar]="false"',
            this.startHour() !== 0 && `[timelineStartHour]="${this.startHour()}"`,
            this.endHour() !== 23 && `[timelineEndHour]="${this.endHour()}"`,
            this.addable() && 'addable',
            this.overlapWarning() && 'overlapWarning',
            `[eventActions]="['edit', 'delete']"`,
            this.addable() && '(addEvent)="create($event)"',
            '(eventAction)="onAction($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-calendar-board\n    ${attrs.join('\n    ')}\n/>`
    })

    private nextId = 1

    protected add({date, hour}: MCalendarAddEvent): void {
        const startTime = hour === undefined ? undefined : `${String(hour).padStart(2, '0')}:00`
        const endTime = hour === undefined ? undefined : `${String(hour).padStart(2, '0')}:45`
        const id = `new-${this.nextId++}`
        this.events.update((events) => [...events, {id, title: 'New event', date, startTime, endTime, type: 'Meeting'}])
        this.log.set(`Added "New event" on ${date.toDateString()}${startTime ? ` at ${startTime}` : ''}.`)
    }

    protected onAction({actionId, event}: MCalendarEventActionEvent): void {
        if (actionId === 'delete') {
            this.events.update((events) => events.filter((item) => item.id !== event.id))
            this.log.set(`Deleted "${event.title}".`)
            return
        }
        this.log.set(`Edit "${event.title}".`)
    }
}
