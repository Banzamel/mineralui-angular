import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCalendar} from '@banzamel/mineralui-angular/dropdowns/calendar'
import type {MDateRange, MDateRangePreset} from '@banzamel/mineralui-angular/dropdowns/calendar'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

// Presets computed on click stay correct on a page left open overnight.
function lastDays(days: number): () => MDateRange {
    return () => {
        const end = new Date()
        return {start: new Date(end.getFullYear(), end.getMonth(), end.getDate() - (days - 1)), end}
    }
}

@Component({
    selector: 'app-calendar-range',
    imports: [MCalendar, MStack],
    template: `
        <m-stack align="start">
            <m-calendar range [months]="2" presets presetsLayout="sidebar" [(value)]="period" />
            <m-calendar range [presets]="sprints" [allowSameDay]="false" [(value)]="sprint" color="success" />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarRangeExample {
    protected readonly period = signal<Date | MDateRange | null>(null)
    protected readonly sprint = signal<Date | MDateRange | null>(null)
    protected readonly sprints: readonly MDateRangePreset[] = [
        {label: 'Last week', value: lastDays(7)},
        {label: 'Last sprint', value: lastDays(14)},
    ]
}
