import {ChangeDetectionStrategy, Component} from '@angular/core'
import showcaseCarouselCardsProducts from '@generated/examples/cards/showcase-carousel-cards/showcase-carousel-cards-products'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-showcase-carousel-cards-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="Showcase Carousel Cards"
            description="Product cards in a centered carousel: MShowcaseCarouselItem with a save button, body content and a footer action."
        >
            <doc-section
                title="Featured products"
                description="Only the centered card is interactive; the side previews are inert. Drag, scroll or use the buttons to bring another card to the center."
            >
                <doc-preview [example]="examples.products" />
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description="items + renderItem become @for inside m-showcase-carousel, and overlay / body / footer become the [mShowcaseItemOverlay], default and [mShowcaseItemFooter] slots — see Showcase Carousel for the details."
            />

            <doc-section title="MShowcaseCarouselItem API">
                <doc-props-table api="MShowcaseCarouselItem" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseCarouselCardsPage {
    protected readonly examples = {products: showcaseCarouselCardsProducts}
}
