import {ChangeDetectionStrategy, Component} from '@angular/core'
import cardOfferSpa from '@generated/examples/cards/card-offer/card-offer-spa'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-card-offer-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MCardOffer"
            description="Service offer card with a gallery, rating, host, duration and availability badges, price and a booking action."
        >
            <doc-section
                title="Service offers"
                description="The first card shows a gallery with dots, a bound favorite and a menu; the second a spot count and its own action label."
            >
                <doc-preview [example]="examples.main" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The heading is an h3; images are decorative (the heading names the card). The rating is one image named "Rated 4.8 of 5, 126 reviews" (mineralui.serviceCard.rating). Gallery dots are buttons named "Image 2" with aria-current; autoplay stops under reduced motion. The favorite toggle has aria-pressed; the menu is a WAI-ARIA menu button.'
            />

            <doc-section
                title="Differences from MineralUI for React"
                description='onAction becomes the (action) output. title is renamed heading (ADR 0004); icon is the [mStart] slot. favorite + onFavorite become [(favorite)] (the heart shows when bound) and menuItems are plain data with (menuSelect) (ADR 0008). The action shows by default and hides with actionLabel set to null (React: only with a handler). Gallery images use an empty alt instead of repeating the title. The shared inputs come from MServiceCardBase (listed with "from").'
            />

            <doc-section title="MCardOffer API">
                <doc-props-table api="MCardOffer" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardOfferPage {
    protected readonly examples = {main: cardOfferSpa}
}
