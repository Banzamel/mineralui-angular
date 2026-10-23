import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTimelineBoard} from '@banzamel/mineralui-angular/calendar/timeline-board'
import type {
    MTimelineBoardEvent,
    MTimelineBoardEventActionEvent,
    MTimelineBoardMenuFn,
    MTimelineBoardRow,
    MTimelineBoardUnavailableSlot,
} from '@banzamel/mineralui-angular/calendar/timeline-board'
import {mEditIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import timelineBoardDetails from '@generated/examples/calendar/timeline-board/timeline-board-details'
import timelineBoardRange from '@generated/examples/calendar/timeline-board/timeline-board-range'
import timelineBoardRooms from '@generated/examples/calendar/timeline-board/timeline-board-rooms'
import timelineBoardScheduling from '@generated/examples/calendar/timeline-board/timeline-board-scheduling'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {CALENDAR_AVATARS} from '../calendar-samples'

const today = new Date()
const at = (dayOffset: number, time: string) => {
    const [hour = 0, minute = 0] = time.split(':').map(Number)
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset, hour, minute)
}

const ROWS: readonly MTimelineBoardRow[] = [
    {id: 'anna', label: 'Anna Kowalska', sublabel: 'Design', avatar: CALENDAR_AVATARS.annaKowalska, color: '#0ea5e9'},
    {id: 'jan', label: 'Jan Nowak', sublabel: 'Frontend', avatar: CALENDAR_AVATARS.janNowak, color: '#22c55e'},
    {
        id: 'kasia',
        label: 'Katarzyna Lewandowska',
        sublabel: 'Backend · 10:00–18:00',
        avatar: CALENDAR_AVATARS.katarzynaLewandowska,
        color: '#f59e0b',
        workdaySpec: {start: '10:00', end: '18:00'},
    },
    {id: 'piotr', label: 'Piotr Wójcik', sublabel: 'QA', avatar: CALENDAR_AVATARS.piotrWojcik, color: '#a855f7'},
    {id: 'ewa', label: 'Ewa Mazur', sublabel: 'Product', avatar: CALENDAR_AVATARS.ewaMazur, color: '#ef4444'},
]

type Slot = readonly [start: string, end: string, title: string]

// Ordinary work of each row, without overlaps. The first slot runs every day, one of the others rests in turn — so
// the days differ while the double bookings below always land on the first slot.
const PLANS: Readonly<Record<string, readonly Slot[]>> = {
    anna: [
        ['10:00', '11:30', 'Wireframes'],
        ['08:30', '09:30', 'Design QA'],
        ['13:00', '14:00', 'Icon set'],
        ['14:30', '16:00', 'Prototype'],
    ],
    jan: [
        ['09:00', '11:00', 'Pairing'],
        ['11:30', '12:30', 'Code review'],
        ['13:30', '15:00', 'Calendar feature'],
        ['15:30', '16:30', 'Release prep'],
    ],
    kasia: [
        ['10:30', '12:00', 'API work'],
        ['12:15', '12:45', 'Backend sync'],
        ['15:00', '16:30', 'Database migration'],
        ['16:45', '17:45', 'On-call handover'],
    ],
    piotr: [
        ['09:00', '10:00', 'Smoke tests'],
        ['10:30', '12:00', 'Test plan'],
        ['13:00', '15:00', 'Regression run'],
        ['15:30', '16:30', 'Bug triage'],
    ],
    ewa: [
        ['09:30', '10:30', 'Roadmap'],
        ['11:00', '12:00', 'Customer call'],
        ['13:30', '14:30', 'Backlog grooming'],
        ['15:00', '16:00', 'Metrics review'],
    ],
}

// Double bookings on a few days: the day strip counts them and the edge markers jump to them.
const CONFLICTS: readonly (readonly [rowId: string, dayOffset: number, ...slot: Slot])[] = [
    ['kasia', -2, '11:00', '12:00', 'Incident review'],
    ['anna', 0, '10:30', '12:00', 'User interviews'],
    ['piotr', 1, '09:30', '10:30', 'Hotfix verification'],
    ['jan', 3, '10:00', '12:00', 'Demo prep'],
    ['ewa', 5, '10:00', '11:00', 'Board meeting'],
]

const DAYS = 7
const person = (row: MTimelineBoardRow) => ({name: row.label, role: row.sublabel, avatar: row.avatar})
const teammates = (rowIndex: number, count: number) =>
    Array.from({length: count}, (_, step) => ROWS[(rowIndex + step + 1) % ROWS.length]).flatMap((row) =>
        row ? [person(row)] : []
    )

const EVENTS: readonly MTimelineBoardEvent[] = [
    ...ROWS.flatMap((row, rowIndex) =>
        Array.from({length: DAYS * 2 + 1}, (_, index) => index - DAYS).flatMap((dayOffset) => {
            const resting = 1 + ((((dayOffset + rowIndex) % 3) + 3) % 3)
            return (PLANS[row.id] ?? []).flatMap(([start, end, title], slot) =>
                slot === resting
                    ? []
                    : [
                          {
                              id: `${row.id}-${dayOffset}-${slot}`,
                              rowId: row.id,
                              title,
                              startAt: at(dayOffset, start),
                              endAt: at(dayOffset, end),
                              color: row.color,
                              leader: person(row),
                              participants: teammates(rowIndex, 1 + ((slot + rowIndex) % 3)),
                          },
                      ]
            )
        })
    ),
    ...CONFLICTS.map(([rowId, dayOffset, start, end, title]) => ({
        id: `conflict-${rowId}-${dayOffset}`,
        rowId,
        title,
        startAt: at(dayOffset, start),
        endAt: at(dayOffset, end),
        color: '#64748b',
        description: 'Booked on top of the regular work — needs a new time.',
    })),
]

const SLOTS: readonly MTimelineBoardUnavailableSlot[] = [
    {rowId: 'kasia', startAt: at(0, '13:00'), endAt: at(0, '15:00'), kind: 'vacation', label: 'Doctor'},
    {rowId: 'anna', startAt: at(0, '16:30'), endAt: at(0, '18:00'), kind: 'busy', label: 'Workshop'},
    {rowId: 'ewa', startAt: at(2, '08:00'), endAt: at(2, '18:00'), kind: 'vacation', label: 'Day off'},
]

const WORKDAYS = ['none', '08:00–16:00', '09:00–18:00', '06:00–22:00'] as const
type Workday = (typeof WORKDAYS)[number]

@Component({
    selector: 'doc-timeline-board-page',
    imports: [
        DocArticle,
        DocProNotice,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MStack,
        MText,
        MTimelineBoard,
    ],
    template: `
        <doc-article
            title="MTimelineBoard"
            description="Resource timeline: rows of people, rooms or machines against an endless horizontal time axis with working hours, unavailable slots, conflict highlights and a 'now' line."
        >
            <doc-pro-notice
                [components]="['MTimelineBoard']"
                reason="Multi-resource scheduling timelines are part of MineralUI Pro alongside MCalendarBoard."
            />

            <doc-section
                title="Playground"
                description="Drag the canvas, use the wheel sideways (or Shift + wheel), the day strip or the keys to move in time; open an event for its details. Every row has regular work a week back and ahead, and a few days carry a double booking — the day strip counts them, and a marker at the edge of the canvas counts the days to the nearest conflict out of view on each side; clicking it moves the axis there. Katarzyna works 10:00–18:00 (workdaySpec), whatever workday says."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack>
                        <!-- fullHeight fills its parent: this frame stands for the app's layout. -->
                        <div [style.height.px]="fullHeight() ? 560 : null">
                            <m-timeline-board
                                label="Team plan"
                                [workdayStart]="workday()?.start"
                                [workdayEnd]="workday()?.end"
                                [height]="fullHeight() ? undefined : 420"
                                [fullHeight]="fullHeight()"
                                [rows]="rows"
                                [events]="events"
                                [unavailableSlots]="slots"
                                [pixelsPerHour]="pixelsPerHour()"
                                [rowHeight]="rowHeight()"
                                [rowLabelWidth]="rowLabelWidth()"
                                [dayStripDays]="dayStripDays()"
                                [panKeyStepMinutes]="panKeyStepMinutes()"
                                [showDayStrip]="showDayStrip()"
                                [showNowLine]="showNowLine()"
                                [overlapHighlight]="overlapHighlight()"
                                [autoRowHeight]="autoRowHeight()"
                                [loading]="loading()"
                                [eventMenuItems]="menu"
                                (eventOpen)="log.set('Opened ' + $event.title)"
                                (eventAction)="onAction($event)"
                            />
                        </div>
                        <p mText size="sm" tone="muted" role="status">{{ log() }}</p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Rooms and equipment"
                description="Rows can be any resource. Row icons, per-row working hours (workdaySpec — the library opens at 10:00), unavailable slots by kind, people in the details (peopleClickable reports (personClick)) and the event menu. The buttons move the axis through the component's methods — scrollToTime(time, {align}) and scrollToNow() on a viewChild."
            >
                <doc-preview [example]="examples.rooms" />
            </doc-section>

            <doc-section
                title="Loading the shown range"
                description="(rangeChange) reports the shown range after the axis stops moving (rangeChangeDebounceMs), with a buffer on both sides (rangeBufferRatio). Load events for it and set loading meanwhile — events is plain input data, the board keeps showing the old ones."
            >
                <doc-preview [example]="examples.range" />
            </doc-section>

            <doc-section
                title="Moving events and selecting slots"
                description="With draggable a job is dragged to another time (snapped to dragSnapMinutes) and row, or moved from the keyboard with Move in its details. dropValidator refuses maintenance and double booking with a reason. The board only reports (eventDrop): the example shows the move at once through a computed over the saved jobs and the pending changes, then 'saves' it. event.draggable: false (or canDrag) locks a job. With emptySlotSelectable a drag on an empty lane selects a stretch — a single press selects one step — and (emptySlotSelect) adds a job."
            >
                <doc-preview [example]="examples.scheduling" />
            </doc-section>

            <doc-section
                title="Own event details"
                description="ng-template mTimelineEventHeader replaces the title and the row label in the details; ng-template mTimelineEventDetails adds content at the end."
            >
                <doc-preview [example]="examples.details" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The canvas is a region named by label: ← / → pan by panKeyStepMinutes, Shift + ← / → and PageUp / PageDown by a day, Home back to now — each move is announced. Rows are groups named by their label; their events are lists of buttons with one Tab stop: ← / → (Home / End) move within the row, ↑ / ↓ to the nearest event of the next row with events, and the axis follows the focus. An event is named by its title, row, date and time, a conflict and the unavailable slots it overlaps; Enter opens its details as a dialog, Escape returns to the event. Moving does not need dragging: Move in the details puts the event in move mode on the region — ← / → by dragSnapMinutes, ↑ / ↓ row, Enter drops (through dropValidator; a refusal keeps the mode and announces the reason), Escape or Tab cancels, and every step is announced with the row, date, time and a refusal reason. Selecting an empty slot has no keyboard version — offer your own 'New' button next to the board. The day strip is a toolbar (← / → between days, the shown day aria-current='date'), the axis, bands and the 'now' line are hidden decoration."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Callbacks become outputs: onEventClick / onEventOpen → (eventClick) / (eventOpen), onLeaderClick / onParticipantClick → (personClick) {person, event, role} with peopleClickable, menu items' onSelect → (eventAction) {actionId, event}, onCenterChange → [(centerAt)], ref.current.scrollToNow() → viewChild(MTimelineBoard).scrollToNow(), getVisibleRange() → visibleRange(). popoverHeader / renderEventDetails → ng-template mTimelineEventHeader / mTimelineEventDetails; icon and description are an MIconDef and a string. label is required (React: region named 'Timeline'). The day strip is a toolbar (React: a tablist without panels), events have one Tab stop with arrow keys (React: every bar a Tab stop, no keys), day counts use local dates (React: UTC — the wrong day west of Greenwich). The row labels and the canvas share one scroll container, so autoRowHeight needs no measuring. onEventDrop(id, change) → (eventDrop) {event, change}; onEventDropValidate → dropValidator, whose reason is announced and reported by (eventDropReject) (React drops it silently); eventOverrides → a computed in the app; onEmptySlotSelect(rowId, start, end) → (emptySlotSelect) {rowId, startAt, endAt}. The drag preview is a ghost at the snapped target place (React: the bar follows the pointer unsnapped). A single press on the empty lane selects one step (React: only a drag), and the selection covers the dragged stretch (floor / ceil to the step; React rounds both ends). A drop onto the same place reports nothing. Moving from the keyboard is new."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MTimelineBoard" />
                    <doc-props-table api="MTimelineBoardRow" />
                    <doc-props-table api="MTimelineBoardEvent" />
                    <doc-props-table api="MTimelineBoardPerson" />
                    <doc-props-table api="MTimelineBoardUnavailableSlot" />
                    <doc-props-table api="MTimelineBoardMenuItem" />
                    <doc-props-table api="MTimelineBoardRange" />
                    <doc-props-table api="MTimelineBoardDropChange" />
                    <doc-props-table api="MTimelineBoardDropEvent" />
                    <doc-props-table api="MTimelineBoardDropRejectEvent" />
                    <doc-props-table api="MTimelineBoardSlotSelectEvent" />
                    <doc-props-table api="MTimelineEventHeaderDef" />
                    <doc-props-table api="MTimelineEventDetailsDef" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBoardPage {
    protected readonly examples = {
        rooms: timelineBoardRooms,
        range: timelineBoardRange,
        details: timelineBoardDetails,
        scheduling: timelineBoardScheduling,
    }
    protected readonly rows = ROWS
    protected readonly events = EVENTS
    protected readonly slots = SLOTS
    protected readonly log = signal('Open an event.')
    protected readonly menu: MTimelineBoardMenuFn = () => [
        {id: 'edit', label: 'Edit', icon: mEditIcon},
        {id: 'delete', label: 'Delete', icon: mTrashIcon, color: 'error'},
    ]

    protected readonly pixelsPerHour = signal(96)
    protected readonly rowHeight = signal(56)
    protected readonly rowLabelWidth = signal(168)
    protected readonly dayStripDays = signal(14)
    protected readonly panKeyStepMinutes = signal(30)
    protected readonly workdayOption = signal<Workday>('09:00–18:00')
    protected readonly showDayStrip = signal(true)
    protected readonly showNowLine = signal(true)
    protected readonly overlapHighlight = signal(true)
    protected readonly fullHeight = signal(false)
    protected readonly autoRowHeight = signal(false)
    protected readonly loading = signal(false)
    protected readonly controls = [
        sliderControl('pixelsPerHour', this.pixelsPerHour, {min: 48, max: 220, step: 4}),
        sliderControl('rowHeight', this.rowHeight, {min: 40, max: 96, step: 4}),
        sliderControl('rowLabelWidth', this.rowLabelWidth, {min: 96, max: 280, step: 8}),
        sliderControl('dayStripDays', this.dayStripDays, {min: 3, max: 30}),
        sliderControl('panKeyStepMinutes', this.panKeyStepMinutes, {min: 5, max: 120, step: 5}),
        selectControl('workday', this.workdayOption, WORKDAYS),
        booleanControl('showDayStrip', this.showDayStrip),
        booleanControl('showNowLine', this.showNowLine),
        booleanControl('overlapHighlight', this.overlapHighlight),
        booleanControl('fullHeight', this.fullHeight),
        booleanControl('autoRowHeight', this.autoRowHeight),
        booleanControl('loading', this.loading),
    ]
    protected readonly workday = computed(() => {
        const [start, end] = this.workdayOption().split('–')
        return start && end ? {start, end} : undefined
    })

    protected readonly code = computed(() => {
        const workday = this.workday()
        const attrs = [
            'label="Team plan"',
            workday && `workdayStart="${workday.start}"`,
            workday && `workdayEnd="${workday.end}"`,
            '[rows]="rows"',
            '[events]="events()"',
            '[unavailableSlots]="slots"',
            this.pixelsPerHour() !== 96 && `[pixelsPerHour]="${this.pixelsPerHour()}"`,
            this.rowHeight() !== 56 && `[rowHeight]="${this.rowHeight()}"`,
            this.rowLabelWidth() !== 168 && `[rowLabelWidth]="${this.rowLabelWidth()}"`,
            this.dayStripDays() !== 14 && `[dayStripDays]="${this.dayStripDays()}"`,
            this.panKeyStepMinutes() !== 30 && `[panKeyStepMinutes]="${this.panKeyStepMinutes()}"`,
            !this.showDayStrip() && '[showDayStrip]="false"',
            !this.showNowLine() && '[showNowLine]="false"',
            !this.overlapHighlight() && '[overlapHighlight]="false"',
            this.fullHeight() ? null : '[height]="420"',
            this.fullHeight() ? null : '[fullHeight]="false"',
            this.autoRowHeight() && 'autoRowHeight',
            this.loading() && '[loading]="true"',
            '[eventMenuItems]="menu"',
            '(eventAction)="onAction($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-timeline-board\n    ${attrs.join('\n    ')}\n/>`
    })

    protected onAction({actionId, event}: MTimelineBoardEventActionEvent): void {
        this.log.set(`${actionId}: ${event.title}`)
    }
}
