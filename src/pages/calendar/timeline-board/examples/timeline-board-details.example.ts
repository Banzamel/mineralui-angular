import {ChangeDetectionStrategy, Component} from '@angular/core'
import {
    MTimelineBoard,
    MTimelineEventDetailsDef,
    MTimelineEventHeaderDef,
} from '@banzamel/mineralui-angular/calendar/timeline-board'
import type {MTimelineBoardEvent, MTimelineBoardRow} from '@banzamel/mineralui-angular/calendar/timeline-board'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()
const at = (hour: number, minute = 0) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute)

@Component({
    selector: 'app-timeline-board-details',
    imports: [MBadge, MText, MTimelineBoard, MTimelineEventDetailsDef, MTimelineEventHeaderDef],
    template: `
        <m-timeline-board
            label="Course schedule"
            [height]="260"
            [fullHeight]="false"
            [showDayStrip]="false"
            [rows]="groups"
            [events]="lessons"
        >
            <ng-template mTimelineEventHeader let-event>
                <span mText weight="semibold">{{ event.title }}</span>
                <m-badge size="sm" color="info">{{ event.meta?.['level'] }}</m-badge>
            </ng-template>
            <ng-template mTimelineEventDetails let-event>
                <p mText size="sm">Homework: {{ event.meta?.['homework'] }}</p>
            </ng-template>
        </m-timeline-board>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBoardDetailsExample {
    protected readonly groups: readonly MTimelineBoardRow[] = [
        {id: 'a', label: 'Group A'},
        {id: 'b', label: 'Group B'},
    ]
    protected readonly lessons: readonly MTimelineBoardEvent[] = [
        {
            id: 'l1',
            rowId: 'a',
            title: 'Spanish',
            startAt: at(9),
            endAt: at(10, 30),
            meta: {level: 'B1', homework: 'Chapter 4 exercises'},
        },
        {
            id: 'l2',
            rowId: 'b',
            title: 'German',
            startAt: at(11),
            endAt: at(12),
            meta: {level: 'A2', homework: 'Vocabulary list 7'},
        },
    ]
}
