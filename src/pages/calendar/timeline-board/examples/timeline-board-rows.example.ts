import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTimelineBoard} from '@banzamel/mineralui-angular/calendar/timeline-board'
import type {
    MTimelineBoardDropEvent,
    MTimelineBoardEvent,
    MTimelineBoardRow,
} from '@banzamel/mineralui-angular/calendar/timeline-board'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()
const at = (hour: number, minute = 0) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute)

@Component({
    selector: 'app-timeline-board-rows',
    imports: [MStack, MText, MTimelineBoard],
    template: `
        <m-stack>
            <m-timeline-board
                label="Hall plan"
                draggable
                [height]="260"
                [fullHeight]="false"
                [showDayStrip]="false"
                [centerAt]="center"
                [rows]="halls"
                [events]="events()"
                (eventDrop)="move($event)"
            />
            <p mText size="sm" tone="muted" role="status">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBoardRowsExample {
    protected readonly center = at(12)
    protected readonly status = signal('The tournament takes halls A and B; drag the training — the tournament stays.')
    protected readonly halls: readonly MTimelineBoardRow[] = [
        {id: 'a', label: 'Hall A'},
        {id: 'b', label: 'Hall B'},
        {id: 'c', label: 'Hall C'},
    ]
    protected readonly events = signal<readonly MTimelineBoardEvent[]>([
        {id: 'cup', rowId: ['a', 'b'], title: 'Tournament', startAt: at(9), endAt: at(13), color: '#f59e0b'},
        {id: 'training', rowId: 'c', title: 'Training', startAt: at(10), endAt: at(11, 30)},
    ])

    protected move({event, change}: MTimelineBoardDropEvent): void {
        this.events.update((events) =>
            events.map((item) =>
                item.id === event.id
                    ? {...item, rowId: change.newRowId, startAt: change.newStartAt, endAt: change.newEndAt}
                    : item
            )
        )
        this.status.set(`Moved ${event.title}.`)
    }
}
