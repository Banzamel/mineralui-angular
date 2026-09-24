import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MSkeleton} from '@banzamel/mineralui-angular/feedback/skeleton'
import type {MSkeletonVariant} from '@banzamel/mineralui-angular/feedback/skeleton'
import skeletonCard from '@generated/examples/feedback/skeleton/skeleton-card'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

type Animation = 'shimmer' | 'pulse' | 'none'

const VARIANTS: readonly MSkeletonVariant[] = ['text', 'circle', 'rectangle']
const ANIMATIONS: readonly Animation[] = ['shimmer', 'pulse', 'none']

@Component({
    selector: 'doc-skeleton-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MSkeleton],
    template: `
        <doc-article
            title="MSkeleton"
            description="Placeholder shapes shown while content loads: lines of text, a circle for an avatar, a rectangle for media."
        >
            <doc-section title="Playground" description="Toggle inputs to preview skeleton shapes.">
                <doc-playground [controls]="controls" [code]="code()">
                    <div class="doc-skeleton-demo">
                        <m-skeleton [variant]="variant()" [lines]="lines()" [animate]="animateInput()" />
                    </div>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Composing a placeholder"
                description="Combine shapes to mirror the layout that will appear. Skeletons are hidden from screen readers — say that the region is loading with aria-busy and a label."
            >
                <doc-preview [example]="examples.skeletonCard" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MSkeleton" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-skeleton-demo {
            width: min(100%, 360px);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPage {
    protected readonly examples = {skeletonCard}

    protected readonly variant = signal<MSkeletonVariant>('text')
    protected readonly lines = signal(3)
    protected readonly animation = signal<Animation>('shimmer')
    protected readonly animateInput = computed(() => {
        const animation = this.animation()
        return animation === 'none' ? false : animation
    })
    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        sliderControl('lines', this.lines, {min: 1, max: 6}),
        selectControl('animate', this.animation, ANIMATIONS),
    ]

    protected readonly code = computed(() => {
        const animation = this.animation()
        const attrs = [
            this.variant() !== 'text' ? ` variant="${this.variant()}"` : '',
            this.variant() === 'text' && this.lines() !== 3 ? ` [lines]="${this.lines()}"` : '',
            animation === 'pulse' ? ' animate="pulse"' : animation === 'none' ? ' [animate]="false"' : '',
        ].join('')
        return `<m-skeleton${attrs} />`
    })
}
