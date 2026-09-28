import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTimelineBoard} from '@banzamel/mineralui-angular/calendar/timeline-board'
import type {
    MTimelineBoardEvent,
    MTimelineBoardRange,
    MTimelineBoardRow,
} from '@banzamel/mineralui-angular/calendar/timeline-board'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const DAY_MS = 24 * 3_600_000

@Component({
    selector: 'app-timeline-board-range',
    imports: [MStack, MText, MTimelineBoard],
    template: `
        <m-stack>
            <m-timeline-board
                label="Support shifts"
                [height]="320"
                [fullHeight]="false"
                [showDayStrip]="false"
                [rows]="agents"
                [events]="shifts()"
                [loading]="loading()"
                (rangeChange)="load($event)"
            />
            <p mText size="sm" tone="muted">{{ loaded() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBoardRangeExample {
    protected readonly agents: readonly MTimelineBoardRow[] = [
        {id: 'eu', label: 'Europe desk'},
        {id: 'us', label: 'Americas desk'},
        {id: 'apac', label: 'APAC desk'},
    ]
    protected readonly shifts = signal<readonly MTimelineBoardEvent[]>([])
    protected readonly loading = signal(false)
    protected readonly loaded = signal('Pan the board: every stop loads its range (with a buffer on both sides).')

    private request = 0

    // Stands in for an HTTP call: fetch the buffered range, keep the old events meanwhile.
    protected load(range: MTimelineBoardRange): void {
        const request = ++this.request
        this.loading.set(true)
        setTimeout(() => {
            if (request !== this.request) return
            this.shifts.set(this.generate(range.bufferStart, range.bufferEnd))
            this.loading.set(false)
            this.loaded.set(
                `Loaded ${range.bufferStart.toLocaleString('en-US')} – ${range.bufferEnd.toLocaleString('en-US')}`
            )
        }, 500)
    }

    private generate(from: Date, to: Date): MTimelineBoardEvent[] {
        const shifts: MTimelineBoardEvent[] = []
        const first = new Date(from.getFullYear(), from.getMonth(), from.getDate())
        for (let day = first.getTime(); day < to.getTime(); day += DAY_MS) {
            const date = new Date(day)
            const shift = (rowId: string, startHour: number, hours: number) => {
                const startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour)
                shifts.push({
                    id: `${rowId}-${day}-${startHour}`,
                    rowId,
                    title: `${String(startHour).padStart(2, '0')}:00 shift`,
                    startAt,
                    endAt: new Date(startAt.getTime() + hours * 3_600_000),
                })
            }
            shift('eu', 7, 8)
            shift('us', 14, 8)
            shift('apac', 22, 8)
        }
        return shifts
    }
}
