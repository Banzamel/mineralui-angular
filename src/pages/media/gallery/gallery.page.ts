import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MGallery} from '@banzamel/mineralui-angular/media/gallery'
import type {MGalleryColumns, MGalleryItem} from '@banzamel/mineralui-angular/media/gallery'
import type {MMediaHoverEffect} from '@banzamel/mineralui-angular/media/image'
import type {MClickEffectMode} from '@banzamel/mineralui-angular/utils'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLUMNS = ['2', '3', '4', '5', '6'] as const
const HOVER: readonly MMediaHoverEffect[] = ['none', 'zoom', 'dim', 'zoom-dim']
const CLICK: readonly MClickEffectMode[] = ['ripple', 'none']

const PHOTOS: readonly MGalleryItem[] = [
    {src: 'https://picsum.photos/seed/a/900/900', thumbnail: 'https://picsum.photos/seed/a/300/300', alt: 'Image 1'},
    {
        src: 'https://picsum.photos/seed/b/900/900',
        thumbnail: 'https://picsum.photos/seed/b/300/300',
        alt: 'Image 2',
        caption: 'With caption',
    },
    {src: 'https://picsum.photos/seed/c/900/900', thumbnail: 'https://picsum.photos/seed/c/300/300', alt: 'Image 3'},
    {src: 'https://picsum.photos/seed/d/900/900', thumbnail: 'https://picsum.photos/seed/d/300/300', alt: 'Image 4'},
    {src: 'https://picsum.photos/seed/e/900/900', thumbnail: 'https://picsum.photos/seed/e/300/300', alt: 'Image 5'},
    {src: 'https://picsum.photos/seed/f/900/900', thumbnail: 'https://picsum.photos/seed/f/300/300', alt: 'Image 6'},
]

@Component({
    selector: 'doc-gallery-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MGallery],
    template: `
        <doc-article
            title="MGallery"
            description="Responsive image grid with configurable columns, a shared lightbox preview with arrow navigation, and hover or click feedback on every tile."
        >
            <doc-section
                title="Playground"
                description="Tune density, captions, hover treatment and preview mode. The grid shows the thumbnails; the preview loads the full images."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-gallery
                        [items]="items()"
                        [columns]="columnCount()"
                        [rounded]="rounded()"
                        [preview]="preview()"
                        [hoverEffect]="hoverEffect()"
                        [clickEffect]="clickEffect()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Every tile is a <figure> with the image's alt text and a <figcaption>. With preview, the tile is a button named 'Preview <alt>'; the preview is a modal dialog with the whole gallery: ← / → or the arrow buttons move through it, the counter is a polite live region, Escape or a click beside the image closes it and focus returns to the tile."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="The caption is a <figcaption> beside the tile (React: a span inside the button, read as part of its name). The ripple shows above the image (React left it under the image, invisible), and columns use minmax(0, 1fr), so long captions cannot widen a column."
            />

            <doc-section title="MGallery API">
                <doc-props-table api="MGallery" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPage {
    protected readonly columns = signal<(typeof COLUMNS)[number]>('3')
    protected readonly hoverEffect = signal<MMediaHoverEffect>('zoom')
    protected readonly clickEffect = signal<MClickEffectMode>('ripple')
    protected readonly rounded = signal(true)
    protected readonly preview = signal(true)
    protected readonly captions = signal(true)
    protected readonly controls = [
        selectControl('columns', this.columns, COLUMNS),
        selectControl('hoverEffect', this.hoverEffect, HOVER),
        selectControl('clickEffect', this.clickEffect, CLICK),
        booleanControl('rounded', this.rounded),
        booleanControl('preview', this.preview),
        booleanControl('captions', this.captions),
    ]

    protected readonly columnCount = computed((): MGalleryColumns => {
        const count = Number(this.columns())
        return count === 2 || count === 4 || count === 5 || count === 6 ? count : 3
    })
    protected readonly items = computed(() =>
        this.captions() ? PHOTOS : PHOTOS.map(({src, thumbnail, alt}) => ({src, thumbnail, alt}))
    )

    protected readonly code = computed(() => {
        const attrs = [
            '[items]="photos"',
            this.columns() !== '3' && `[columns]="${this.columns()}"`,
            !this.rounded() && '[rounded]="false"',
            this.preview() && 'preview',
            this.hoverEffect() !== 'zoom' && `hoverEffect="${this.hoverEffect()}"`,
            this.clickEffect() !== 'ripple' && `clickEffect="${this.clickEffect()}"`,
        ].filter((attr) => typeof attr === 'string')
        const caption = this.captions() ? `, caption: 'With caption'` : ''
        return `photos: MGalleryItem[] = [
    {src: '/photos/a.jpg', thumbnail: '/photos/a-small.jpg', alt: 'Image 1'},
    {src: '/photos/b.jpg', thumbnail: '/photos/b-small.jpg', alt: 'Image 2'${caption}},
]

<m-gallery ${attrs.join(' ')} />`
    })
}
