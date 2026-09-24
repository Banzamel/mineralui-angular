import {JsonPipe} from '@angular/common'
import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MValidators} from '@banzamel/mineralui-angular/form'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-form',
    imports: [JsonPipe, MButton, MInput, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="submit()">
            <m-stack align="start">
                <!-- Errors show once a field is touched or the form is submitted. -->
                <m-input
                    label="Full name"
                    formControlName="name"
                    [errorMessages]="{minlength: 'Use at least {requiredLength} characters'}"
                />
                <m-input label="Email" type="email" formControlName="email" helperText="We never share it" />
                <m-input
                    label="PESEL"
                    formControlName="pesel"
                    inputMode="numeric"
                    [maxLength]="11"
                    showCharCount
                    helperText="Optional — checked with the MineralUI rule"
                />
                <button mButton type="submit" size="sm">Save</button>
                <p mText size="sm" tone="muted">Value: {{ value() | json }}</p>
                @if (saved()) {
                    <p mText size="sm" class="m-fcolor-success">Saved.</p>
                }
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormExample {
    protected readonly form = new FormGroup({
        name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
        email: new FormControl('', {nonNullable: true, validators: [MValidators.required, MValidators.email]}),
        pesel: new FormControl('', {nonNullable: true, validators: MValidators.pesel}),
    })
    protected readonly value = toSignal(this.form.valueChanges, {initialValue: this.form.value})
    protected readonly saved = signal(false)

    protected submit(): void {
        this.saved.set(this.form.valid)
    }
}
