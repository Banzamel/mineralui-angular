import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MMiniCalendar} from '@banzamel/mineralui-angular/calendar/mini-calendar'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-mini-calendar-form',
    imports: [MMiniCalendar, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-mini-calendar
                size="sm"
                [formControl]="visit"
                [min]="today"
                [max]="inSixWeeks"
                [disabledDates]="isWeekend"
                [showOutsideDays]="false"
            />
            <p mText tone="muted">Value: {{ value()?.toDateString() ?? 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCalendarFormExample {
    protected readonly today = new Date()
    protected readonly inSixWeeks = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 42)
    protected readonly visit = new FormControl<Date | null>(null, Validators.required)
    // Zoneless: read the control through a signal so the text refreshes.
    protected readonly value = toSignal(this.visit.valueChanges, {initialValue: this.visit.value})

    protected readonly isWeekend = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6
}
