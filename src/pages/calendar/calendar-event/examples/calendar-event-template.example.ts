import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCalendarEventDef} from '@banzamel/mineralui-angular/calendar/calendar-event'
import type {MCalendarEvent} from '@banzamel/mineralui-angular/calendar/calendar-event'
import {MCalendarEventList} from '@banzamel/mineralui-angular/calendar/calendar-event-list'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MIcon, mClockIcon} from '@banzamel/mineralui-angular/icons'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-calendar-event-template',
    imports: [MBadge, MCalendarEventDef, MCalendarEventList, MIcon, MText],
    template: `
        <m-calendar-event-list label="Rooms" overlapWarning [events]="events">
            <ng-template mCalendarEvent let-event let-overlap="overlap">
                <div class="calendar-room-row">
                    <m-icon [icon]="clockIcon" />
                    <span mText weight="semibold">{{ event.startTime }}–{{ event.endTime }}</span>
                    <span mText>{{ event.title }}</span>
                    <m-badge size="sm" color="neutral">{{ event.meta?.['room'] }}</m-badge>
                    @if (overlap) {
                        <m-badge size="sm" color="warning">Double-booked</m-badge>
                    }
                </div>
            </ng-template>
        </m-calendar-event-list>
    `,
    styles: `
        .calendar-room-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: var(--mineral-spacing-sm);
            padding: var(--mineral-spacing-xs) 0;
            border-bottom: 1px solid var(--mineral-border);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventTemplateExample {
    protected readonly clockIcon = mClockIcon
    protected readonly events: readonly MCalendarEvent[] = [
        {id: 'a', title: 'Onboarding', date: '2026-03-20', startTime: '09:00', endTime: '10:00', meta: {room: 'Atlas'}},
        {id: 'b', title: 'Interview', date: '2026-03-20', startTime: '09:30', endTime: '10:15', meta: {room: 'Atlas'}},
        {id: 'c', title: 'Retro', date: '2026-03-20', startTime: '11:00', endTime: '12:00', meta: {room: 'Borealis'}},
    ]
}
