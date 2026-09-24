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
                <!-- formControlName goes straight on m-checkbox. The error of the control shows by itself once it
                     is touched or the form is submitted. -->
                <m-checkbox formControlName="terms">I accept the terms of service</m-checkbox>
                <m-checkbox formControlName="newsletter" color="success">Send me the monthly newsletter</m-checkbox>
                <button mButton type="submit" size="sm">Create account</button>
                @if (created()) {
                    <p mText size="sm" class="m-fcolor-success">Account created.</p>
                }
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

    protected readonly created = signal(false)

    protected submit(): void {
        this.created.set(this.form.valid)
    }
}
