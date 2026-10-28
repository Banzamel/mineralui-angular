import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {email, form, FormField, required} from '@angular/forms/signals'
import {MFieldError} from '@banzamel/mineralui-angular/feedback/field-error'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-form-field-error-signal',
    imports: [FormField, MFieldError, MStack],
    template: `
        <m-stack align="start">
            <div class="email-field">
                <label for="contact-email">Email</label>
                <input
                    id="contact-email"
                    type="email"
                    aria-describedby="contact-email-error"
                    [formField]="contact.email"
                    [attr.aria-invalid]="emailError.hasError() ? 'true' : null"
                />
                <!-- [control] takes the Signal Forms field; the rule message shows once it is touched. -->
                <m-field-error id="contact-email-error" #emailError="mFieldError" [control]="contact.email" />
            </div>
        </m-stack>
    `,
    styles: `
        .email-field {
            display: grid;
            gap: 4px;
            font-size: 14px;
        }
        .email-field input {
            padding: 8px 10px;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            background: var(--mineral-input-bg);
            color: var(--mineral-text);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErrorSignalExample {
    protected readonly model = signal({email: ''})
    protected readonly contact = form(this.model, (path) => {
        required(path.email, {message: 'Enter your email'})
        email(path.email, {message: 'This does not look like an email'})
    })
}
