import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputPostCode} from '@banzamel/mineralui-angular/inputs/input-post-code'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-post-code-form',
    imports: [MInputPostCode, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-post-code
                label="Delivery postal code"
                [formControl]="postCode"
                [(country)]="country"
                [errorMessages]="{mPostCode: 'This is not a {countryCode} postal code'}"
            />
            <p mText size="sm" tone="muted">
                Control value: "{{ value() }}" · country: {{ country() }} · status: {{ status() }}
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPostCodeFormExample {
    protected readonly postCode = new FormControl('SW1A1AA', {nonNullable: true, validators: Validators.required})
    protected readonly country = signal('GB')
    protected readonly value = toSignal(this.postCode.valueChanges, {initialValue: this.postCode.value})
    protected readonly status = toSignal(this.postCode.statusChanges, {initialValue: this.postCode.status})
}
