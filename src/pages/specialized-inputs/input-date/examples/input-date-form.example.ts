import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputDate} from '@banzamel/mineralui-angular/inputs/input-date'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-date-form',
    imports: [MInputDate, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-date
                label="Date of birth"
                separator="."
                [maxDate]="today"
                [formControl]="birthDate"
                [errorMessages]="{mDate: 'Enter a real date in the past'}"
            />
            <p mText size="sm" tone="muted">Control value: {{ shown() }} · status: {{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateFormExample {
    protected readonly today = new Date()
    protected readonly birthDate = new FormControl<Date | null>(new Date(1990, 4, 17), Validators.required)
    private readonly value = toSignal(this.birthDate.valueChanges, {initialValue: this.birthDate.value})
    protected readonly status = toSignal(this.birthDate.statusChanges, {initialValue: this.birthDate.status})
    protected readonly shown = computed(() => this.value()?.toDateString() ?? 'null')
}
