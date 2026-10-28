import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MWeekGrid} from '@banzamel/mineralui-angular/data/week-grid'
import type {MWeekGridCellContext, MWeekGridRange} from '@banzamel/mineralui-angular/data/week-grid'

const EMPTY_WEEK: readonly (readonly number[])[] = Array.from({length: 7}, () => Array.from({length: 24}, () => 0))

@Component({
    selector: 'app-week-grid-select',
    imports: [MWeekGrid],
    template: `
        <m-week-grid
            heading="Availability"
            hint="Click an hour or drag across several. Shift + arrows and Enter work from the keyboard."
            color="success"
            selectable
            [data]="grid()"
            [max]="1"
            [peakLabel]="summary()"
            [tooltip]="noTooltip"
            [showLegend]="false"
            (selectRange)="fillArea($event)"
            (selectingRange)="preview.set($event)"
            (cellClick)="toggle($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekGridSelectExample {
    protected readonly grid = signal(EMPTY_WEEK)
    protected readonly preview = signal<MWeekGridRange | null>(null)
    protected readonly noTooltip = () => null

    protected readonly summary = computed(() => {
        const preview = this.preview()
        if (preview) return `${preview.days.length * preview.slots.length} h selected`
        const hours = this.grid().reduce((sum, row) => sum + row.reduce((a, b) => a + b, 0), 0)
        return `${hours} h`
    })

    // Starting on a filled cell clears the area, otherwise it fills it.
    protected fillArea(range: MWeekGridRange): void {
        const fill = range.origin.value === 1 ? 0 : 1
        this.grid.update((rows) =>
            rows.map((row, day) =>
                range.days.includes(day) ? row.map((value, slot) => (range.slots.includes(slot) ? fill : value)) : row
            )
        )
    }

    protected toggle(cell: MWeekGridCellContext): void {
        this.grid.update((rows) =>
            rows.map((row, day) =>
                day === cell.day ? row.map((value, slot) => (slot === cell.slot ? 1 - value : value)) : row
            )
        )
    }
}
