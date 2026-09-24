import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MLoader} from '@banzamel/mineralui-angular/feedback/loader'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import loaderSection from '@generated/examples/feedback/loader/loader-section'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-loader-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MLoader],
    template: `
        <doc-article
            title="MLoader"
            description="Spinner with a caption, centered in the available space — the loading state of a page or a section, without card or alert chrome."
        >
            <doc-section title="Playground" description="Toggle inputs to preview loader combinations.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-loader [color]="color()" [size]="size()" [center]="center()" [minHeight]="160" />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Loading a section"
                description="The loader is a live status whose text is the caption (the spinner inside is hidden from screen readers). Mark the region itself with aria-busy while it loads."
            >
                <doc-preview [example]="examples.loaderSection" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MLoader" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderPage {
    protected readonly examples = {loaderSection}

    protected readonly color = signal<MColor>('primary')
    protected readonly size = signal<MSize>('lg')
    protected readonly center = signal(true)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        selectControl('size', this.size, SIZES),
        booleanControl('center', this.center),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.color() !== 'primary' ? ` color="${this.color()}"` : '',
            this.size() !== 'lg' ? ` size="${this.size()}"` : '',
            this.center() ? '' : ' [center]="false"',
            ' [minHeight]="160"',
        ].join('')
        return `<m-loader${attrs} />`
    })
}
