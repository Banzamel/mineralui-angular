import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MDateRange} from '@banzamel/mineralui-angular/dropdowns/calendar'
import {MDateRangePicker} from '@banzamel/mineralui-angular/dropdowns/date-range-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-date-range-picker-time',
    imports: [MDateRangePicker, MStack, MText],
    template: `
        <m-stack align="start">
            <m-date-range-picker
                label="Tournament"
                helperText="Type 12.03.2026 9:00 15 18:00, or pick days and times"
                withTime
                [minuteStep]="15"
                [minDate]="today"
                clearable
                [(value)]="slot"
            />
            <m-date-range-picker label="Shift (12-hour)" withTime timeFormat="12h" [minuteStep]="30" />
            <p mText tone="muted">Value: {{ text() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerTimeExample {
    protected readonly today = new Date()
    protected readonly slot = signal<MDateRange | null>(null)
    protected readonly text = computed(() => {
        const slot = this.slot()
        const format = (date: Date) => date.toLocaleString('en-GB', {dateStyle: 'medium', timeStyle: 'short'})
        return slot ? `${format(slot.start)} → ${format(slot.end)}` : 'null'
    })
}
