import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {mHeartIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MShowcaseCarousel} from '@banzamel/mineralui-angular/media/showcase-carousel'
import {MShowcaseCarouselItem} from '@banzamel/mineralui-angular/media/showcase-carousel-item'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import showcaseIllustrations from '@generated/examples/media/showcase-carousel/showcase-carousel-illustrations'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const UNSPLASH = 'https://images.unsplash.com/photo-'
const SIZE = '?auto=format&fit=crop&w=1200&q=80'
const SHOTS = [
    {
        src: `${UNSPLASH}1462331940025-496dfbfc7564${SIZE}`,
        title: 'Nebula cloud',
        note: 'Centered hero frame with soft side previews.',
    },
    {
        src: `${UNSPLASH}1502134249126-9f3755a50d78${SIZE}`,
        title: 'Night sky',
        note: 'Wheel and drag move the active panel.',
    },
    {
        src: `${UNSPLASH}1500530855697-b586d89ba3ee${SIZE}`,
        title: 'Cloud layer',
        note: 'Buttons keep the interaction explicit on desktop.',
    },
    {
        src: `${UNSPLASH}1504384308090-c894fdcc538d${SIZE}`,
        title: 'Star field',
        note: 'Works well for promos, galleries and featured cards.',
    },
] as const
const MODES = ['media', 'composed'] as const
const INDEXES = ['0', '1', '2', '3'] as const

@Component({
    selector: 'doc-showcase-carousel-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MBadge,
        MButton,
        MHeading,
        MIcon,
        MShowcaseCarousel,
        MShowcaseCarouselItem,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MShowcaseCarousel"
            description="Centered carousel with drag, wheel and partial side previews for editorial stories and featured media."
        >
            <doc-section
                title="Playground"
                description="Drag the slides, scroll with the mouse wheel over them, or use the buttons and ← / →. composed mode adds a corner action and a body to every slide."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-showcase-carousel
                        class="doc-showcase"
                        ariaLabel="Featured shots"
                        [initialIndex]="initialIndexValue()"
                        [showButtons]="showButtons()"
                        [loop]="loop()"
                        [dragScroll]="dragScroll()"
                        [wheel]="wheel()"
                        [itemMinWidth]="itemMinWidth()"
                        [itemMaxWidth]="itemMaxWidth()"
                        [itemWidthRatio]="itemWidthRatio()"
                    >
                        @for (shot of shots; track shot.src) {
                            @if (mode() === 'composed') {
                                <m-showcase-carousel-item
                                    [src]="shot.src"
                                    [alt]="shot.title"
                                    [mediaHeight]="mediaHeight()"
                                    [interactive]="interactive()"
                                    imageClickEffect="zoom-ripple"
                                >
                                    <button
                                        mButton
                                        mShowcaseItemOverlay
                                        variant="ghost"
                                        iconOnly
                                        size="lg"
                                        [attr.aria-label]="'Save ' + shot.title"
                                    >
                                        <m-icon [icon]="heartIcon" />
                                    </button>
                                    <m-stack align="start" spacing="xs">
                                        <m-badge size="sm" color="info">Featured shot</m-badge>
                                        <h4 mHeading>{{ shot.title }}</h4>
                                        <p mText tone="muted" size="sm">{{ shot.note }}</p>
                                    </m-stack>
                                </m-showcase-carousel-item>
                            } @else {
                                <m-showcase-carousel-item
                                    [src]="shot.src"
                                    [alt]="shot.title"
                                    [mediaHeight]="mediaHeight()"
                                    [interactive]="interactive()"
                                />
                            }
                        }
                    </m-showcase-carousel>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Own media"
                description="Leave src empty and put an illustration, a video or any element in the [mShowcaseItemMedia] slot; the footer slot takes actions."
            >
                <doc-preview [example]="examples.illustrations" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The host is a region with aria-roledescription 'carousel' and a name (ariaLabel or mineralui.carousel.label); every item is a group announced as 'slide, 3 of 4'. Only the centered slide is interactive — the side previews are inert, so Tab never lands on a dimmed card. ← / → move while focus is inside, the slides container is a polite live region, and the Previous / Next buttons are named 'Previous slide' / 'Next slide' (the visible word is part of the name)."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="items + renderItem (and the built-in image mode for items with src) are replaced by <m-showcase-carousel-item> children with @for. The item's media / overlay / body / footer props become slots ([mShowcaseItemMedia], [mShowcaseItemOverlay], default, [mShowcaseItemFooter]); imgProps becomes a loading input. draggable is renamed dragScroll (ADR 0004). The slide width and position are computed in CSS from the carousel width (container query units) instead of a ResizeObserver, so the first paint — also server-rendered — is already centered. New: slide roles, inert side slides, ← / → and ariaLabel."
            />

            <doc-section title="MShowcaseCarousel API">
                <doc-props-table api="MShowcaseCarousel" />
            </doc-section>

            <doc-section title="MShowcaseCarouselItem API">
                <doc-props-table api="MShowcaseCarouselItem" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-showcase {
            max-width: 900px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseCarouselPage {
    protected readonly examples = {illustrations: showcaseIllustrations}
    protected readonly shots = SHOTS
    protected readonly heartIcon = mHeartIcon

    protected readonly mode = signal<(typeof MODES)[number]>('media')
    protected readonly initialIndex = signal<(typeof INDEXES)[number]>('1')
    protected readonly showButtons = signal(true)
    protected readonly loop = signal(true)
    protected readonly dragScroll = signal(true)
    protected readonly wheel = signal(true)
    protected readonly itemMinWidth = signal(220)
    protected readonly itemMaxWidth = signal(520)
    protected readonly itemWidthRatio = signal(0.56)
    protected readonly mediaHeight = signal(240)
    protected readonly interactive = signal(true)
    protected readonly controls = [
        selectControl('mode', this.mode, MODES),
        selectControl('initialIndex', this.initialIndex, INDEXES),
        booleanControl('showButtons', this.showButtons),
        booleanControl('loop', this.loop),
        booleanControl('dragScroll', this.dragScroll),
        booleanControl('wheel', this.wheel),
        sliderControl('itemMinWidth', this.itemMinWidth, {min: 180, max: 320, step: 10}),
        sliderControl('itemMaxWidth', this.itemMaxWidth, {min: 360, max: 560, step: 10}),
        sliderControl('itemWidthRatio', this.itemWidthRatio, {min: 0.44, max: 0.8, step: 0.02}),
        sliderControl('mediaHeight', this.mediaHeight, {min: 180, max: 340, step: 10}),
        booleanControl('interactive', this.interactive),
    ]

    protected readonly initialIndexValue = computed(() => Number(this.initialIndex()))

    protected readonly code = computed(() => {
        const attrs = [
            'ariaLabel="Featured shots"',
            this.initialIndex() !== '1' ? `[initialIndex]="${this.initialIndex()}"` : '[initialIndex]="1"',
            !this.showButtons() && '[showButtons]="false"',
            !this.loop() && '[loop]="false"',
            !this.dragScroll() && '[dragScroll]="false"',
            !this.wheel() && '[wheel]="false"',
            this.itemMinWidth() !== 220 && `[itemMinWidth]="${this.itemMinWidth()}"`,
            this.itemMaxWidth() !== 520 && `[itemMaxWidth]="${this.itemMaxWidth()}"`,
            this.itemWidthRatio() !== 0.56 && `[itemWidthRatio]="${this.itemWidthRatio()}"`,
        ].filter((attr) => typeof attr === 'string')
        const itemAttrs = [
            '[src]="shot.src"',
            '[alt]="shot.title"',
            `[mediaHeight]="${this.mediaHeight()}"`,
            this.interactive() && 'interactive',
            this.mode() === 'composed' && 'imageClickEffect="zoom-ripple"',
        ].filter((attr) => typeof attr === 'string')
        const item =
            this.mode() === 'composed'
                ? `        <m-showcase-carousel-item ${itemAttrs.join(' ')}>
            <button mButton mShowcaseItemOverlay variant="ghost" iconOnly size="lg" aria-label="Save">
                <m-icon [icon]="heartIcon" />
            </button>
            <m-stack align="start" spacing="xs">
                <m-badge size="sm" color="info">Featured shot</m-badge>
                <h4 mHeading>{{ shot.title }}</h4>
                <p mText tone="muted" size="sm">{{ shot.note }}</p>
            </m-stack>
        </m-showcase-carousel-item>`
                : `        <m-showcase-carousel-item ${itemAttrs.join(' ')} />`
        return `<m-showcase-carousel ${attrs.join(' ')}>
    @for (shot of shots; track shot.src) {
${item}
    }
</m-showcase-carousel>`
    })
}
