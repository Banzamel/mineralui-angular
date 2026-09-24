import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInputCreditCard} from '@banzamel/mineralui-angular/inputs/input-credit-card'
import {MInputCVC} from '@banzamel/mineralui-angular/inputs/input-cvc'
import type {MCvcLength} from '@banzamel/mineralui-angular/inputs/input-cvc'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import type {CreditCardBrand} from '@banzamel/mineralui-angular/utils'

@Component({
    selector: 'app-input-credit-card-payment',
    imports: [MButton, MInline, MInputCreditCard, MInputCVC, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="payment" (ngSubmit)="submitted.set(true)">
            <m-stack align="start">
                <m-inline align="start">
                    <m-input-credit-card label="Card number" formControlName="card" (brandChange)="onBrand($event)" />
                    <m-input-cvc label="CVC" formControlName="cvc" [length]="cvcLength()" />
                </m-inline>
                <button mButton type="submit">Pay</button>
                <p mText size="sm" tone="muted">
                    Brand: {{ brand() }} · status: {{ status() }}{{ submitted() ? ' · submitted' : '' }}
                </p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCreditCardPaymentExample {
    protected readonly payment = new FormGroup({
        card: new FormControl('', {nonNullable: true, validators: Validators.required}),
        cvc: new FormControl('', {nonNullable: true, validators: Validators.required}),
    })
    protected readonly brand = signal<CreditCardBrand>('unknown')
    protected readonly cvcLength = signal<MCvcLength>(3)
    protected readonly submitted = signal(false)
    protected readonly status = toSignal(this.payment.statusChanges, {initialValue: this.payment.status})

    protected onBrand(brand: CreditCardBrand): void {
        this.brand.set(brand)
        // American Express prints a 4-digit CID; the CVC rule re-validates the control by itself.
        this.cvcLength.set(brand === 'amex' ? 4 : 3)
    }
}
