import {ChangeDetectionStrategy, Component} from '@angular/core'
import type {MDateRange, MDateRangePreset} from '@banzamel/mineralui-angular/dropdowns/calendar'
import {MDateRangePicker} from '@banzamel/mineralui-angular/dropdowns/date-range-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

// A preset value can be a function: it is computed when clicked, so "this week" never goes stale.
function thisWeek(): MDateRange {
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getDay() + 6) % 7))
    return {start, end: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)}
}

@Component({
    selector: 'app-date-range-picker-presets',
    imports: [MDateRangePicker, MStack],
    template: `
        <m-stack align="start">
            <m-date-range-picker label="Report period" presets />
            <m-date-range-picker label="Sidebar presets" presets presetsLayout="sidebar" />
            <m-date-range-picker label="Custom presets" [presets]="custom" />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerPresetsExample {
    protected readonly custom: readonly MDateRangePreset[] = [
        {label: 'This week', value: thisWeek},
        {label: 'Q1 2026', value: {start: new Date(2026, 0, 1), end: new Date(2026, 2, 31)}},
    ]
}
