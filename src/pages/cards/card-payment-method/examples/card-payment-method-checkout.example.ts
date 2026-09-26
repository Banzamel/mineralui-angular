import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MCardPaymentMethod} from '@banzamel/mineralui-angular/cards/card-payment-method'
import {MInputCVC} from '@banzamel/mineralui-angular/inputs/input-cvc'
import {MInputExpDate} from '@banzamel/mineralui-angular/inputs/input-exp-date'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-card-payment-method-checkout',
    imports: [MCardPaymentMethod, MInputCVC, MInputExpDate, MText, ReactiveFormsModule],
    template: `
        <m-card-payment-method
            class="app-payment-method"
            brand="visa"
            last4="4242"
            expiry="08/2028"
            [formGroup]="form"
            (action)="changes.set(changes() + 1)"
        >
            <m-input-exp-date mCardPaymentExpiry label="Expiration date" formControlName="expiry" clearable fullWidth />
            <m-input-cvc mCardPaymentCvc label="Security code" formControlName="cvc" fullWidth />
        </m-card-payment-method>
        <p mText tone="muted" size="sm">Form {{ status() }} · "Change" pressed {{ changes() }} times.</p>
    `,
    styles: `
        .app-payment-method {
            max-width: 520px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPaymentMethodCheckoutExample {
    protected readonly form = new FormGroup({
        expiry: new FormControl<string | null>('08/2028', Validators.required),
        cvc: new FormControl('', Validators.required),
    })
    protected readonly status = toSignal(this.form.statusChanges, {initialValue: this.form.status})
    protected readonly changes = signal(0)
}
