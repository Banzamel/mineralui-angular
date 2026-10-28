import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MTimeline, MTimelineGroup, MTimelineItem} from '@banzamel/mineralui-angular/display/timeline'

interface Day {
    readonly label: string
    readonly events: readonly {readonly heading: string; readonly time: string; readonly dateTime: string}[]
}

@Component({
    selector: 'app-timeline-groups',
    imports: [MTimeline, MTimelineGroup, MTimelineItem],
    template: `
        <ol mTimeline size="sm">
            @for (day of days; track day.label) {
                <li mTimelineGroup [label]="day.label">
                    <!-- The nested list inherits size, align and color, and is named by the group label. -->
                    <ol mTimeline>
                        @for (event of day.events; track event.dateTime) {
                            <li
                                mTimelineItem
                                [heading]="event.heading"
                                [date]="event.time"
                                [dateTime]="event.dateTime"
                            ></li>
                        }
                    </ol>
                </li>
            }
        </ol>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineGroupsExample {
    protected readonly days: readonly Day[] = [
        {
            label: 'Today',
            events: [
                {heading: 'Entry fee paid', time: '14:20', dateTime: '2026-10-28T14:20'},
                {heading: 'Player registered', time: '09:05', dateTime: '2026-10-28T09:05'},
            ],
        },
        {
            label: 'Monday, 26 October',
            events: [{heading: 'Team created', time: '18:40', dateTime: '2026-10-26T18:40'}],
        },
    ]
}
