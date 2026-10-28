import {ChangeDetectionStrategy, Component} from '@angular/core'
import {
    MTimelineBoard,
    MTimelineEventContentDef,
    MTimelineEventDetailsDef,
} from '@banzamel/mineralui-angular/calendar/timeline-board'
import type {MTimelineBoardEvent, MTimelineBoardRow} from '@banzamel/mineralui-angular/calendar/timeline-board'
import {MProgressBar} from '@banzamel/mineralui-angular/display/progress-bar'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()
const at = (hour: number, minute = 0) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute)

@Component({
    selector: 'app-timeline-board-blocks',
    imports: [MProgressBar, MText, MTimelineBoard, MTimelineEventContentDef, MTimelineEventDetailsDef],
    template: `
        <m-timeline-board
            label="Court bookings"
            workdayStart="08:00"
            workdayEnd="21:00"
            autoRowHeight
            [height]="300"
            [fullHeight]="false"
            [showDayStrip]="false"
            [centerAt]="center"
            [rows]="courts"
            [events]="bookings"
        >
            <!-- Decoration inside the block button: no links or buttons; the block keeps its name. -->
            <ng-template mTimelineEventContent let-event let-time="time" let-width="width">
                <span class="booking-title">{{ event.title }}</span>
                @if (event.meta?.['booked'] !== undefined && width > 110) {
                    <span class="booking-occupancy">
                        <m-progress-bar
                            size="xs"
                            aria-hidden="true"
                            [value]="event.meta?.['booked']"
                            [max]="event.capacity ?? 1"
                        />
                        <span>{{ event.meta?.['booked'] }} / {{ event.capacity }}</span>
                    </span>
                } @else {
                    <span class="booking-time">{{ time }}</span>
                }
            </ng-template>
            <ng-template mTimelineEventDetails let-event>
                @if (event.meta?.['booked'] !== undefined) {
                    <p mText size="sm">Booked: {{ event.meta?.['booked'] }} of {{ event.capacity }}</p>
                }
            </ng-template>
        </m-timeline-board>
    `,
    styles: `
        .booking-title {
            overflow: hidden;
            font-size: var(--mineral-font-size-xs);
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .booking-occupancy {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: var(--mineral-font-size-xs);
            white-space: nowrap;
        }

        .booking-occupancy m-progress-bar {
            flex: 1 1 auto;
        }

        .booking-time {
            color: var(--mineral-text-secondary);
            font-size: var(--mineral-font-size-xs);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBoardBlocksExample {
    protected readonly center = at(13)
    protected readonly courts: readonly MTimelineBoardRow[] = [
        {id: 'c1', label: 'Court 1'},
        {id: 'c2', label: 'Court 2'},
        {id: 'c3', label: 'Court 3'},
    ]
    protected readonly bookings: readonly MTimelineBoardEvent[] = [
        {
            id: 'kids',
            rowId: 'c1',
            title: 'Kids group',
            startAt: at(9),
            endAt: at(11),
            capacity: 12,
            meta: {booked: 8},
            color: '#0ea5e9',
        },
        {id: 'match', rowId: 'c1', title: 'Match', startAt: at(12), endAt: at(13, 30), color: '#22c55e'},
        // Hatched: a hold that is not confirmed yet.
        {id: 'hold', rowId: 'c2', title: 'Hold — club cup', startAt: at(10), endAt: at(14), variant: 'hatched'},
        // Ghost: a suggestion, not a booking.
        {
            id: 'free',
            rowId: 'c3',
            title: 'Free for a lesson',
            startAt: at(11),
            endAt: at(12, 30),
            variant: 'ghost',
            color: '#78716c',
        },
        {
            id: 'adults',
            rowId: 'c3',
            title: 'Adults group',
            startAt: at(14),
            endAt: at(16),
            capacity: 10,
            meta: {booked: 10},
            color: '#a855f7',
        },
    ]
}
