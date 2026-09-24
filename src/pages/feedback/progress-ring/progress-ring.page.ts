import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MProgressRing} from '@banzamel/mineralui-angular/feedback/progress-ring'
import type {MProgressRingColor} from '@banzamel/mineralui-angular/feedback/progress-ring'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import progressRingUpload from '@generated/examples/feedback/progress-ring/progress-ring-upload'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MProgressRingColor[] = [
    'primary',
    'neutral',
    'success',
    'error',
    'warning',
    'info',
    'light',
    'dark',
    'news',
    'inherit',
]
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-progress-ring-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MProgressRing],
    template: `
        <doc-article
            title="MProgressRing"
            description="Determinate ring progress — 0–100 with an optional centered label. Same palette and size steps as MSpinner and MLoader; a number gives a custom diameter."
        >
            <doc-section title="Playground" description="Drag the value and toggle inputs to preview the ring.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-progress-ring
                        [value]="value()"
                        [size]="size()"
                        [color]="color()"
                        [showPercent]="showPercent()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Custom label"
                description="label replaces the percentage (null hides it). The ring is a progressbar named “Loading N%” by default; give it an ariaLabel that matches a custom label."
            >
                <doc-preview [example]="examples.progressRingUpload" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MProgressRing" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressRingPage {
    protected readonly examples = {progressRingUpload}

    protected readonly value = signal(64)
    protected readonly size = signal<MSize>('lg')
    protected readonly color = signal<MProgressRingColor>('primary')
    protected readonly showPercent = signal(true)
    protected readonly controls = [
        sliderControl('value', this.value, {min: 0, max: 100}),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('showPercent', this.showPercent),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            ` [value]="${this.value()}"`,
            this.size() !== 'md' ? ` size="${this.size()}"` : '',
            this.color() !== 'primary' ? ` color="${this.color()}"` : '',
            this.showPercent() ? '' : ' [showPercent]="false"',
        ].join('')
        return `<m-progress-ring${attrs} />`
    })
}
