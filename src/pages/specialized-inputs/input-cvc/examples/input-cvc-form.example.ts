import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputCVC} from '@banzamel/mineralui-angular/inputs/input-cvc'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-cvc-form',
    imports: [MInputCVC, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-cvc label="CVV" [formControl]="cvc" [errorMessages]="{mCvc: 'Enter all {length} digits'}" />
            <p mText size="sm" tone="muted">Control value: "{{ value() }}" · status: {{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCvcFormExample {
    protected readonly cvc = new FormControl('', {nonNullable: true, validators: Validators.required})
    protected readonly value = toSignal(this.cvc.valueChanges, {initialValue: this.cvc.value})
    protected readonly status = toSignal(this.cvc.statusChanges, {initialValue: this.cvc.status})
}
