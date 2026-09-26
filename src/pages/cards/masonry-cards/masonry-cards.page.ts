import {ChangeDetectionStrategy, Component} from '@angular/core'
import masonryCardsProducts from '@generated/examples/cards/masonry-cards/masonry-cards-products'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-masonry-cards-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="Masonry Cards"
            description="Product cards on a masonry wall: MMasonryItem with a save button over the image, body content and a footer line."
        >
            <doc-section
                title="Product wall"
                description="Uneven image heights and text lengths pack into columns; each card stays whole. The heart sits beside the image area, so pressing it does not ripple the photo."
            >
                <doc-preview [example]="examples.products" />
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description="items + renderItem become @for inside m-masonry, and overlay / body / footer become the [mMasonryItemOverlay], default and [mMasonryItemFooter] slots — see Masonry for the details."
            />

            <doc-section title="MMasonryItem API">
                <doc-props-table api="MMasonryItem" />
            </doc-section>

            <doc-section title="MMasonry API">
                <doc-props-table api="MMasonry" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryCardsPage {
    protected readonly examples = {products: masonryCardsProducts}
}
