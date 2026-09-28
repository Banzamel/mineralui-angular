import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MScheduler} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {MSchedulerDropEvent, MSchedulerEvent} from '@banzamel/mineralui-angular/calendar/scheduler'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// Events around today, so the demo always has something to show.
function at(dayOffset: number, hour: number, minute = 0): Date {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    date.setHours(hour, minute, 0, 0)
    return date
}

const COLORS = ['var(--mineral-info)', 'var(--mineral-success)', 'var(--mineral-warning)', 'var(--mineral-news)']

// A busy today (more than monthMaxEvents) and a few lessons across the month.
const INITIAL: readonly MSchedulerEvent[] = [
    ...['Math', 'Physics', 'English', 'History', 'Biology', 'Art'].map((title, index) => ({
        id: `today-${index}`,
        title,
        startAt: at(0, 8 + index),
        endAt: at(0, 9 + index),
        color: COLORS[index % COLORS.length],
    })),
    {id: 'm1', title: 'Parents evening', startAt: at(2, 17), endAt: at(2, 19), color: 'var(--mineral-warning)'},
    {id: 'm2', title: 'Chess club', startAt: at(-3, 15), endAt: at(-3, 16), color: 'var(--mineral-info)'},
    {id: 'm3', title: 'Sports day', allDay: true, startAt: at(6, 0), endAt: at(7, 0), color: 'var(--mineral-success)'},
    {id: 'm4', title: 'Exam', startAt: at(9, 9), endAt: at(9, 11), color: 'var(--mineral-error)'},
    {id: 'm5', title: 'Holiday', kind: 'block', allDay: true, startAt: at(4, 0), endAt: at(5, 0)},
]

@Component({
    selector: 'app-scheduler-month',
    imports: [MScheduler, MText],
    template: `
        <m-scheduler
            defaultView="month"
            height="auto"
            [events]="events()"
            [monthMaxEvents]="3"
            monthDensityBar
            draggable
            (eventDrop)="move($event)"
        />
        <p mText tone="muted">Last change: {{ log() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerMonthExample {
    protected readonly events = signal<readonly MSchedulerEvent[]>(INITIAL)
    protected readonly log = signal('none')

    // In the month a drop changes the day only: the time of day and the duration stay.
    protected move({event, drop}: MSchedulerDropEvent): void {
        this.events.update((list) =>
            list.map((item) =>
                item.id === event.id ? {...item, startAt: drop.newStartAt, endAt: drop.newEndAt} : item
            )
        )
        this.log.set(`${event.title} → ${drop.newStartAt.toLocaleDateString()} (${drop.source})`)
    }
}
