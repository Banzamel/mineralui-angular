import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {mHeartIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MMasonry} from '@banzamel/mineralui-angular/media/masonry'
import {MMasonryItem} from '@banzamel/mineralui-angular/media/masonry-item'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const PHOTO = 'https://images.unsplash.com/photo-'

@Component({
    selector: 'app-masonry-cards-products',
    imports: [MBadge, MButton, MHeading, MIcon, MMasonry, MMasonryItem, MText],
    template: `
        <m-masonry [columns]="3">
            @for (card of cards; track card.id) {
                <m-masonry-item [src]="card.image" [alt]="card.title" interactive imageClickEffect="zoom-ripple">
                    <button
                        mButton
                        mMasonryItemOverlay
                        variant="ghost"
                        iconOnly
                        size="lg"
                        [attr.aria-label]="'Save ' + card.title"
                    >
                        <m-icon [icon]="heartIcon" />
                    </button>
                    <div class="app-masonry-card-top">
                        <m-badge size="sm">{{ card.tag }}</m-badge>
                        <span mText size="sm" tone="muted">{{ card.price }}</span>
                    </div>
                    <h4 mHeading>{{ card.title }}</h4>
                    <p mText size="sm" tone="muted">{{ card.text }}</p>
                    <span mText size="sm" mMasonryItemFooter>{{ card.tone }}</span>
                </m-masonry-item>
            }
        </m-masonry>
    `,
    styles: `
        .app-masonry-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryCardsProductsExample {
    protected readonly heartIcon = mHeartIcon
    protected readonly cards = [
        {
            id: 'starter-set',
            title: 'Starter Set',
            tag: 'Bundle',
            price: '$79',
            text: 'Compact starter pack with the essentials for a new workspace.',
            image: `${PHOTO}1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&h=620&q=80`,
            tone: 'Small kit',
        },
        {
            id: 'studio-desk',
            title: 'Studio Desk',
            tag: 'Furniture',
            price: '$499',
            text: 'Wide top, hidden cable tray and enough depth for a monitor arm.',
            image: `${PHOTO}1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&h=1180&q=80`,
            tone: 'Deep setup',
        },
        {
            id: 'wire-set',
            title: 'Wire Set',
            tag: 'Accessory',
            price: '$39',
            text: 'Braided USB-C and HDMI set for desks, hubs and travel kits.',
            image: `${PHOTO}1518770660439-4636190af475?auto=format&fit=crop&w=900&h=520&q=80`,
            tone: 'Quick add-on',
        },
        {
            id: 'focus-lamp',
            title: 'Focus Lamp',
            tag: 'Lighting',
            price: '$119',
            text: 'Directional task light with a warmer evening mode.',
            image: `${PHOTO}1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&h=940&q=80`,
            tone: 'Desk lighting',
        },
        {
            id: 'acoustic-panels',
            title: 'Acoustic Panels',
            tag: 'Studio',
            price: '$189',
            text: 'Wall-ready soft panels that reduce bounce in call spaces.',
            image: `${PHOTO}1497366754035-f200968a6e72?auto=format&fit=crop&w=900&h=760&q=80`,
            tone: 'Room upgrade',
        },
        {
            id: 'travel-dock',
            title: 'Travel Dock',
            tag: 'Mobile',
            price: '$89',
            text: 'Slim hub for switching between desk mode and a mobile setup.',
            image: `${PHOTO}1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=900&h=560&q=80`,
            tone: 'Bag ready',
        },
    ]
}
