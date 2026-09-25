import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MDatePicker} from '@banzamel/mineralui-angular/dropdowns/date-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-date-picker-form',
    imports: [MDatePicker, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-date-picker
                label="Delivery"
                helperText="Weekdays from today on"
                [min]="today"
                [disabledDates]="weekend"
                [formControl]="delivery"
            />
            <p mText tone="muted">Value: {{ state().value }}</p>
            <p mText tone="muted">Errors: {{ state().errors }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerFormExample {
    protected readonly today = new Date()
    protected readonly weekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6
    protected readonly delivery = new FormControl<Date | null>(null, Validators.required)
    // Zoneless: every control event is a new object, so the signal changes even when the value stays null.
    private readonly events = toSignal(this.delivery.events)
    protected readonly state = computed(() => {
        this.events()
        return {
            value: this.delivery.value?.toDateString() ?? 'null',
            errors: JSON.stringify(this.delivery.errors),
        }
    })
}
