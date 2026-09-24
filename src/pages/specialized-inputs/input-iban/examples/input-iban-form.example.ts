import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInputIBAN} from '@banzamel/mineralui-angular/inputs/input-iban'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-iban-form',
    imports: [MButton, MInline, MInputIBAN, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-iban label="Payout account" [formControl]="iban" />
            <m-inline>
                <!-- A written IBAN with another country code switches the select. -->
                <button mButton size="sm" variant="outlined" (click)="iban.setValue('DE89370400440532013000')">
                    Load a German IBAN
                </button>
                <button mButton size="sm" variant="ghost" (click)="iban.reset()">Reset</button>
            </m-inline>
            <p mText size="sm" tone="muted">Control value: "{{ value() }}" · status: {{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputIbanFormExample {
    protected readonly iban = new FormControl('PL61109010140000071219812874', {
        nonNullable: true,
        validators: Validators.required,
    })
    protected readonly value = toSignal(this.iban.valueChanges, {initialValue: this.iban.value})
    protected readonly status = toSignal(this.iban.statusChanges, {initialValue: this.iban.status})
}
