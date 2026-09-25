import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MCalendar} from '@banzamel/mineralui-angular/dropdowns/calendar'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-calendar-form',
    imports: [MCalendar, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-calendar [formControl]="appointment" [showTodayButton]="false" color="info" />
            <p mText tone="muted">Value: {{ value()?.toDateString() ?? 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarFormExample {
    protected readonly appointment = new FormControl<Date | null>(null, Validators.required)
    // Zoneless: read the control through a signal so the text refreshes.
    protected readonly value = toSignal(this.appointment.valueChanges, {initialValue: this.appointment.value})
}
