import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCalendarBoard} from '@banzamel/mineralui-angular/calendar/calendar-board'
import type {MCalendarEvent} from '@banzamel/mineralui-angular/calendar/calendar-event'
import {MCalendarTimeline} from '@banzamel/mineralui-angular/calendar/calendar-timeline'

const today = new Date()
const day = (offset: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)

@Component({
    selector: 'app-calendar-board-agenda',
    imports: [MCalendarBoard, MCalendarTimeline],
    template: `
        <div class="agenda-layout">
            <m-calendar-board
                detailsMode="none"
                [views]="['month']"
                [showHourBar]="false"
                [events]="lessons"
                [(selectedDate)]="selected"
            />
            <m-calendar-timeline
                [heading]="heading()"
                [date]="selected() ?? today"
                [events]="dayLessons()"
                [startHour]="8"
                [endHour]="16"
            />
        </div>
    `,
    styles: `
        .agenda-layout {
            display: grid;
            grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr);
            gap: var(--mineral-spacing-lg);
            align-items: start;
        }

        @media (max-width: 900px) {
            .agenda-layout {
                grid-template-columns: minmax(0, 1fr);
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarBoardAgendaExample {
    protected readonly today = today
    protected readonly selected = signal<Date | null>(today)
    protected readonly lessons: readonly MCalendarEvent[] = [
        {id: 'math', title: 'Algebra', date: day(0), startTime: '08:00', endTime: '09:30', status: 'active'},
        {id: 'lit', title: 'Literature', date: day(0), startTime: '10:00', endTime: '11:00'},
        {id: 'lab', title: 'Chemistry lab', date: day(1), startTime: '09:00', endTime: '12:00', type: 'Lab'},
        {id: 'pe', title: 'Swimming', date: day(2), startTime: '13:00', endTime: '14:30'},
        {id: 'trip', title: 'Museum trip', date: day(4), type: 'Trip'},
    ]

    protected readonly dayLessons = computed(() => {
        const selected = (this.selected() ?? today).toDateString()
        return this.lessons.filter((lesson) => lesson.date instanceof Date && lesson.date.toDateString() === selected)
    })

    protected readonly heading = computed(() =>
        (this.selected() ?? today).toLocaleDateString('en-US', {weekday: 'long', day: 'numeric', month: 'long'})
    )
}
