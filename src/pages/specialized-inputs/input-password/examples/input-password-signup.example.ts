import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import {MInputPassword} from '@banzamel/mineralui-angular/inputs/input-password'
import type {MPasswordStrength} from '@banzamel/mineralui-angular/inputs/input-password'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-password-signup',
    imports: [MButton, MInputEmail, MInputPassword, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="submit()">
            <m-stack align="start">
                <m-input-email label="Email" formControlName="email" />
                <m-input-password
                    label="Password"
                    formControlName="password"
                    autoComplete="new-password"
                    showStrength
                    [errorMessages]="{minlength: 'Use at least {requiredLength} characters'}"
                    (strengthChange)="strength.set($event)"
                />
                <button mButton type="submit" size="sm" [disabled]="strength() === 'weak'">Create account</button>
                @if (created()) {
                    <p mText size="sm" class="m-fcolor-success">Account created.</p>
                }
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordSignupExample {
    protected readonly form = new FormGroup({
        email: new FormControl('', {nonNullable: true, validators: Validators.required}),
        password: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]}),
    })
    protected readonly strength = signal<MPasswordStrength>('weak')
    protected readonly created = signal(false)

    protected submit(): void {
        this.created.set(this.form.valid)
    }
}
