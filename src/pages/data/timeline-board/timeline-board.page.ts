import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTimelineBoard} from '@banzamel/mineralui-angular/data/timeline-board'
import type {
    MTimelineBoardEvent,
    MTimelineBoardEventActionEvent,
    MTimelineBoardMenuFn,
    MTimelineBoardRow,
    MTimelineBoardUnavailableSlot,
} from '@banzamel/mineralui-angular/data/timeline-board'
import {mEditIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import timelineBoardDetails from '@generated/examples/data/timeline-board/timeline-board-details'
import timelineBoardRange from '@generated/examples/data/timeline-board/timeline-board-range'
import timelineBoardRooms from '@generated/examples/data/timeline-board/timeline-board-rooms'
import timelineBoardScheduling from '@generated/examples/data/timeline-board/timeline-board-scheduling'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const today = new Date()
const at = (dayOffset: number, hour: number, minute = 0) =>
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset, hour, minute)

const ROWS: readonly MTimelineBoardRow[] = [
    {id: 'anna', label: 'Anna Kowalska', sublabel: 'Design'},
    {id: 'jan', label: 'Jan Nowak', sublabel: 'Frontend'},
    {id: 'ola', label: 'Ola Wiśniewska', sublabel: 'Backend', workdaySpec: {start: '10:00', end: '18:00'}},
    {id: 'piotr', label: 'Piotr Zieliński', sublabel: 'QA'},
]

const EVENTS: readonly MTimelineBoardEvent[] = [
    {
        id: 'e1',
        rowId: 'anna',
        title: 'Design review',
        startAt: at(0, 9),
        endAt: at(0, 10, 30),
        color: '#0ea5e9',
        description: 'Walk through the new calendar screens.',
        leader: {name: 'Anna Kowalska', role: 'Lead designer'},
        participants: [{name: 'Jan Nowak'}, {name: 'Ola Wiśniewska'}, {name: 'Piotr Zieliński'}],
    },
    {id: 'e2', rowId: 'anna', title: 'User interviews', startAt: at(0, 10), endAt: at(0, 12), color: '#8b5cf6'},
    {id: 'e3', rowId: 'jan', title: 'Pairing', startAt: at(0, 8), endAt: at(0, 11), color: '#22c55e'},
    {id: 'e4', rowId: 'jan', title: 'Release', startAt: at(0, 15), endAt: at(0, 16), color: '#f59e0b'},
    {id: 'e5', rowId: 'ola', title: 'API sync', startAt: at(0, 11), endAt: at(0, 12), color: '#22c55e'},
    {id: 'e6', rowId: 'piotr', title: 'Regression run', startAt: at(0, 13), endAt: at(0, 17), color: '#ef4444'},
    {id: 'e7', rowId: 'piotr', title: 'Night checks', startAt: at(1, 7), endAt: at(1, 9), color: '#ef4444'},
    {id: 'e8', rowId: 'jan', title: 'Hotfix', startAt: at(3, 9), endAt: at(3, 11), color: '#f59e0b'},
    {id: 'e9', rowId: 'jan', title: 'Demo prep', startAt: at(3, 10), endAt: at(3, 12), color: '#0ea5e9'},
]

const SLOTS: readonly MTimelineBoardUnavailableSlot[] = [
    {rowId: 'ola', startAt: at(0, 13), endAt: at(0, 15), kind: 'vacation', label: 'Doctor'},
    {rowId: 'anna', startAt: at(0, 14), endAt: at(0, 16), kind: 'busy', label: 'Workshop'},
]

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
                description="Drag the canvas, use the wheel sideways (or Shift + wheel), the day strip or the keys to move in time; open an event for its details. Today has overlapping events in Anna's row; another conflict waits three days ahead."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack>
                        <m-timeline-board
                            label="Team plan"
                            workdayStart="08:00"
                            workdayEnd="16:00"
                            [height]="420"
                            [fullHeight]="false"
                            [rows]="rows"
                            [events]="events"
                            [unavailableSlots]="slots"
                            [pixelsPerHour]="pixelsPerHour()"
                            [showDayStrip]="showDayStrip()"
                            [showNowLine]="showNowLine()"
                            [overlapHighlight]="overlapHighlight()"
                            [autoRowHeight]="autoRowHeight()"
                            [loading]="loading()"
                            [eventMenuItems]="menu"
                            (eventOpen)="log.set('Opened ' + $event.title)"
                            (eventAction)="onAction($event)"
                        />
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
    protected readonly showDayStrip = signal(true)
    protected readonly showNowLine = signal(true)
    protected readonly overlapHighlight = signal(true)
    protected readonly autoRowHeight = signal(false)
    protected readonly loading = signal(false)
    protected readonly controls = [
        sliderControl('pixelsPerHour', this.pixelsPerHour, {min: 48, max: 192, step: 8}),
        booleanControl('showDayStrip', this.showDayStrip),
        booleanControl('showNowLine', this.showNowLine),
        booleanControl('overlapHighlight', this.overlapHighlight),
        booleanControl('autoRowHeight', this.autoRowHeight),
        booleanControl('loading', this.loading),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Team plan"',
            'workdayStart="08:00"',
            'workdayEnd="16:00"',
            '[rows]="rows"',
            '[events]="events()"',
            '[unavailableSlots]="slots"',
            this.pixelsPerHour() !== 96 && `[pixelsPerHour]="${this.pixelsPerHour()}"`,
            !this.showDayStrip() && '[showDayStrip]="false"',
            !this.showNowLine() && '[showNowLine]="false"',
            !this.overlapHighlight() && '[overlapHighlight]="false"',
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
