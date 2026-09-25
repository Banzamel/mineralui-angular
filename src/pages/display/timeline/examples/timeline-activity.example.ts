import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MTimeline, MTimelineItem} from '@banzamel/mineralui-angular/display/timeline'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MLink} from '@banzamel/mineralui-angular/typography/link'

interface Activity {
    readonly id: number
    readonly heading: string
    readonly description?: string
    readonly date: string
    readonly dateTime: string
    readonly color?: MColor
    readonly link?: string
}

@Component({
    selector: 'app-timeline-activity',
    imports: [MLink, MTimeline, MTimelineItem],
    template: `
        <ol mTimeline size="sm" color="neutral">
            @for (activity of activities; track activity.id) {
                <li
                    mTimelineItem
                    [heading]="activity.heading"
                    [description]="activity.description"
                    [date]="activity.date"
                    [dateTime]="activity.dateTime"
                    [color]="activity.color"
                >
                    @if (activity.link) {
                        <a mLink [href]="activity.link">View changes</a>
                    }
                </li>
            }
        </ol>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineActivityExample {
    protected readonly activities: readonly Activity[] = [
        {
            id: 3,
            heading: 'Released v2.4.0',
            description: 'Stepper and timeline for Angular.',
            date: 'Today, 10:24',
            dateTime: '2026-09-25T10:24',
            color: 'success',
            link: '#release',
        },
        {id: 2, heading: 'Merged the theming PR', date: 'Yesterday, 16:02', dateTime: '2026-09-24T16:02'},
        {
            id: 1,
            heading: 'Opened issue #128',
            description: 'Stepper headings should be buttons.',
            date: '21 Sep',
            dateTime: '2026-09-21',
            color: 'warning',
        },
    ]
}
