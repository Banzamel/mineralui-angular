import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MRadio, MRadioGroup} from '@banzamel/mineralui-angular/controls/radio'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-radio-form',
    imports: [MButton, MRadio, MRadioGroup, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <!-- The form control goes on the group; the radios only carry their values. Its error shows once the
                 control is touched; errorMessages replaces the default text per error key. -->
            <fieldset
                mRadioGroup
                label="Billing period"
                direction="horizontal"
                [formControl]="billing"
                [errorMessages]="{required: 'Choose a billing period'}"
            >
                <m-radio value="monthly">Monthly</m-radio>
                <m-radio value="yearly">Yearly (2 months free)</m-radio>
                <m-radio value="lifetime" disabled>Lifetime (sold out)</m-radio>
            </fieldset>
            <button mButton size="sm" (click)="billing.markAsTouched()">Continue</button>
            <p mText size="sm" tone="muted">Value: {{ value() ?? 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormExample {
    protected readonly billing = new FormControl<string | null>(null, Validators.required)
    protected readonly value = toSignal(this.billing.valueChanges, {initialValue: this.billing.value})
}
