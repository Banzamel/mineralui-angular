import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MScheduler} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {
    MSchedulerDrop,
    MSchedulerDropEvent,
    MSchedulerEvent,
    MSchedulerResizeEvent,
    MSchedulerResourceSet,
    MSchedulerSlot,
    MSchedulerUnavailableSlot,
} from '@banzamel/mineralui-angular/calendar/scheduler'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// Today at the given time, so the demo always has something to show.
function at(hour: number, minute = 0): Date {
    const date = new Date()
    date.setHours(hour, minute, 0, 0)
    return date
}

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

const INITIAL: readonly MSchedulerEvent[] = [
    {
        id: 'e1',
        title: 'English A1',
        startAt: at(9),
        endAt: at(10, 30),
        color: 'var(--mineral-info)',
        resources: {staff: 'anna', room: 'r12'},
    },
    {
        id: 'e2',
        title: 'Physics lab',
        startAt: at(10),
        endAt: at(12),
        color: 'var(--mineral-success)',
        resources: {staff: 'ben', room: 'lab'},
    },
    {
        id: 'e3',
        title: 'Chemistry',
        startAt: at(13),
        endAt: at(14),
        color: 'var(--mineral-success)',
        resources: {staff: 'ben', room: 'lab'},
    },
    {
        id: 'e4',
        title: 'English B2',
        startAt: at(14),
        endAt: at(15, 30),
        color: 'var(--mineral-warning)',
        resources: {staff: 'cleo', room: 'r12'},
    },
    {
        id: 'sick',
        title: 'Sick leave',
        kind: 'block',
        startAt: at(12),
        endAt: at(14),
        resources: {staff: 'anna'},
    },
]

const UNAVAILABLE: readonly MSchedulerUnavailableSlot[] = [
    {startAt: at(12), endAt: at(12, 30), kind: 'busy', label: 'Lunch break'},
    {resourceSetId: 'room', resourceId: 'lab', startAt: at(15), endAt: at(18), kind: 'maintenance', label: 'Cleaning'},
    {startAt: at(18), endAt: at(20), kind: 'closed', label: 'School closed'},
]

@Component({
    selector: 'app-scheduler-resources',
    imports: [MScheduler, MText],
    template: `
        <m-scheduler
            defaultView="day"
            [height]="640"
            [views]="['day', 'timeline', 'week', 'month']"
            [events]="events()"
            [resourceSets]="sets"
            [unavailableSlots]="unavailable"
            [dayStartHour]="7"
            [dayEndHour]="20"
            [businessHours]="{start: '08:00', end: '17:00'}"
            draggable
            resizable
            selectable
            [dropValidator]="validate"
            (eventDrop)="move($event)"
            (eventResize)="resize($event)"
            (rangeSelect)="add($event)"
        />
        <p mText tone="muted">Last change: {{ log() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerResourcesExample {
    protected readonly sets = SETS
    protected readonly unavailable = UNAVAILABLE
    protected readonly events = signal<readonly MSchedulerEvent[]>(INITIAL)
    protected readonly log = signal('none')

    // A sync, pure check asked on every target: a string refuses with that reason.
    protected readonly validate = (event: MSchedulerEvent, drop: MSchedulerDrop): boolean | string =>
        event.title.startsWith('Physics') && drop.newResourceId !== undefined && drop.resourceSetId === 'room'
            ? 'Physics needs the lab'
            : true

    // The scheduler only reports the intent: the app moves the event (here optimistically, in its own signal).
    protected move({event, drop}: MSchedulerDropEvent): void {
        const setId = drop.resourceSetId
        const resourceId = drop.newResourceId
        this.update(event.id, (item) => ({
            ...item,
            startAt: drop.newStartAt,
            endAt: drop.newEndAt,
            resources: setId && resourceId ? {...item.resources, [setId]: resourceId} : item.resources,
        }))
        this.log.set(`${event.title} → ${drop.newStartAt.toLocaleTimeString()} (${drop.source})`)
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
        this.log.set(`New lesson at ${slot.startAt.toLocaleTimeString()}`)
    }

    private update(id: string, change: (event: MSchedulerEvent) => MSchedulerEvent): void {
        this.events.update((list) => list.map((item) => (item.id === id ? change(item) : item)))
    }
}
