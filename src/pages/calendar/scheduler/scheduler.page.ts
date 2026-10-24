import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MScheduler} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {
    MSchedulerDropEvent,
    MSchedulerEvent,
    MSchedulerResizeEvent,
    MSchedulerResourceSet,
    MSchedulerSlot,
    MSchedulerUnavailableSlot,
    MSchedulerView,
} from '@banzamel/mineralui-angular/calendar/scheduler'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import schedulerAgenda from '@generated/examples/calendar/scheduler/scheduler-agenda'
import schedulerBasic from '@generated/examples/calendar/scheduler/scheduler-basic'
import schedulerComposed from '@generated/examples/calendar/scheduler/scheduler-composed'
import schedulerDetails from '@generated/examples/calendar/scheduler/scheduler-details'
import schedulerFilters from '@generated/examples/calendar/scheduler/scheduler-filters'
import schedulerMonth from '@generated/examples/calendar/scheduler/scheduler-month'
import schedulerResources from '@generated/examples/calendar/scheduler/scheduler-resources'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VIEWS: readonly MSchedulerView[] = ['week', 'day', 'timeline', 'month', 'agenda']
const HEIGHTS = ['fixed', 'auto'] as const

const today = new Date()
const at = (dayOffset: number, hour: number, minute = 0) =>
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset, hour, minute)

// The data of the "Resources and drag & drop" example, spread over the week.
const SETS: readonly MSchedulerResourceSet[] = [
    {
        id: 'staff',
        label: 'Teachers',
        resources: [
            {id: 'anna', label: 'Anna Nowak', sublabel: 'English', color: 'var(--mineral-info)'},
            {id: 'ben', label: 'Ben Carter', sublabel: 'Science', color: 'var(--mineral-success)'},
            {
                id: 'cleo',
                label: 'Cleo Park',
                sublabel: 'Part-time',
                color: 'var(--mineral-warning)',
                businessHours: {start: '12:00', end: '17:00'},
            },
        ],
    },
    {
        id: 'room',
        label: 'Rooms',
        resources: [
            {id: 'r12', label: 'Room 12'},
            {id: 'lab', label: 'Lab'},
        ],
    },
]

const lesson = (
    id: string,
    title: string,
    startAt: Date,
    endAt: Date,
    staff: 'anna' | 'ben' | 'cleo',
    room: 'r12' | 'lab'
): MSchedulerEvent => {
    const color = {anna: 'var(--mineral-info)', ben: 'var(--mineral-success)', cleo: 'var(--mineral-warning)'}[staff]
    return {id, title, startAt, endAt, color, resources: {staff, room}}
}

const INITIAL: readonly MSchedulerEvent[] = [
    lesson('e1', 'English A1', at(0, 9), at(0, 10, 30), 'anna', 'r12'),
    lesson('e2', 'Physics lab', at(0, 10), at(0, 12), 'ben', 'lab'),
    lesson('e3', 'Chemistry', at(0, 13), at(0, 14), 'ben', 'lab'),
    lesson('e4', 'English B2', at(0, 14), at(0, 15, 30), 'cleo', 'r12'),
    {id: 'sick', title: 'Sick leave', kind: 'block', startAt: at(0, 12), endAt: at(0, 14), resources: {staff: 'anna'}},
    lesson('e5', 'English A2', at(-1, 8, 30), at(-1, 10), 'anna', 'r12'),
    lesson('e6', 'Biology', at(-1, 11), at(-1, 12, 30), 'ben', 'lab'),
    lesson('e7', 'Conversation club', at(1, 15), at(1, 16, 30), 'cleo', 'r12'),
    lesson('e8', 'Physics lab', at(1, 9), at(1, 11), 'ben', 'lab'),
    lesson('e9', 'English B1', at(2, 10), at(2, 11, 30), 'anna', 'r12'),
    lesson('e10', 'Exam prep', at(2, 13), at(2, 15), 'cleo', 'r12'),
    lesson('e11', 'Chemistry', at(3, 8), at(3, 9, 30), 'ben', 'lab'),
]

const UNAVAILABLE: readonly MSchedulerUnavailableSlot[] = [
    {startAt: at(0, 12), endAt: at(0, 12, 30), kind: 'busy', label: 'Lunch break'},
    {
        resourceSetId: 'room',
        resourceId: 'lab',
        startAt: at(0, 15),
        endAt: at(0, 18),
        kind: 'maintenance',
        label: 'Cleaning',
    },
    {startAt: at(0, 18), endAt: at(0, 20), kind: 'closed', label: 'School closed'},
]

@Component({
    selector: 'doc-scheduler-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocProNotice,
        DocPropsTable,
        MButton,
        MCode,
        MList,
        MListItem,
        MScheduler,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MScheduler"
            description="A full scheduler — week, day, timeline, month and agenda views with resources, drag & drop, a toolbar, filters and event details — that you can also take apart and compose yourself."
        >
            <doc-pro-notice
                [components]="['MScheduler']"
                reason="The scheduler is part of MineralUI Pro alongside MCalendarBoard and MTimelineBoard."
            />

            <doc-section
                title="Playground"
                description="Drag an event to move it, drag its bottom edge to resize, or drag across empty space to add a lesson. Switch to day or timeline for a column or row per teacher and room. Everything also works from the keyboard: focus an event and press M to move or Shift+M to resize. The playground binds [(view)], so it keeps the chosen view on narrow screens too (unbound, the view falls back to the agenda below 640 px)."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack>
                        <div>
                            <button mButton size="sm" variant="outlined" (click)="reset()">Reset events</button>
                        </div>
                        <m-scheduler
                            [events]="events()"
                            [(view)]="view"
                            [(showWeekends)]="showWeekends"
                            [resourceSets]="sets"
                            [unavailableSlots]="unavailable"
                            [businessHours]="{start: '08:00', end: '17:00'}"
                            [dayStartHour]="7"
                            [dayEndHour]="20"
                            [height]="height() === 'auto' ? 'auto' : 600"
                            [draggable]="draggable()"
                            [resizable]="resizable()"
                            [selectable]="selectable()"
                            (eventDrop)="move($event)"
                            (eventResize)="resize($event)"
                            (rangeSelect)="add($event)"
                        />
                        <p mText size="sm" tone="muted" role="status">{{ log() }}</p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Scheduler"
                description="Switch views from the menu (it also hides weekends), page with the arrows or pick a date. Click an event for its details, an empty slot to report it. The filter narrows the events: the scheduler only reports filterValues, the app filters. Below 640 px the view falls back to the agenda and details open in a bottom sheet."
            >
                <doc-preview [example]="examples.schedulerBasic" />
            </doc-section>

            <doc-section
                title="Month"
                description="A day with more than monthMaxEvents events collapses to '+N more', which opens the whole day in a popover (morePopover; (moreClick) reports it either way). The day number or 'Open day' drills down to the day view, and 'Back to month' returns to the same month. monthDensityBar adds a bar of how busy each day is. With draggable a chip moves to another day — pointer or M, arrows by a day / week, Enter — keeping its time of day and duration; the holiday block refuses drops."
            >
                <doc-preview [example]="examples.schedulerMonth" />
            </doc-section>

            <doc-section
                title="Resources and drag & drop"
                description="With resource sets the day view gets a column and the timeline a row per resource (the view menu offers each set). Drag an event to another time or person, drag its bottom / right edge to change the end, or drag on empty space to add a lesson. Hatched bands are unavailable: advisory ones accept drops, the closed evening and the sick-leave block refuse them, and dropValidator refuses Physics outside the lab. The scheduler only reports (eventDrop), (eventResize) and (rangeSelect) — the app moves the events."
            >
                <doc-preview [example]="examples.schedulerResources" />
            </doc-section>

            <doc-section
                title="Filters and loading"
                description="Filters are definitions only: their values live in [(filterValues)] (a missing key means 'All'), a multiple filter holds an array, and a long option list gets a search field. Checkbox entries of the view menu come from [viewToggles] with their state in [(toggleValues)]. 'Clear filters' empties filterValues and emits (clearFilters). Here the lessons load for every drawn range from (rangeChange): while loading is set the old events stay under a scrim and the empty state waits."
            >
                <doc-preview [example]="examples.schedulerFilters" />
            </doc-section>

            <doc-section
                title="Details"
                description="detailsMode picks where the details open: auto (a popover, a bottom sheet below 640 px), popover, sheet or none — then only (eventSelect) and [(openEventId)] report the choice. ng-template[mSchedulerEvent] replaces the content of the bars and [mSchedulerEventHeader] the title block of the details. peopleClickable turns the leader and participants into buttons reported by (personClick); more than 12 people collapse behind '+N'."
            >
                <doc-preview [example]="examples.schedulerDetails" />
            </doc-section>

            <doc-section
                title="Composition"
                description="[mSchedulerProvider] holds the state; place the parts — m-scheduler-toolbar, m-scheduler-filter-bar, m-scheduler-body or a single view — where you need them, and read or drive the same state with injectMScheduler() in your own components. Here ng-template[mSchedulerEventDetails] on the provider replaces the body of the details (description, location and people) in every part."
            >
                <doc-preview [example]="examples.schedulerComposed" />
            </doc-section>

            <doc-section
                title="A single view"
                description="Any part works on its own with mSchedulerProvider on its host. This agenda lists seven days including the empty ones (showEmptyDays, their text comes from [texts]) and, with height='auto', grows with its content instead of scrolling inside — the page scrolls."
            >
                <doc-preview [example]="examples.schedulerAgenda" />
            </doc-section>

            <doc-section title="Data and outputs">
                <ul mList>
                    <li mListItem>
                        Events are plain data. Activating one emits <code mCode>(eventSelect)</code> and opens its
                        details (<code mCode>[(openEventId)]</code>); the actions from
                        <code mCode>eventMenuItems(event)</code> and <code mCode>event.menuItems</code> are reported by
                        <code mCode>(eventAction)</code>.
                    </li>
                    <li mListItem>
                        <code mCode>view</code>, <code mCode>date</code>, <code mCode>showWeekends</code>,
                        <code mCode>openEventId</code>, <code mCode>filterValues</code> and
                        <code mCode>toggleValues</code> are two-way bindable. <code mCode>(rangeChange)</code> reports
                        the drawn range once after the first render and on every change — the moment to load data.
                    </li>
                    <li mListItem>
                        <code mCode>ng-template[mSchedulerEvent]</code> replaces the content of event bars, chips and
                        agenda rows; <code mCode>[mSchedulerEventDetails]</code> /
                        <code mCode>[mSchedulerEventHeader]</code>
                        the body / title of the details. Declared in a part, a template applies to that part only.
                    </li>
                    <li mListItem>
                        <code mCode>height="auto"</code> sizes the scheduler to its content and lets the page scroll;
                        the day heads stick under <code mCode>--mineral-scheduler-sticky-top</code>.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The toolbar is a WAI-ARIA toolbar with one Tab stop: ← / → (Home / End) move between its
                        controls. Period changes are announced in a live region.
                    </li>
                    <li mListItem>
                        Events are buttons named by title, date, time and state (recurring, cancelled, conflict) with
                        <code mCode>aria-haspopup="dialog"</code> / <code mCode>aria-expanded</code>. Closing the
                        details returns focus to the event.
                    </li>
                    <li mListItem>
                        With <code mCode>draggable</code> an event is moved without a pointer: M enters the move mode
                        (<code mCode>aria-pressed</code>, <code mCode>aria-keyshortcuts</code>), arrows move it by
                        <code mCode>snapMinutes</code> or to the next day / resource, Shift+arrows by an hour, Enter
                        drops and Escape cancels; Shift+M changes the end (<code mCode>resizable</code>). The details
                        offer "Move" / "Resize" as the discoverable path. Every step and refusal is announced; the
                        target frame shows the title, the time and the key instructions — in a callout under the frame
                        when it is too short for them (in the month the frame grows instead).
                    </li>
                    <li mListItem>
                        The month is a table; day numbers are buttons that open the day, with
                        <code mCode>aria-current="date"</code> on today.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MScheduler" />
                <doc-props-table api="MSchedulerProvider" />
                <doc-props-table api="MSchedulerToolbar" />
                <doc-props-table api="MSchedulerFilterBar" />
                <doc-props-table api="MSchedulerBody" />
                <doc-props-table api="MSchedulerTimeGrid" />
                <doc-props-table api="MSchedulerTimeline" />
                <doc-props-table api="MSchedulerMonth" />
                <doc-props-table api="MSchedulerAgenda" />
                <doc-props-table api="MSchedulerEventDetail" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerPage {
    protected readonly examples = {
        schedulerBasic,
        schedulerMonth,
        schedulerResources,
        schedulerFilters,
        schedulerDetails,
        schedulerComposed,
        schedulerAgenda,
    }

    protected readonly sets = SETS
    protected readonly unavailable = UNAVAILABLE
    protected readonly events = signal<readonly MSchedulerEvent[]>(INITIAL)
    protected readonly log = signal('Move, resize or add a lesson.')

    protected readonly view = signal<MSchedulerView>('week')
    protected readonly height = signal<(typeof HEIGHTS)[number]>('fixed')
    protected readonly draggable = signal(true)
    protected readonly resizable = signal(true)
    protected readonly selectable = signal(true)
    protected readonly showWeekends = signal(true)
    protected readonly controls = [
        selectControl('view', this.view, VIEWS),
        selectControl('height', this.height, HEIGHTS),
        booleanControl('draggable', this.draggable),
        booleanControl('resizable', this.resizable),
        booleanControl('selectable', this.selectable),
        booleanControl('showWeekends', this.showWeekends),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[events]="events()"',
            '[resourceSets]="sets"',
            this.view() !== 'week' && `defaultView="${this.view()}"`,
            this.height() === 'auto' && 'height="auto"',
            !this.showWeekends() && '[showWeekends]="false"',
            this.draggable() && 'draggable',
            this.resizable() && 'resizable',
            this.selectable() && 'selectable',
            this.draggable() && '(eventDrop)="move($event)"',
            this.resizable() && '(eventResize)="resize($event)"',
            this.selectable() && '(rangeSelect)="add($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-scheduler\n    ${attrs.join('\n    ')}\n/>`
    })

    protected reset(): void {
        this.events.set(INITIAL)
        this.log.set('Events reset.')
    }

    // The scheduler only reports the intent: the page moves the event in its own signal.
    protected move({event, drop}: MSchedulerDropEvent): void {
        const setId = drop.resourceSetId
        const resourceId = drop.newResourceId
        this.update(event.id, (item) => ({
            ...item,
            startAt: drop.newStartAt,
            endAt: drop.newEndAt,
            resources: setId && resourceId ? {...item.resources, [setId]: resourceId} : item.resources,
        }))
        this.log.set(`${event.title} → ${drop.newStartAt.toLocaleString()} (${drop.source})`)
    }

    protected resize({event, change}: MSchedulerResizeEvent): void {
        this.update(event.id, (item) => ({...item, endAt: change.newEndAt}))
        this.log.set(`${event.title} now ends at ${change.newEndAt.toLocaleTimeString()}`)
    }

    protected add(slot: MSchedulerSlot): void {
        const resources = slot.resourceSetId && slot.resourceId ? {[slot.resourceSetId]: slot.resourceId} : undefined
        this.events.update((list) => [
            ...list,
            {id: `new-${list.length}`, title: 'New lesson', startAt: slot.startAt, endAt: slot.endAt, resources},
        ])
        this.log.set(`New lesson at ${slot.startAt.toLocaleString()}`)
    }

    private update(id: string, change: (event: MSchedulerEvent) => MSchedulerEvent): void {
        this.events.update((list) => list.map((item) => (item.id === id ? change(item) : item)))
    }
}
