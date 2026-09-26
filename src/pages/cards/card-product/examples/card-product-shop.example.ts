import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCardProduct} from '@banzamel/mineralui-angular/cards/card-product'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-card-product-shop',
    imports: [MCardProduct, MText],
    template: `
        <div class="app-card-grid">
            <m-card-product
                heading="Wireless headphones"
                description="Active noise cancellation with 30 h battery life."
                [price]="129"
                currency="USD"
                [available]="12"
                [rating]="4.4"
                [reviewCount]="318"
                [gallery]="gallery"
                galleryAutoPlay
                [(favorite)]="saved"
                [(quantity)]="quantity"
                (addToCart)="cart.set(cart() + $event)"
            />
            <m-card-product
                heading="Mechanical keyboard"
                description="Hot-swappable switches, per-key lighting."
                [price]="89"
                currency="USD"
                [available]="false"
                color="warning"
                image="https://picsum.photos/seed/product-keyboard/640/400"
            />
        </div>
        <p mText tone="muted" size="sm">Items in the cart: {{ cart() }} (stepper at {{ quantity() }}).</p>
    `,
    styles: `
        .app-card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--mineral-spacing-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductShopExample {
    protected readonly gallery = [1, 2, 3].map((index) => `https://picsum.photos/seed/product-audio-${index}/640/400`)
    protected readonly saved = signal(true)
    protected readonly quantity = signal(1)
    protected readonly cart = signal(0)
}
