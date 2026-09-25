import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MDateRange} from '@banzamel/mineralui-angular/dropdowns/calendar'
import {MDateRangePicker} from '@banzamel/mineralui-angular/dropdowns/date-range-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-date-range-picker-typing',
    imports: [MDateRangePicker, MStack, MText],
    template: `
        <m-stack align="start">
            <m-date-range-picker
                label="Trip"
                helperText="Type 12 15, or 12.03.2026 – 15, then Tab or Enter"
                clearable
                [(value)]="trip"
            />
            <m-date-range-picker label="ISO order" format="YYYY/MM/DD" separator="-" />
            <p mText tone="muted">Value: {{ text() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerTypingExample {
    protected readonly trip = signal<MDateRange | null>(null)
    protected readonly text = computed(() => {
        const trip = this.trip()
        return trip ? `${trip.start.toDateString()} → ${trip.end.toDateString()}` : 'null'
    })
}
