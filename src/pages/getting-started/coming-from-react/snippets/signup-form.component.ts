import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {MValidators} from '@banzamel/mineralui-angular/form'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'

@Component({
    selector: 'app-signup-form',
    imports: [ReactiveFormsModule, MInput],
    template: `
        <form [formGroup]="signup">
            <!-- A ControlValueAccessor: the error text comes from the control's errors once it is touched. -->
            <m-input label="Email" type="email" formControlName="email" />
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupForm {
    protected readonly signup = new FormGroup({
        email: new FormControl('', {nonNullable: true, validators: [MValidators.required, MValidators.email]}),
    })
}
