import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {MValidators} from '@banzamel/mineralui-angular/form'
import {MIcon, mIdCardIcon} from '@banzamel/mineralui-angular/icons'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-form-custom-field',
    imports: [MIcon, MInput, MStack, ReactiveFormsModule],
    template: `
        <m-stack>
            <!-- A field without a specialized component: m-input + MValidators. The required marker comes from the
                 validator, the message from errorMessages → dictionary → the rule's own text. -->
            <m-input
                label="PESEL"
                inputMode="numeric"
                [maxLength]="11"
                [formControl]="pesel"
                [errorMessages]="{mPesel: 'This PESEL has a wrong check digit'}"
                fullWidth
            >
                <m-icon mStart [icon]="idCardIcon" />
            </m-input>
            <m-input
                label="Username"
                [formControl]="username"
                [errorMessages]="{mMinLength: 'Use at least {min} characters'}"
                helperText="Letters and digits"
                fullWidth
            />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCustomFieldExample {
    protected readonly idCardIcon = mIdCardIcon
    protected readonly pesel = new FormControl('', {
        nonNullable: true,
        validators: [MValidators.required, MValidators.pesel],
    })
    protected readonly username = new FormControl('', {
        nonNullable: true,
        validators: [MValidators.minLength(4), MValidators.pattern(/^[a-z0-9]*$/i, 'Letters and digits only')],
    })
}
