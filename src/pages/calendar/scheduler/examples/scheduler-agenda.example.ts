import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MSchedulerAgenda, MSchedulerProvider} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {MSchedulerEvent} from '@banzamel/mineralui-angular/calendar/scheduler'

function at(dayOffset: number, hour: number, minute = 0): Date {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    date.setHours(hour, minute, 0, 0)
    return date
}

const EVENTS: readonly MSchedulerEvent[] = [
    {id: 'a1', title: 'Yoga', startAt: at(0, 7), endAt: at(0, 8), color: 'var(--mineral-success)', recurring: true},
    {id: 'a2', title: 'Dentist', startAt: at(0, 15, 30), endAt: at(0, 16), color: 'var(--mineral-warning)'},
    {id: 'a3', title: 'Conference', allDay: true, startAt: at(2, 0), endAt: at(4, 0), color: 'var(--mineral-info)'},
    {id: 'a4', title: 'Dinner with Sam', startAt: at(5, 19), endAt: at(5, 21), color: 'var(--mineral-news)'},
]

// A single part is a scheduler of its own: mSchedulerProvider on its host holds the state.
@Component({
    selector: 'app-scheduler-agenda',
    imports: [MSchedulerAgenda, MSchedulerProvider],
    template: `
        <m-scheduler-agenda
            mSchedulerProvider
            [events]="events"
            [agendaDays]="7"
            showEmptyDays
            height="auto"
            [texts]="{emptyState: 'Nothing planned'}"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerAgendaExample {
    protected readonly events = EVENTS
}
