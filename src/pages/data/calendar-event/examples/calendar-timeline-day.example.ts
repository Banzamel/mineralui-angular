import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import type {
    MCalendarAddEvent,
    MCalendarEvent,
    MCalendarEventActionEvent,
} from '@banzamel/mineralui-angular/data/calendar-event'
import {MCalendarTimeline} from '@banzamel/mineralui-angular/data/calendar-timeline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()

@Component({
    selector: 'app-calendar-timeline-day',
    imports: [MCalendarTimeline, MStack, MText],
    template: `
        <m-stack>
            <m-calendar-timeline
                overlapWarning
                addable
                [date]="today"
                [events]="events()"
                [startHour]="8"
                [endHour]="17"
                [eventActions]="['edit', 'delete']"
                (addEvent)="add($event)"
                (eventAction)="onAction($event)"
            />
            <p mText size="sm" tone="muted" role="status">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarTimelineDayExample {
    protected readonly today = today
    protected readonly status = signal('Pick an event or add one with the + buttons.')
    protected readonly events = signal<readonly MCalendarEvent[]>([
        {id: 'standup', title: 'Standup', date: today, startTime: '09:00', endTime: '09:30', status: 'done'},
        {id: 'review', title: 'Design review', date: today, startTime: '10:00', endTime: '11:30', type: 'Meeting'},
        {id: 'pairing', title: 'Pairing', date: today, startTime: '11:00', endTime: '12:00', status: 'active'},
        {id: 'lunch', title: 'Team lunch', date: today, startTime: '13:00', endTime: '14:00', color: '#8b5cf6'},
        {id: 'release', title: 'Release', date: today, startTime: '15:30', endTime: '16:30', status: 'cancelled'},
        {id: 'offsite', title: 'Offsite prep', date: today, type: 'Trip'},
    ])

    private nextId = 1

    protected add({date, hour = 9}: MCalendarAddEvent): void {
        const start = `${String(hour).padStart(2, '0')}:00`
        const end = `${String(hour).padStart(2, '0')}:45`
        const id = `new-${this.nextId++}`
        this.events.update((events) => [...events, {id, title: 'New event', date, startTime: start, endTime: end}])
        this.status.set(`Added "New event" at ${start}.`)
    }

    protected onAction({actionId, event}: MCalendarEventActionEvent): void {
        if (actionId === 'delete') {
            this.events.update((events) => events.filter((item) => item.id !== event.id))
            this.status.set(`Deleted "${event.title}".`)
            return
        }
        this.status.set(`Edit "${event.title}".`)
    }
}
