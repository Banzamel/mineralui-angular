import {JsonPipe} from '@angular/common'
import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-checkbox-form',
    imports: [JsonPipe, MButton, MCheckbox, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="submit()">
            <m-stack align="start">
                <!-- A form control: formControlName goes straight on m-checkbox. -->
                <m-checkbox
                    formControlName="terms"
                    [errorText]="submitted() && status() === 'INVALID' ? 'Accept the terms to continue' : undefined"
                >
                    I accept the terms of service
                </m-checkbox>
                <m-checkbox formControlName="newsletter" color="success">Send me the monthly newsletter</m-checkbox>
                <button mButton type="submit" size="sm">Create account</button>
                <p mText size="sm" tone="muted">Value: {{ value() | json }}</p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFormExample {
    protected readonly form = new FormGroup({
        terms: new FormControl(false, {nonNullable: true, validators: Validators.requiredTrue}),
        newsletter: new FormControl(true, {nonNullable: true}),
    })
    protected readonly value = toSignal(this.form.valueChanges, {initialValue: this.form.value})
    protected readonly status = toSignal(this.form.statusChanges, {initialValue: this.form.status})
    protected readonly submitted = signal(false)

    protected submit(): void {
        this.submitted.set(true)
    }
}
