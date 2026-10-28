import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCalendarBoard} from '@banzamel/mineralui-angular/calendar/calendar-board'
import type {MCalendarAddEvent, MCalendarEvent} from '@banzamel/mineralui-angular/calendar/calendar-event'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()
const day = (date: number) => new Date(today.getFullYear(), today.getMonth(), date)
// The Friday on or after the 10th: a camp from Friday to Tuesday crosses two week rows.
const friday = 10 + ((5 - day(10).getDay() + 7) % 7)

@Component({
    selector: 'app-calendar-board-labels',
    imports: [MCalendarBoard, MStack, MText],
    template: `
        <m-stack>
            <m-calendar-board
                cellContent="labels"
                addable
                [showTimeline]="false"
                [events]="events()"
                (addEvent)="add($event)"
            />
            <p mText size="sm" tone="muted" role="status">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarBoardLabelsExample {
    protected readonly status = signal('A day with more than three events ends with "+N more" — open it.')
    protected readonly events = signal<readonly MCalendarEvent[]>([
        // endDate is the last day, inclusive: one event, drawn as a bar.
        {id: 'camp', title: 'Training camp', date: day(friday), endDate: day(friday + 4), color: '#a855f7'},
        {id: 'cup', title: 'Regional cup', date: day(3), endDate: day(4), status: 'active'},
        {id: 'match', title: 'Friendly match', date: day(friday + 1), startTime: '17:00', status: 'cancelled'},
        {id: 'gym', title: 'Gym', date: day(friday + 2), startTime: '08:00', endTime: '09:00', status: 'done'},
        {id: 'm1', title: 'Video analysis', date: day(22), startTime: '09:00', endTime: '10:00'},
        {id: 'm2', title: 'Training', date: day(22), startTime: '10:30', endTime: '12:00', status: 'active'},
        {id: 'm3', title: 'Physio', date: day(22), startTime: '13:00', endTime: '13:30'},
        {id: 'm4', title: 'Team meeting', date: day(22), startTime: '17:00', endTime: '18:00'},
        {id: 'm5', title: 'Media day', date: day(22), status: 'planned'},
    ])

    private nextId = 1

    protected add({date}: MCalendarAddEvent): void {
        this.events.update((events) => [...events, {id: `new-${this.nextId++}`, title: 'New event', date}])
        this.status.set(`Added "New event" on ${date.toDateString()}.`)
    }
}
