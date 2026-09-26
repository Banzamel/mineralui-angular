import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCard, MCardBody, MCardFooter} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCarousel, MCarouselSlide} from '@banzamel/mineralui-angular/media/carousel'
import type {MCarouselTransition} from '@banzamel/mineralui-angular/media/carousel'
import {MImage} from '@banzamel/mineralui-angular/media/image'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MSubText} from '@banzamel/mineralui-angular/typography/sub-text'
import carouselHero from '@generated/examples/media/carousel/carousel-hero'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const PRODUCTS: readonly {
    image: string
    badge: string
    badgeColor: MColor
    title: string
    description: string
    price: string
}[] = [
    {
        image: 'https://picsum.photos/seed/prod1/600/300',
        badge: 'New',
        badgeColor: 'success',
        title: 'Wireless Headphones',
        description: 'Active noise cancellation with 30h battery life.',
        price: '$129',
    },
    {
        image: 'https://picsum.photos/seed/prod2/600/300',
        badge: 'Sale',
        badgeColor: 'error',
        title: 'Mechanical Keyboard',
        description: 'Hot-swappable switches, RGB per-key lighting.',
        price: '$89',
    },
    {
        image: 'https://picsum.photos/seed/prod3/600/300',
        badge: 'Popular',
        badgeColor: 'warning',
        title: '4K Monitor 27"',
        description: 'IPS panel, USB-C power delivery, 60W charge.',
        price: '$349',
    },
]
const GALLERY = [1, 2, 3].map((index) => ({
    src: `https://picsum.photos/seed/g${index}/900/520`,
    alt: `Gallery slide ${index}`,
}))
const PRESETS = ['cards', 'gallery'] as const
const TRANSITIONS: readonly MCarouselTransition[] = ['slide', 'fade']

@Component({
    selector: 'doc-carousel-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MBadge,
        MButton,
        MCard,
        MCardBody,
        MCardFooter,
        MCarousel,
        MCarouselSlide,
        MHeading,
        MImage,
        MInline,
        MStack,
        MSubText,
    ],
    template: `
        <doc-article
            title="MCarousel"
            description="Swipeable content slider with drag support, fade or slide transitions and touch-friendly navigation."
        >
            <doc-section
                title="Playground"
                description="Switch between product cards and a gallery while testing autoplay, controls and the transition. Drag a slide, or focus the carousel and use ← / →."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-carousel
                        [class]="preset() === 'cards' ? 'doc-carousel-cards' : 'doc-carousel-gallery'"
                        [ariaLabel]="preset() === 'cards' ? 'Featured products' : 'Gallery'"
                        [transition]="transition()"
                        [autoPlay]="autoPlay()"
                        [interval]="interval()"
                        [showDots]="showDots()"
                        [showArrows]="showArrows()"
                        [loop]="loop()"
                        [dragScroll]="dragScroll()"
                    >
                        @if (preset() === 'cards') {
                            @for (product of products; track product.title) {
                                <m-carousel-slide>
                                    <m-card>
                                        <m-image ratio="16:9">
                                            <img [src]="product.image" [alt]="product.title" />
                                        </m-image>
                                        <m-card-body>
                                            <m-stack align="start">
                                                <m-badge size="sm" [color]="product.badgeColor">{{
                                                    product.badge
                                                }}</m-badge>
                                                <h4 mHeading>{{ product.title }}</h4>
                                                <p mSubText>{{ product.description }}</p>
                                            </m-stack>
                                        </m-card-body>
                                        <m-card-footer>
                                            <m-inline justify="between">
                                                <h4 mHeading>{{ product.price }}</h4>
                                                <button mButton size="sm">Add to cart</button>
                                            </m-inline>
                                        </m-card-footer>
                                    </m-card>
                                </m-carousel-slide>
                            }
                        } @else {
                            @for (slide of gallery; track slide.src) {
                                <m-carousel-slide>
                                    <m-image ratio="16:9" class="doc-carousel-image">
                                        <img [src]="slide.src" [alt]="slide.alt" />
                                    </m-image>
                                </m-carousel-slide>
                            }
                        }
                    </m-carousel>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Autoplay banner"
                description="autoPlay adds a stop / start button in the corner. Rotation pauses while the pointer is over the carousel or focus is inside it, and starts stopped for users who prefer reduced motion."
            >
                <doc-preview [example]="examples.hero" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Follows the WAI-ARIA APG Carousel: the host is a region with aria-roledescription 'carousel' and a name (ariaLabel or mineralui.carousel.label); each slide is a group announced as 'slide, 2 of 3', and hidden slides are inert. ← / → change the slide while focus is inside. The slides container is a polite live region, switched off while autoplay rotates. Arrows, dots and the rotation button are named buttons (mineralui.carousel.*); the current dot has aria-current."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Slides are <m-carousel-slide> children (React wrapped every child itself). draggable is renamed dragScroll (ADR 0004), and a drag never starts from a link or a button inside a slide. New: [(activeIndex)], ariaLabel, the stop / start button with pause on hover and focus (WCAG 2.2.2), ← / →, slide roles and inert hidden slides — React had no carousel semantics, no pause and no keyboard support."
            />

            <doc-section title="MCarousel API">
                <doc-props-table api="MCarousel" />
            </doc-section>

            <doc-section title="MCarouselSlide API">
                <doc-props-table api="MCarouselSlide" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-carousel-cards {
            max-width: 440px;
        }

        .doc-carousel-gallery {
            max-width: 560px;
        }

        .doc-carousel-image {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselPage {
    protected readonly examples = {hero: carouselHero}
    protected readonly products = PRODUCTS
    protected readonly gallery = GALLERY

    protected readonly preset = signal<(typeof PRESETS)[number]>('cards')
    protected readonly transition = signal<MCarouselTransition>('slide')
    protected readonly autoPlay = signal(false)
    protected readonly showDots = signal(true)
    protected readonly showArrows = signal(true)
    protected readonly loop = signal(true)
    protected readonly dragScroll = signal(true)
    protected readonly interval = signal(5000)
    protected readonly controls = [
        selectControl('preset', this.preset, PRESETS),
        selectControl('transition', this.transition, TRANSITIONS),
        booleanControl('autoPlay', this.autoPlay),
        booleanControl('showDots', this.showDots),
        booleanControl('showArrows', this.showArrows),
        booleanControl('loop', this.loop),
        booleanControl('dragScroll', this.dragScroll),
        sliderControl('interval', this.interval, {min: 2000, max: 7000, step: 500}),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            `ariaLabel="${this.preset() === 'cards' ? 'Featured products' : 'Gallery'}"`,
            this.transition() !== 'slide' && `transition="${this.transition()}"`,
            this.autoPlay() && 'autoPlay',
            this.interval() !== 5000 && `[interval]="${this.interval()}"`,
            !this.showDots() && '[showDots]="false"',
            !this.showArrows() && '[showArrows]="false"',
            !this.loop() && '[loop]="false"',
            !this.dragScroll() && '[dragScroll]="false"',
        ].filter((attr) => typeof attr === 'string')
        const slide =
            this.preset() === 'cards'
                ? `    @for (product of products; track product.title) {
        <m-carousel-slide>
            <m-card>
                <m-image ratio="16:9"><img [src]="product.image" [alt]="product.title" /></m-image>
                <m-card-body>…</m-card-body>
            </m-card>
        </m-carousel-slide>
    }`
                : `    @for (slide of slides; track slide.src) {
        <m-carousel-slide>
            <m-image ratio="16:9"><img [src]="slide.src" [alt]="slide.alt" /></m-image>
        </m-carousel-slide>
    }`
        return `<m-carousel ${attrs.join(' ')}>
${slide}
</m-carousel>`
    })
}
