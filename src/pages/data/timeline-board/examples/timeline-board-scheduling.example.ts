import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTimelineBoard} from '@banzamel/mineralui-angular/data/timeline-board'
import type {
    MTimelineBoardDropChange,
    MTimelineBoardDropEvent,
    MTimelineBoardDropRejectEvent,
    MTimelineBoardDropValidator,
    MTimelineBoardEvent,
    MTimelineBoardRow,
    MTimelineBoardSlotSelectEvent,
    MTimelineBoardUnavailableSlot,
} from '@banzamel/mineralui-angular/data/timeline-board'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()
const at = (hour: number, minute = 0) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute)

const JOBS: readonly MTimelineBoardEvent[] = [
    {id: 'j1', rowId: 'cutter-a', title: 'Order 1042', startAt: at(8), endAt: at(10), color: '#0ea5e9'},
    {id: 'j2', rowId: 'cutter-a', title: 'Order 1043', startAt: at(11), endAt: at(12, 30), color: '#0ea5e9'},
    {id: 'j3', rowId: 'cutter-b', title: 'Order 1044', startAt: at(9), endAt: at(11), color: '#8b5cf6'},
    {
        id: 'j4',
        rowId: 'press',
        title: 'Rush order (locked)',
        startAt: at(8),
        endAt: at(9, 30),
        color: '#ef4444',
        draggable: false,
    },
    {id: 'j5', rowId: 'press', title: 'Order 1045', startAt: at(15), endAt: at(16), color: '#22c55e'},
]

@Component({
    selector: 'app-timeline-board-scheduling',
    imports: [MStack, MText, MTimelineBoard],
    template: `
        <m-stack>
            <m-timeline-board
                label="Machine schedule"
                workdayStart="07:00"
                workdayEnd="17:00"
                draggable
                emptySlotSelectable
                [height]="300"
                [fullHeight]="false"
                [showDayStrip]="false"
                [centerAt]="center"
                [rows]="machines"
                [events]="jobs()"
                [unavailableSlots]="maintenance"
                [dropValidator]="validate"
                (eventDrop)="save($event)"
                (eventDropReject)="rejected($event)"
                (emptySlotSelect)="add($event)"
            />
            <p mText size="sm" tone="muted">{{ log() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBoardSchedulingExample {
    protected readonly center = at(12)
    protected readonly machines: readonly MTimelineBoardRow[] = [
        {id: 'cutter-a', label: 'Cutter A', sublabel: 'Laser'},
        {id: 'cutter-b', label: 'Cutter B', sublabel: 'Laser'},
        {id: 'press', label: 'Press', sublabel: 'Hydraulic'},
    ]
    protected readonly maintenance: readonly MTimelineBoardUnavailableSlot[] = [
        {rowId: 'press', startAt: at(11), endAt: at(13), kind: 'maintenance', label: 'Maintenance'},
    ]
    protected readonly log = signal('Drag a job, or open it and choose Move. Drag on an empty lane to add a job.')

    // What the server has confirmed, and the drops still being saved: the board shows both at once.
    private readonly saved = signal<readonly MTimelineBoardEvent[]>(JOBS)
    private readonly pending = signal<ReadonlyMap<string, MTimelineBoardDropChange>>(new Map())
    protected readonly jobs = computed(() =>
        this.saved().map((job) => {
            const change = this.pending().get(job.id)
            return change ? moved(job, change) : job
        })
    )

    // Refuses maintenance and double booking — the reason is announced and reported by (eventDropReject).
    protected readonly validate: MTimelineBoardDropValidator = (job, change) => {
        const start = change.newStartAt.getTime()
        const end = change.newEndAt.getTime()
        const overlaps = (from: Date | string, to: Date | string) =>
            new Date(from).getTime() < end && new Date(to).getTime() > start
        const slot = this.maintenance.find(
            (item) => item.rowId === change.newRowId && overlaps(item.startAt, item.endAt)
        )
        if (slot) return `${slot.label} on this machine`
        const clash = this.jobs().find(
            (other) => other.id !== job.id && other.rowId === change.newRowId && overlaps(other.startAt, other.endAt)
        )
        return clash ? `Overlaps ${clash.title}` : true
    }

    protected save({event, change}: MTimelineBoardDropEvent): void {
        this.pending.update((pending) => new Map(pending).set(event.id, change))
        this.log.set(`Saving ${event.title}…`)
        // Stands in for an HTTP call; on an error the app would drop the pending change and the job jumps back.
        setTimeout(() => {
            this.saved.update((jobs) => jobs.map((job) => (job.id === event.id ? moved(job, change) : job)))
            this.pending.update((pending) => {
                const next = new Map(pending)
                next.delete(event.id)
                return next
            })
            this.log.set(`Saved ${event.title}.`)
        }, 600)
    }

    protected rejected({event, reason}: MTimelineBoardDropRejectEvent): void {
        this.log.set(`${event.title} stays: ${reason ?? 'not allowed'}.`)
    }

    protected add({rowId, startAt, endAt}: MTimelineBoardSlotSelectEvent): void {
        const id = `new-${this.saved().length + 1}`
        this.saved.update((jobs) => [...jobs, {id, rowId, title: 'New job', startAt, endAt, color: '#f59e0b'}])
        this.log.set(
            `Added a job ${startAt.toLocaleTimeString('en-US', {timeStyle: 'short'})} – ${endAt.toLocaleTimeString('en-US', {timeStyle: 'short'})}.`
        )
    }
}

function moved(job: MTimelineBoardEvent, change: MTimelineBoardDropChange): MTimelineBoardEvent {
    return {...job, rowId: change.newRowId, startAt: change.newStartAt, endAt: change.newEndAt}
}
