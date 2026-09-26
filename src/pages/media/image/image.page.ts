import {ChangeDetectionStrategy, Component, computed, effect, signal, untracked} from '@angular/core'
import {MImage} from '@banzamel/mineralui-angular/media/image'
import type {MImageFit, MImageRatio, MMediaHoverEffect} from '@banzamel/mineralui-angular/media/image'
import type {MClickEffectMode} from '@banzamel/mineralui-angular/utils'
import imageFallback from '@generated/examples/media/image/image-fallback'
import imagePreviewGroup from '@generated/examples/media/image/image-preview-group'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const FITS: readonly MImageFit[] = ['cover', 'contain', 'fill', 'none']
const RATIOS: readonly MImageRatio[] = ['auto', '1:1', '4:3', '16:9', '21:9']
const SIZES = ['auto', '120px', '240px', '360px', '100%'] as const
const HOVER: readonly MMediaHoverEffect[] = ['none', 'zoom', 'dim', 'zoom-dim']
const CLICK: readonly MClickEffectMode[] = ['none', 'ripple']

@Component({
    selector: 'doc-image-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MImage],
    template: `
        <doc-article
            title="MImage"
            description="Frame for your own <img>: aspect ratio, fit modes, a lightbox preview with grouped navigation, and separate hover or click feedback."
        >
            <doc-section
                title="Playground"
                description="Switching skeleton on loads a fresh image, so the placeholder is visible until it arrives."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-image
                        [fit]="fit()"
                        [ratio]="ratio()"
                        [width]="sizeValue(width())"
                        [height]="sizeValue(height())"
                        [rounded]="rounded()"
                        [bordered]="bordered()"
                        [shadow]="shadow()"
                        [preview]="preview()"
                        [hoverEffect]="hoverEffect()"
                        [clickEffect]="clickEffect()"
                        [skeleton]="skeleton()"
                    >
                        <img [src]="src()" alt="Editorial landscape" title="Picsum sample" />
                    </m-image>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Preview group"
                description="Images that share a previewGroup open one lightbox and are browsed with the arrows or ← / →, in page order."
            >
                <doc-preview [example]="examples.group" />
            </doc-section>

            <doc-section
                title="Fallback and loading placeholder"
                description="fallback replaces a src that fails to load (once — a failing fallback does not loop). skeleton covers the image with a pulsing placeholder until it has loaded."
            >
                <doc-preview [example]="examples.fallback" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The <img> is yours, so its alt is the text alternative. With preview, the image sits in a button named 'Preview <alt>' (mineralui.mediaLightbox.open). The preview is a modal dialog named by the image: focus moves in and returns to the button on close, Escape or a click beside the image closes it, ← / → move through the group, and the '2 / 5' counter is a polite live region. When an arrow button reaches the end of the group, its focus moves to the other one."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="MImage wraps your <img> instead of taking its attributes, so srcset, loading and NgOptimizedImage work as usual; the preview reads src, alt and title (the caption) from it. The host is always the frame (React rendered a bare <img> without ratio, size, preview or effects). skeleton now shows until the image loads instead of replacing it. The group order follows the page, not mount order. hidden becomes hiddenUpTo / hiddenAbove. The ripple is visible above the image (in React it stayed under it), and the preview arrows sit over the image edges."
            />

            <doc-section title="MImage API">
                <doc-props-table api="MImage" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePage {
    protected readonly examples = {group: imagePreviewGroup, fallback: imageFallback}

    protected readonly fit = signal<MImageFit>('cover')
    protected readonly ratio = signal<MImageRatio>('16:9')
    protected readonly width = signal<(typeof SIZES)[number]>('auto')
    protected readonly height = signal<(typeof SIZES)[number]>('auto')
    protected readonly hoverEffect = signal<MMediaHoverEffect>('zoom-dim')
    protected readonly clickEffect = signal<MClickEffectMode>('none')
    protected readonly rounded = signal(true)
    protected readonly bordered = signal(false)
    protected readonly shadow = signal(true)
    protected readonly preview = signal(true)
    protected readonly skeleton = signal(false)
    protected readonly controls = [
        selectControl('fit', this.fit, FITS),
        selectControl('ratio', this.ratio, RATIOS),
        selectControl('width', this.width, SIZES),
        selectControl('height', this.height, SIZES),
        selectControl('hoverEffect', this.hoverEffect, HOVER),
        selectControl('clickEffect', this.clickEffect, CLICK),
        booleanControl('rounded', this.rounded),
        booleanControl('bordered', this.bordered),
        booleanControl('shadow', this.shadow),
        booleanControl('preview', this.preview),
        booleanControl('skeleton', this.skeleton),
    ]

    // A new seed each time skeleton turns on: a fresh download to wait for.
    private readonly reloads = signal(0)
    protected readonly src = computed(() => {
        const reload = this.reloads()
        return `https://picsum.photos/seed/media-image${reload > 0 ? `-${reload}` : ''}/900/540`
    })

    constructor() {
        effect(() => {
            if (this.skeleton()) untracked(() => this.reloads.update((count) => count + 1))
        })
    }

    protected sizeValue(size: (typeof SIZES)[number]): string | undefined {
        return size === 'auto' ? undefined : size
    }

    protected readonly code = computed(() => {
        const attrs = [
            this.fit() !== 'cover' && `fit="${this.fit()}"`,
            this.ratio() !== 'auto' && `ratio="${this.ratio()}"`,
            this.width() !== 'auto' && `width="${this.width()}"`,
            this.height() !== 'auto' && `height="${this.height()}"`,
            this.rounded() && 'rounded',
            this.bordered() && 'bordered',
            this.shadow() && 'shadow',
            this.preview() && 'preview',
            this.hoverEffect() !== 'none' && `hoverEffect="${this.hoverEffect()}"`,
            this.clickEffect() !== 'none' && `clickEffect="${this.clickEffect()}"`,
            this.skeleton() && 'skeleton',
        ].filter((attr) => typeof attr === 'string')
        const open = attrs.length > 0 ? `<m-image ${attrs.join(' ')}>` : '<m-image>'
        return `${open}
    <img src="https://picsum.photos/seed/media-image/900/540" alt="Editorial landscape" />
</m-image>`
    })
}
