import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-email-form',
    imports: [MInputEmail, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <!-- No MValidators.email needed: the component validates the control itself. -->
            <m-input-email
                label="Work email"
                [formControl]="email"
                helperText="We send the invoice here"
                [errorMessages]="{mEmail: 'That does not look like an email address'}"
            />
            <p mText size="sm" tone="muted">Control status: {{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailFormExample {
    protected readonly email = new FormControl('', {nonNullable: true, validators: Validators.required})
    protected readonly status = toSignal(this.email.statusChanges, {initialValue: this.email.status})
}
