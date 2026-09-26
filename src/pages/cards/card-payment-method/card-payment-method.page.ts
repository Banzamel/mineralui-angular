import {ChangeDetectionStrategy, Component} from '@angular/core'
import cardPaymentMethodCheckout from '@generated/examples/cards/card-payment-method/card-payment-method-checkout'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-card-payment-method-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MCardPaymentMethod"
            description="Checkout block with the saved payment method, a change action and slots for your own expiry and security-code fields."
        >
            <doc-section
                title="Checkout"
                description="The fields are yours: bind them to your form (here a FormGroup on the card host) and they validate like any other field. Without actionHref, the change action is a button reporting (action)."
            >
                <doc-preview [example]="examples.checkout" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The saved card is read as 'Card ending in 4242' (mineralui.cardPayment.ending). The change action is a real link (actionHref) or button. Field labels, errors and hints come from the projected fields."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="expiryProps / cvcProps / expiryLabel / cvcLabel are replaced by the [mCardPaymentExpiry] and [mCardPaymentCvc] slots — you project your own m-input-exp-date / m-input-cvc (ADR 0016). The summary is built from the new expiry input instead of the field value. onAction becomes the (action) output; actionHref makes a link. title is renamed heading (ADR 0004); brandIcon is the [mCardPaymentMethodBrand] slot. badgeLabel, summary and helperText hide with null."
            />

            <doc-section title="MCardPaymentMethod API">
                <doc-props-table api="MCardPaymentMethod" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPaymentMethodPage {
    protected readonly examples = {checkout: cardPaymentMethodCheckout}
}
