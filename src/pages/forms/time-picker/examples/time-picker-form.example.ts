import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MTimePicker} from '@banzamel/mineralui-angular/dropdowns/time-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-time-picker-form',
    imports: [MStack, MText, MTimePicker, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-time-picker
                label="Opening hour"
                helperText="Between 08:00 and 18:00, every 30 minutes"
                min="08:00"
                max="18:00"
                [minuteStep]="30"
                [formControl]="opening"
            />
            <p mText tone="muted">Value: {{ state().value }}</p>
            <p mText tone="muted">Errors: {{ state().errors }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerFormExample {
    protected readonly opening = new FormControl<string | null>(null, Validators.required)
    // Zoneless: every control event is a new object, so the signal changes even when the value stays null.
    private readonly events = toSignal(this.opening.events)
    protected readonly state = computed(() => {
        this.events()
        return {value: this.opening.value ?? 'null', errors: JSON.stringify(this.opening.errors)}
    })
}
