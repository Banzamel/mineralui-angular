import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MScheduler} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {
    MSchedulerActionItem,
    MSchedulerEvent,
    MSchedulerEventMenuItem,
    MSchedulerFilter,
    MSchedulerFilterValues,
    MSchedulerLegendItem,
} from '@banzamel/mineralui-angular/calendar/scheduler'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// Events around today, so the demo always has something to show.
function at(dayOffset: number, hour: number, minute = 0): Date {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    date.setHours(hour, minute, 0, 0)
    return date
}

const TEACHERS = [
    {value: 'anna', label: 'Anna Nowak', color: 'var(--mineral-info)'},
    {value: 'ben', label: 'Ben Carter', color: 'var(--mineral-success)'},
    {value: 'cleo', label: 'Cleo Park', color: 'var(--mineral-warning)'},
]

const EVENTS: readonly (MSchedulerEvent & {meta: {teacher: string}})[] = [
    {
        id: 'e1',
        title: 'Math — group A',
        startAt: at(0, 9),
        endAt: at(0, 10, 30),
        color: 'var(--mineral-info)',
        recurring: true,
        location: 'Room 12',
        leader: {name: 'Anna Nowak', role: 'Teacher'},
        participants: [{name: 'Ola'}, {name: 'Piotr'}, {name: 'Kasia'}],
        capacity: 12,
        badges: ['Level B1'],
        meta: {teacher: 'anna'},
    },
    {
        id: 'e2',
        title: 'Physics lab',
        startAt: at(0, 10),
        endAt: at(0, 12),
        color: 'var(--mineral-success)',
        conflict: 'Room 12 is booked twice.',
        location: 'Room 12',
        leader: {name: 'Ben Carter', role: 'Teacher'},
        meta: {teacher: 'ben'},
    },
    {
        id: 'e3',
        title: 'Staff meeting',
        startAt: at(1, 14),
        endAt: at(1, 15),
        color: 'var(--mineral-warning)',
        leader: {name: 'Cleo Park'},
        meta: {teacher: 'cleo'},
    },
    {
        id: 'e4',
        title: 'Chemistry',
        startAt: at(-1, 8, 30),
        endAt: at(-1, 9, 45),
        color: 'var(--mineral-success)',
        cancelled: true,
        meta: {teacher: 'ben'},
    },
    {
        id: 'e5',
        title: 'School trip',
        allDay: true,
        startAt: at(2, 0),
        endAt: at(3, 0),
        color: 'var(--mineral-news)',
        description: 'Museum of Natural History. Bring a packed lunch.',
        meta: {teacher: 'anna'},
    },
    {
        id: 'e6',
        title: 'English — group C',
        startAt: at(3, 16),
        endAt: at(3, 17, 30),
        color: 'var(--mineral-info)',
        meta: {teacher: 'anna'},
    },
]

@Component({
    selector: 'app-scheduler-basic',
    imports: [MScheduler, MText],
    template: `
        <m-scheduler
            [height]="640"
            [events]="shown()"
            [filters]="filters"
            [(filterValues)]="filterValues"
            [legend]="legend"
            [addMenu]="addMenu"
            [eventMenuItems]="menu"
            [businessHours]="{start: '08:00', end: '17:00'}"
            emptyState="No lessons in this period"
            (eventAction)="log.set($event.itemId + ': ' + $event.event.title)"
            (add)="log.set('Add: ' + $event)"
            (slotClick)="log.set('Slot: ' + $event.startAt.toLocaleString())"
        />
        <p mText tone="muted">Last action: {{ log() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerBasicExample {
    protected readonly filters: readonly MSchedulerFilter[] = [{id: 'teacher', label: 'Teacher', options: TEACHERS}]
    protected readonly filterValues = signal<MSchedulerFilterValues>({})
    protected readonly legend: readonly MSchedulerLegendItem[] = TEACHERS.map((teacher) => ({
        label: teacher.label,
        color: teacher.color,
    }))
    protected readonly addMenu: readonly MSchedulerActionItem[] = [
        {id: 'lesson', label: 'Lesson', description: 'A single lesson for a group'},
        {id: 'meeting', label: 'Meeting', description: 'Staff or parents'},
    ]
    protected readonly log = signal('none')

    // The scheduler never filters: the app does, from the filter values.
    protected readonly shown = computed(() => {
        const teacher = this.filterValues()['teacher']
        return teacher ? EVENTS.filter((event) => event.meta.teacher === teacher) : EVENTS
    })

    protected readonly menu = (event: MSchedulerEvent): readonly MSchedulerEventMenuItem[] => [
        {id: 'edit', label: 'Edit'},
        {id: 'cancel', label: event.cancelled ? 'Restore' : 'Cancel', color: 'error'},
    ]
}
