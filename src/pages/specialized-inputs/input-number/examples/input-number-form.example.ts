import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputNumber} from '@banzamel/mineralui-angular/inputs/input-number'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-number-form',
    imports: [MInputNumber, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <!-- The control holds a number: Validators.min / max need no parsing. Without [min] / [max] on the
                 component nothing is clamped, so the validators report out-of-range values. -->
            <m-input-number
                label="Guests"
                [formControl]="guests"
                helperText="Between 1 and 12"
                [errorMessages]="{max: 'We seat at most {max} guests'}"
            />
            <p mText size="sm" tone="muted">Control value: {{ shown() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberFormExample {
    protected readonly guests = new FormControl<number | null>(2, [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
    ])
    protected readonly value = toSignal(this.guests.valueChanges, {initialValue: this.guests.value})
    protected readonly shown = computed(() => {
        const value = this.value()
        return value === null ? 'null' : `${value} (${typeof value})`
    })
}
