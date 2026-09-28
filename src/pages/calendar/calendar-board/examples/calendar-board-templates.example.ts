import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCalendarBoard, MCalendarDayBadgeDef} from '@banzamel/mineralui-angular/calendar/calendar-board'
import type {MCalendarDayMenuFn} from '@banzamel/mineralui-angular/calendar/calendar-board'
import type {MCalendarDayActionEvent, MCalendarEvent} from '@banzamel/mineralui-angular/calendar/calendar-event'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {mCopyIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()
const day = (offset: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)

@Component({
    selector: 'app-calendar-board-templates',
    imports: [MBadge, MCalendarBoard, MCalendarDayBadgeDef, MStack, MText],
    template: `
        <m-stack>
            <m-calendar-board
                [showTimeline]="false"
                [events]="events()"
                [dayMenuItems]="dayMenu"
                [eventActions]="['delete']"
                (dayAction)="onDayAction($event)"
                (eventAction)="remove($event.event)"
            >
                <ng-template mCalendarDayBadge let-events="events">
                    @if (events.length > 2) {
                        <m-badge size="sm" color="error">Busy</m-badge>
                    } @else if (events.length > 0) {
                        <m-badge size="sm" color="success">{{ events.length }}</m-badge>
                    }
                </ng-template>
            </m-calendar-board>
            <p mText size="sm" tone="muted" role="status">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarBoardTemplatesExample {
    protected readonly status = signal('Open a day and use its menu.')
    protected readonly events = signal<readonly MCalendarEvent[]>([
        {id: 'a', title: 'Kick-off', date: day(0), startTime: '09:00', endTime: '10:00'},
        {id: 'b', title: 'Design sync', date: day(0), startTime: '11:00', endTime: '12:00'},
        {id: 'c', title: 'Demo', date: day(0), startTime: '15:00', endTime: '16:00'},
        {id: 'd', title: 'Retro', date: day(2), startTime: '14:00', endTime: '15:00'},
    ])

    // Menu of a day in its details; `undefined` for empty days keeps the built-in menu (empty here).
    protected readonly dayMenu: MCalendarDayMenuFn = (_date, events) =>
        events.length === 0
            ? undefined
            : [
                  {id: 'copy', label: 'Copy to next week', icon: mCopyIcon},
                  {id: 'clear', label: 'Clear the day', icon: mTrashIcon, color: 'error'},
              ]

    protected onDayAction({actionId, date, events}: MCalendarDayActionEvent): void {
        const label = date.toLocaleDateString('en-US', {day: 'numeric', month: 'long'})
        if (actionId === 'clear') {
            this.events.update((all) => all.filter((event) => !events.includes(event)))
            this.status.set(`Cleared ${label}.`)
            return
        }
        this.status.set(`Copy ${events.length} events from ${label}.`)
    }

    protected remove(event: MCalendarEvent): void {
        this.events.update((all) => all.filter((item) => item.id !== event.id))
    }
}
