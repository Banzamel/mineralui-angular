import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MFieldError} from '@banzamel/mineralui-angular/feedback/field-error'
import {MValidators} from '@banzamel/mineralui-angular/form'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-form-field-error',
    imports: [MButton, MFieldError, MStack, ReactiveFormsModule],
    template: `
        <form novalidate [formGroup]="profile" (ngSubmit)="save()">
            <m-stack align="start">
                <!-- Your own field markup; m-field-error shows the control's message like MineralUI fields do. -->
                <div class="nick-field">
                    <label for="nick">Nickname</label>
                    <input
                        id="nick"
                        formControlName="nick"
                        aria-describedby="nick-error"
                        [attr.aria-invalid]="nickError.hasError() ? 'true' : null"
                    />
                    <m-field-error
                        id="nick-error"
                        control="nick"
                        #nickError="mFieldError"
                        [errorMessages]="{mMinLength: 'Use at least {min} characters'}"
                    />
                </div>
                <!-- A server error for the whole form: errors are shown at once. -->
                <m-field-error [errors]="serverErrors()" />
                <button mButton size="sm" type="submit">Save</button>
            </m-stack>
        </form>
    `,
    styles: `
        .nick-field {
            display: grid;
            gap: 4px;
            font-size: 14px;
        }
        .nick-field input {
            padding: 8px 10px;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            background: var(--mineral-input-bg);
            color: var(--mineral-text);
        }
        .nick-field input[aria-invalid='true'] {
            border-color: var(--mineral-error);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErrorExample {
    protected readonly profile = new FormGroup({
        nick: new FormControl('', {nonNullable: true, validators: [Validators.required, MValidators.minLength(3)]}),
    })
    protected readonly serverErrors = signal<Record<string, unknown> | null>(null)

    protected save(): void {
        this.serverErrors.set(null)
        if (this.profile.invalid) return
        this.serverErrors.set({taken: {message: `"${this.profile.value.nick}" is taken — try another one`}})
    }
}
