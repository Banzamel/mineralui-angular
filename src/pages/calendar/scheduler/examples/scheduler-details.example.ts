import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MScheduler, MSchedulerEventDef, MSchedulerEventHeaderDef} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {
    MSchedulerDetailsMode,
    MSchedulerEvent,
    MSchedulerPersonClickEvent,
} from '@banzamel/mineralui-angular/calendar/scheduler'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MText} from '@banzamel/mineralui-angular/typography/text'

function at(dayOffset: number, hour: number, minute = 0): Date {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    date.setHours(hour, minute, 0, 0)
    return date
}

const STUDENTS = [
    'Ola',
    'Piotr',
    'Kasia',
    'Tom',
    'Eva',
    'Jan',
    'Zoe',
    'Max',
    'Ida',
    'Leo',
    'Mia',
    'Adam',
    'Nina',
    'Olaf',
]

const EVENTS: readonly MSchedulerEvent[] = [
    {
        id: 'd1',
        title: 'English — group B2',
        startAt: at(0, 9),
        endAt: at(0, 10, 30),
        color: 'var(--mineral-info)',
        location: 'Room 4',
        leader: {id: 'anna', name: 'Anna Nowak', role: 'Teacher'},
        participants: STUDENTS.map((name) => ({id: name.toLowerCase(), name})),
        capacity: 16,
        description: 'Homework: Unit 7, exercises 1–4.',
        meta: {level: 'B2'},
    },
    {
        id: 'd2',
        title: 'Piano lesson',
        startAt: at(0, 12),
        endAt: at(0, 13),
        color: 'var(--mineral-news)',
        location: 'Music room',
        leader: {id: 'ben', name: 'Ben Carter', role: 'Tutor'},
        participants: [{id: 'zoe', name: 'Zoe'}],
        description: 'Practise the Minuet in G.',
        meta: {level: 'Grade 3'},
    },
    {
        id: 'd3',
        title: 'Staff meeting',
        startAt: at(1, 14),
        endAt: at(1, 15),
        color: 'var(--mineral-warning)',
        description: 'Plan the end-of-term exams.',
        conflict: 'Overlaps with the parents evening.',
    },
]

@Component({
    selector: 'app-scheduler-details',
    imports: [MBadge, MButton, MButtonGroup, MScheduler, MSchedulerEventDef, MSchedulerEventHeaderDef, MText],
    template: `
        <m-button-group size="sm" variant="outlined" aria-label="Details mode">
            @for (mode of modes; track mode) {
                <button mButton [attr.aria-pressed]="detailsMode() === mode" (click)="detailsMode.set(mode)">
                    {{ mode }}
                </button>
            }
        </m-button-group>
        <m-scheduler
            [height]="560"
            [events]="events"
            [views]="['week', 'day', 'agenda']"
            [dayStartHour]="8"
            [dayEndHour]="17"
            [detailsMode]="detailsMode()"
            [(openEventId)]="openEventId"
            peopleClickable
            (personClick)="showPerson($event)"
        >
            <ng-template mSchedulerEvent let-event let-context="context">
                <strong>{{ event.title }}</strong>
                @if (!context.compact && event.location) {
                    <small>{{ event.location }}</small>
                }
            </ng-template>
            <ng-template mSchedulerEventHeader let-event>
                <strong>{{ event.title }}</strong>
                @if (event.meta?.['level']; as level) {
                    <m-badge size="sm" color="info">{{ level }}</m-badge>
                }
            </ng-template>
        </m-scheduler>
        <p mText tone="muted">Open: {{ openEventId() ?? 'none' }} · Last person: {{ person() }}</p>
    `,
    styles: `
        m-button-group {
            margin-bottom: 12px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerDetailsExample {
    protected readonly events = EVENTS
    protected readonly modes: readonly MSchedulerDetailsMode[] = ['auto', 'popover', 'sheet', 'none']
    protected readonly detailsMode = signal<MSchedulerDetailsMode>('auto')
    protected readonly openEventId = signal<string | null>(null)
    protected readonly person = signal('none')

    protected showPerson({person, role, event}: MSchedulerPersonClickEvent): void {
        this.person.set(`${person.name} (${role} of ${event.title})`)
    }
}
