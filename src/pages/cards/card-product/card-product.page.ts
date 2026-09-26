import {ChangeDetectionStrategy, Component} from '@angular/core'
import cardProductShop from '@generated/examples/cards/card-product/card-product-shop'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-card-product-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MCardProduct"
            description="Product card with a gallery, rating, availability, price, a quantity stepper and an add-to-cart action."
        >
            <doc-section
                title="Shop"
                description="Bind [(quantity)] to read the stepper; (addToCart) carries the quantity. The gallery advances by itself with galleryAutoPlay."
            >
                <doc-preview [example]="examples.main" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The heading is an h3; images are decorative (the heading names the card). The rating is one image named "Rated 4.8 of 5, 126 reviews" (mineralui.serviceCard.rating). Gallery dots are buttons named "Image 2" with aria-current; autoplay stops under reduced motion. The favorite toggle has aria-pressed; the menu is a WAI-ARIA menu button. The stepper is a group named "Quantity" with Decrease / Increase buttons (Decrease is disabled at 1) and a polite live value.'
            />

            <doc-section
                title="Differences from MineralUI for React"
                description='onAddToCart becomes (addToCart) with the quantity; quantity + onQuantityChange become [(quantity)]; addToCartLabel is renamed actionLabel. title is renamed heading (ADR 0004); icon is the [mStart] slot. favorite + onFavorite become [(favorite)] (the heart shows when bound) and menuItems are plain data with (menuSelect) (ADR 0008). The action shows by default and hides with actionLabel set to null (React: only with a handler). Gallery images use an empty alt instead of repeating the title. The shared inputs come from MServiceCardBase (listed with "from").'
            />

            <doc-section title="MCardProduct API">
                <doc-props-table api="MCardProduct" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductPage {
    protected readonly examples = {main: cardProductShop}
}
