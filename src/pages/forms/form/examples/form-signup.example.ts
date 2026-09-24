import {JsonPipe} from '@angular/common'
import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import {MInputName} from '@banzamel/mineralui-angular/inputs/input-name'
import {MInputPhone} from '@banzamel/mineralui-angular/inputs/input-phone'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-form-signup',
    imports: [
        JsonPipe,
        MButton,
        MCheckbox,
        MInline,
        MInputEmail,
        MInputName,
        MInputPhone,
        MStack,
        MText,
        ReactiveFormsModule,
    ],
    template: `
        <!-- The fields validate themselves (name words, email format, phone digits); the form sees their errors. -->
        <form [formGroup]="signup" (ngSubmit)="submit()">
            <m-stack>
                <m-input-name label="Full name" formControlName="name" [minWords]="2" fullWidth />
                <m-input-email label="Email" formControlName="email" fullWidth />
                <m-input-phone label="Phone" formControlName="phone" helperText="Optional" fullWidth />
                <m-checkbox formControlName="terms" [errorMessages]="{required: 'Accept the terms to continue'}">
                    I accept the terms
                </m-checkbox>
                <m-inline>
                    <button mButton type="submit">Create account</button>
                    <button mButton type="button" variant="ghost" (click)="reset()">Reset</button>
                </m-inline>
                <!-- Errors show once a field is touched or the form submitted. -->
                <p mText size="sm" tone="muted">Status: {{ status() }}</p>
                @if (sent(); as value) {
                    <p mText size="sm">Sent: {{ value | json }}</p>
                }
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignupExample {
    protected readonly signup = new FormGroup({
        name: new FormControl('', {nonNullable: true, validators: Validators.required}),
        email: new FormControl('', {nonNullable: true, validators: Validators.required}),
        // Raw digits in the model; the field shows "600 700 800".
        phone: new FormControl('', {nonNullable: true}),
        terms: new FormControl(false, {nonNullable: true, validators: Validators.requiredTrue}),
    })
    protected readonly status = toSignal(this.signup.statusChanges, {initialValue: this.signup.status})
    protected readonly sent = signal<unknown>(null)

    protected submit(): void {
        // form.value is ready to send: no mapping from formatted strings.
        this.sent.set(this.signup.valid ? this.signup.getRawValue() : null)
    }

    protected reset(): void {
        this.signup.reset()
        this.sent.set(null)
    }
}
