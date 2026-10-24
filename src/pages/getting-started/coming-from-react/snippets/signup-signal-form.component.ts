import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {form, FormField, required} from '@angular/forms/signals'
import {MRules} from '@banzamel/mineralui-angular/form'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'

@Component({
    selector: 'app-signup-signal-form',
    imports: [FormField, MInput],
    template: `<m-input label="Email" type="email" [formField]="signup.email" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupSignalForm {
    protected readonly model = signal({email: ''})
    // The schema wins over the inputs: required, disabled and readonly come from here.
    protected readonly signup = form(this.model, (path) => {
        required(path.email)
        MRules.email(path.email)
    })
}
