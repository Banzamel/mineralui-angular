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
import {CALENDAR_AVATARS} from '../calendar-samples'

const VIEWS: readonly MCalendarBoardView[] = ['month', 'week']
const MODES: readonly MCalendarDetailsMode[] = ['auto', 'popover', 'modal', 'none']

const today = new Date()
const day = (date: number) => new Date(today.getFullYear(), today.getMonth(), date)

const COLORS: Readonly<Record<string, string>> = {
    Meeting: '#0ea5e9',
    Release: '#22c55e',
    Finance: '#f59e0b',
    Workshop: '#a855f7',
    People: '#ec4899',
    Facilities: '#78716c',
}

const PEOPLE = {
    anna: {id: 'anna', name: 'Anna Kowalska', avatar: CALENDAR_AVATARS.annaKowalska},
    jan: {id: 'jan', name: 'Jan Nowak', avatar: CALENDAR_AVATARS.janNowak},
    ewa: {id: 'ewa', name: 'Ewa Mazur', avatar: CALENDAR_AVATARS.ewaMazur},
    tomasz: {id: 'tomasz', name: 'Tomasz Kaczmarek', avatar: CALENDAR_AVATARS.tomaszKaczmarek},
} as const

type Sample = readonly [date: number, time: string, title: string, type: string, extra?: Partial<MCalendarEvent>]

// A month like the one in docs-react: quiet days next to busy ones (up to seven events), all-day badges and owners.
const SAMPLES: readonly Sample[] = [
    [
        3,
        '09:00–10:00',
        'Sprint planning',
        'Meeting',
        {description: 'Define scope for the next pass.', user: PEOPLE.anna},
    ],
    [5, '12:00–13:00', 'Release window', 'Release', {status: 'active', user: PEOPLE.jan}],
    [6, '11:00–11:30', 'Invoice review', 'Finance'],
    [7, '10:00–11:00', 'Pairing session', 'Workshop'],
    [7, '10:30–11:30', 'Quick call', 'Meeting'],
    [8, '15:00–16:30', 'UI polish session', 'Workshop', {user: PEOPLE.ewa}],
    [9, '', 'Birthday reminder', 'People', {badgeLabel: 'Birthday', status: 'done'}],
    [10, '09:00–09:30', 'Standup', 'Meeting'],
    [10, '09:45–11:00', '1:1 with manager', 'Meeting', {user: PEOPLE.tomasz}],
    [10, '10:30–12:00', 'Architecture review', 'Workshop'],
    [10, '12:00–13:00', 'Team lunch', 'People'],
    [10, '14:30–17:00', 'Design critique', 'Workshop', {user: PEOPLE.ewa}],
    [10, '17:15–18:30', 'Postmortem', 'Meeting'],
    [11, '09:00–12:00', 'Strategy huddle', 'Meeting'],
    [11, '10:00–11:00', 'Client check-in', 'Meeting', {user: PEOPLE.jan}],
    [11, '12:30–13:45', 'Lunch & learn', 'Workshop'],
    [11, '14:00–15:30', 'Office hours', 'People'],
    [11, '16:00–17:30', 'Sprint demo', 'Meeting', {status: 'active'}],
    [12, '17:15–20:00', 'Customer onboarding', 'Meeting', {status: 'active', user: PEOPLE.anna}],
    [13, '13:45–16:30', 'Quarterly retro', 'Meeting'],
    [14, '', 'Office maintenance', 'Facilities'],
    [16, '09:00–09:30', 'Coffee chat', 'People', {status: 'done'}],
    [16, '09:30–10:00', 'Standup', 'Meeting'],
    [16, '11:00–12:00', 'Backend deploy', 'Release'],
    [16, '12:00–13:00', 'Team lunch', 'People'],
    [16, '13:00–14:30', 'Customer call', 'Meeting', {user: PEOPLE.tomasz}],
    [16, '15:00–16:00', 'Bug bash', 'Workshop'],
    [16, '16:30–18:00', 'Roadmap workshop', 'Workshop', {user: PEOPLE.anna}],
    [17, '14:00–15:30', 'Marketing review', 'Workshop'],
    [18, '10:00–12:30', 'Accessibility audit', 'Workshop', {user: PEOPLE.ewa}],
    [19, '09:00–09:45', 'Morning standup', 'Meeting'],
    [19, '10:00–11:30', 'Sprint planning', 'Meeting', {user: PEOPLE.anna}],
    [19, '11:30–12:30', 'Interview round 1', 'People'],
    [19, '13:30–14:30', 'Interview round 2', 'People'],
    [19, '15:00–16:00', 'Design crit', 'Workshop'],
    [19, '16:30–18:00', 'Retro', 'Meeting', {status: 'cancelled'}],
    [20, '16:00–17:00', 'Town hall', 'Meeting'],
    [21, '', 'Public holiday', 'People', {badgeLabel: 'Holiday', status: 'done'}],
    [22, '09:30–10:00', 'Launch', 'Release', {status: 'cancelled'}],
    [23, '09:00–09:15', 'Standup', 'Meeting'],
    [23, '09:30–11:00', 'Planning', 'Meeting'],
    [23, '11:00–12:00', 'Design walkthrough', 'Workshop', {user: PEOPLE.ewa}],
    [23, '13:00–15:30', 'Customer demo', 'Meeting', {user: PEOPLE.jan}],
    [23, '17:00–18:00', 'Weekly retro', 'Meeting'],
    [24, '09:00–11:00', 'Finance close', 'Finance'],
    [26, '', 'Release freeze', 'Release'],
    [27, '09:00–13:00', 'Hackday kickoff', 'Workshop'],
    [28, '14:00–17:00', 'Hackday demos', 'Workshop', {user: PEOPLE.tomasz}],
]

const EVENTS: readonly MCalendarEvent[] = SAMPLES.map(([date, time, title, type, extra], index) => {
    const [startTime, endTime] = time ? time.split('–') : []
    return {id: `event-${index}`, title, date: day(date), startTime, endTime, type, color: COLORS[type], ...extra}
})

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
                description="Choose a day for its details; the hour bar in each cell shows the covered hours — busy days fill it with several segments. In the details, rows show the type, a badgeLabel (Birthday, Holiday) and the owner. The board reports (addEvent), (eventAction) and the models; the page changes events."
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
                description="Handlers become outputs: onDayClick → (dayClick) {date, events}, onAddEvent → (addEvent) {date, hour?}, renderDayMenu with onSelect → dayMenuItems + (dayAction), onEventEdit / onEventDelete → eventActions + (eventAction). month, view, selectedDate and activeFilters are models ([(month)]…) instead of value + default + onChange. renderDayCell / dayBadge / renderEventItem become ng-template mCalendarDay / mCalendarDayBadge / mCalendarEvent. weekStartsOn → firstDayOfWeek (as MCalendar), addEventLabel / dayMenuLabel → the translation dictionary, fullWidth dropped (the board always fills its container). The week view is the same keyboard grid as the month and keeps seven columns on narrow screens (React: a plain week list, 2 or 1 columns). Hour bar tooltips are native (title). The details popover closes on a click outside instead of a transparent shield over the page."
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
        {id: 'people', label: 'People', predicate: (event) => event.type === 'People'},
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
