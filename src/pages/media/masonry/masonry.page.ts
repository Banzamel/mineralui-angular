import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {mHeartIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MMasonry} from '@banzamel/mineralui-angular/media/masonry'
import {MMasonryItem} from '@banzamel/mineralui-angular/media/masonry-item'
import type {MMediaInteractionEffect} from '@banzamel/mineralui-angular/media/masonry-item'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import masonryMixed from '@generated/examples/media/masonry/masonry-mixed'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {SAMPLE_LANDSCAPES} from '../media-samples'

const EFFECTS: readonly MMediaInteractionEffect[] = ['zoom-ripple', 'zoom', 'dim', 'ripple', 'none']

@Component({
    selector: 'doc-masonry-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MHeading,
        MIcon,
        MMasonry,
        MMasonryItem,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MMasonry"
            description="Responsive masonry wall for uneven images, promos and discovery cards with different heights."
        >
            <doc-section
                title="Playground"
                description="Adjust the number of columns and enrich each tile with an overlay action or body content."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-masonry [columns]="columns()">
                        @for (photo of photos; track photo.src) {
                            <m-masonry-item
                                [src]="photo.src"
                                [alt]="photo.alt"
                                [interactive]="interactive()"
                                [imageClickEffect]="imageClickEffect()"
                            >
                                @if (showOverlay()) {
                                    <button
                                        mButton
                                        mMasonryItemOverlay
                                        variant="ghost"
                                        iconOnly
                                        size="lg"
                                        [attr.aria-label]="'Save ' + photo.alt"
                                    >
                                        <m-icon [icon]="heartIcon" />
                                    </button>
                                }
                                @if (showBody()) {
                                    <m-stack spacing="xs">
                                        <h5 mHeading>{{ photo.alt }}</h5>
                                        <p mText tone="muted" size="sm">
                                            Uneven card height works well for discovery walls and moodboards.
                                        </p>
                                    </m-stack>
                                }
                            </m-masonry-item>
                        }
                    </m-masonry>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Mixed content"
                description="MMasonry takes any blocks — cards, quotes, images — and keeps each one whole inside a column. m-masonry-item is only the ready-made image card."
            >
                <doc-preview [example]="examples.mixed" />
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description="items + renderItem are replaced by content projection with @for, and the wall does not wrap each child in a div — the children are the column items. MMasonryItem takes the overlay, body and footer as slots ([mMasonryItemOverlay], default, [mMasonryItemFooter]) instead of ReactNode props; imgProps is gone — loading is an input (lazy by default). The overlay sits outside the image area, so pressing it does not ripple the image, and the ripple shows above the image (React left it underneath)."
            />

            <doc-section title="MMasonry API">
                <doc-props-table api="MMasonry" />
            </doc-section>

            <doc-section title="MMasonryItem API">
                <doc-props-table api="MMasonryItem" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryPage {
    protected readonly examples = {mixed: masonryMixed}
    protected readonly photos = SAMPLE_LANDSCAPES
    protected readonly heartIcon = mHeartIcon

    protected readonly columns = signal(3)
    protected readonly imageClickEffect = signal<MMediaInteractionEffect>('zoom-ripple')
    protected readonly interactive = signal(true)
    protected readonly showOverlay = signal(true)
    protected readonly showBody = signal(false)
    protected readonly controls = [
        sliderControl('columns', this.columns, {min: 2, max: 6}),
        selectControl('imageClickEffect', this.imageClickEffect, EFFECTS),
        booleanControl('interactive', this.interactive),
        booleanControl('showOverlay', this.showOverlay),
        booleanControl('showBody', this.showBody),
    ]

    protected readonly code = computed(() => {
        const itemAttrs = [
            '[src]="photo.src"',
            '[alt]="photo.alt"',
            this.interactive() && 'interactive',
            this.imageClickEffect() !== 'none' && `imageClickEffect="${this.imageClickEffect()}"`,
        ].filter((attr) => typeof attr === 'string')
        const content = [
            this.showOverlay() &&
                `        <button mButton mMasonryItemOverlay variant="ghost" iconOnly size="lg" aria-label="Save image">
            <m-icon [icon]="heartIcon" />
        </button>`,
            this.showBody() &&
                `        <m-stack spacing="xs">
            <h5 mHeading>{{ photo.alt }}</h5>
            <p mText tone="muted" size="sm">Uneven card height works well for moodboards.</p>
        </m-stack>`,
        ].filter((part) => typeof part === 'string')
        const open = this.columns() !== 3 ? `<m-masonry [columns]="${this.columns()}">` : '<m-masonry>'
        const item =
            content.length > 0
                ? `    <m-masonry-item ${itemAttrs.join(' ')}>\n${content.join('\n')}\n    </m-masonry-item>`
                : `    <m-masonry-item ${itemAttrs.join(' ')} />`
        return `${open}
    @for (photo of photos; track photo.src) {
${item.replace(/^/gm, '    ')}
    }
</m-masonry>`
    })
}
