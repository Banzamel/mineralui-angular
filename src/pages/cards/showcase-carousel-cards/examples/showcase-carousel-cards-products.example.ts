import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {mExternalLinkIcon, mHeartIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MShowcaseCarousel} from '@banzamel/mineralui-angular/media/showcase-carousel'
import {MShowcaseCarouselItem} from '@banzamel/mineralui-angular/media/showcase-carousel-item'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const PHOTO = 'https://images.unsplash.com/photo-'

@Component({
    selector: 'app-showcase-carousel-cards-products',
    imports: [MBadge, MButton, MHeading, MIcon, MShowcaseCarousel, MShowcaseCarouselItem, MText],
    template: `
        <m-showcase-carousel ariaLabel="Featured products" [itemMaxWidth]="440">
            @for (product of products; track product.id) {
                <m-showcase-carousel-item [src]="product.src" [alt]="product.title" [mediaHeight]="220" interactive>
                    <button
                        mButton
                        mShowcaseItemOverlay
                        variant="ghost"
                        iconOnly
                        size="lg"
                        [attr.aria-label]="'Save ' + product.title"
                    >
                        <m-icon [icon]="heartIcon" />
                    </button>
                    <div class="app-showcase-card-top">
                        <m-badge size="sm">{{ product.tag }}</m-badge>
                        <span mText size="sm" tone="muted">{{ product.price }}</span>
                    </div>
                    <h4 mHeading>{{ product.title }}</h4>
                    <p mText size="sm" tone="muted">{{ product.text }}</p>
                    <button mButton mShowcaseItemFooter variant="ghost" size="sm">
                        Open<m-icon mEnd [icon]="openIcon" />
                    </button>
                </m-showcase-carousel-item>
            }
        </m-showcase-carousel>
    `,
    styles: `
        .app-showcase-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseCarouselCardsProductsExample {
    protected readonly heartIcon = mHeartIcon
    protected readonly openIcon = mExternalLinkIcon
    protected readonly products = [
        {
            id: 'studio-monitor',
            title: 'Studio Monitor',
            price: '$349',
            tag: 'Audio',
            src: `${PHOTO}1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80`,
            text: 'Balanced sound for editing, streaming and desk setups.',
        },
        {
            id: 'travel-camera',
            title: 'Travel Camera',
            price: '$899',
            tag: 'Photo',
            src: `${PHOTO}1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80`,
            text: 'Compact body with sharp glass and quick wireless transfer.',
        },
        {
            id: 'smart-lamp',
            title: 'Smart Lamp',
            price: '$129',
            tag: 'Home',
            src: `${PHOTO}1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80`,
            text: 'Warm ambient light with dimming scenes and timer presets.',
        },
    ]
}
