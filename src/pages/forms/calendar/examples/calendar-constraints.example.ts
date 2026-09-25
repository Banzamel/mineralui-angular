import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCalendar} from '@banzamel/mineralui-angular/dropdowns/calendar'
import type {MDateRange} from '@banzamel/mineralui-angular/dropdowns/calendar'

@Component({
    selector: 'app-calendar-constraints',
    imports: [MCalendar],
    template: `<m-calendar [min]="today" [max]="inTwoMonths" [disabledDates]="isWeekend" [(value)]="delivery" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarConstraintsExample {
    protected readonly today = new Date()
    protected readonly inTwoMonths = new Date(this.today.getFullYear(), this.today.getMonth() + 2, this.today.getDate())
    protected readonly delivery = signal<Date | MDateRange | null>(null)

    protected readonly isWeekend = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6
}
