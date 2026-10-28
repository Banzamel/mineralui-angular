import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCalendarBoard} from '@banzamel/mineralui-angular/calendar/calendar-board'
import type {MCalendarEvent} from '@banzamel/mineralui-angular/calendar/calendar-event'
import {MCalendarEventList} from '@banzamel/mineralui-angular/calendar/calendar-event-list'
import {MSegmented} from '@banzamel/mineralui-angular/controls/segmented'
import type {MSegmentedItem} from '@banzamel/mineralui-angular/controls/segmented'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

const today = new Date()
const inDays = (offset: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)

@Component({
    selector: 'app-calendar-board-header',
    imports: [MCalendarBoard, MCalendarEventList, MSegmented, MStack],
    template: `
        @if (mode() === 'calendar') {
            <m-calendar-board showToday cellContent="labels" [events]="events" [showTimeline]="false">
                <m-segmented mCalendarBoardActions size="sm" ariaLabel="Show as" [items]="modes" [(value)]="mode" />
            </m-calendar-board>
        } @else {
            <m-stack>
                <m-segmented size="sm" ariaLabel="Show as" [items]="modes" [(value)]="mode" />
                <m-calendar-event-list label="Upcoming" [events]="events" />
            </m-stack>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarBoardHeaderExample {
    protected readonly mode = signal('calendar')
    protected readonly modes: readonly MSegmentedItem[] = [
        {value: 'list', label: 'List'},
        {value: 'calendar', label: 'Calendar'},
    ]
    protected readonly events: readonly MCalendarEvent[] = [
        {id: 'a', title: 'Training', date: inDays(0), startTime: '17:00', endTime: '18:30'},
        {id: 'b', title: 'League match', date: inDays(3), startTime: '12:00', endTime: '14:00', status: 'active'},
        {id: 'c', title: 'Tournament', date: inDays(36), endDate: inDays(38)},
        {id: 'd', title: 'Training', date: inDays(-30), startTime: '17:00', endTime: '18:30', status: 'done'},
    ]
}
