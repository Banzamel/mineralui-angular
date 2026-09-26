import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import type {
    MCalendarActionItem,
    MCalendarEvent,
    MCalendarEventActionEvent,
} from '@banzamel/mineralui-angular/data/calendar-event'
import {MCalendarEventList} from '@banzamel/mineralui-angular/data/calendar-event-list'
import {mArchiveIcon, mCheckIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-calendar-event-menu',
    imports: [MCalendarEventList],
    template: `
        <m-calendar-event-list
            label="Sprint tasks"
            [events]="events()"
            [eventActions]="['delete']"
            [eventMenuItems]="menuFor"
            (eventAction)="onAction($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventMenuExample {
    protected readonly events = signal<readonly MCalendarEvent[]>([
        {id: 'spec', title: 'Write the spec', date: '2026-03-20', startTime: '09:00', endTime: '10:30'},
        {id: 'demo', title: 'Client demo', date: '2026-03-20', startTime: '14:00', endTime: '15:00'},
        {id: 'notes', title: 'Release notes', date: '2026-03-20', href: '/docs/calendar-event', status: 'done'},
    ])

    // Own items for open events; `undefined` keeps the built-in menu ("Open" for href, then "Delete").
    protected readonly menuFor = (event: MCalendarEvent): readonly MCalendarActionItem[] | undefined =>
        event.status === 'done'
            ? undefined
            : [
                  {id: 'done', label: 'Mark as done', icon: mCheckIcon, color: 'success'},
                  {id: 'archive', label: 'Archive', icon: mArchiveIcon, color: 'warning'},
              ]

    protected onAction({actionId, event}: MCalendarEventActionEvent): void {
        this.events.update((events) =>
            actionId === 'done'
                ? events.map((item) => (item.id === event.id ? {...item, status: 'done'} : item))
                : events.filter((item) => item.id !== event.id)
        )
    }
}
