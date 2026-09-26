import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MSparkline} from '@banzamel/mineralui-angular/data/sparkline'
import type {MSparklineType} from '@banzamel/mineralui-angular/data/sparkline'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import sparklineKpi from '@generated/examples/charts/sparkline/sparkline-kpi'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const TYPES: readonly MSparklineType[] = ['line', 'bar', 'area']

@Component({
    selector: 'doc-sparkline-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MSparkline],
    template: `
        <doc-article
            title="MSparkline"
            description="Tiny trend chart without axes — a line, an area or bars — for KPI cards, table cells and lists."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-sparkline
                        class="doc-sparkline"
                        label="Sales, last 12 days"
                        [data]="data"
                        [type]="type()"
                        [color]="color()"
                        [height]="height()"
                        [curved]="curved()"
                        [animated]="animated()"
                        [showMinMax]="showMinMax()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Next to a figure"
                description="A sparkline illustrates a number that is already in text, so it is decorative by default. Give it a label only when it carries information of its own."
            >
                <doc-preview [example]="examples.kpi" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Without label the sparkline is hidden from assistive technology (aria-hidden); with label it is an image with that name. It has no tooltip or focusable points — for readable values use a chart."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="New label input (React: never announced, always a bare div). The line really draws in (React animated a dash offset without a dash); the area fades in; reduced motion disables the animations."
            />

            <doc-section title="MSparkline API">
                <doc-props-table api="MSparkline" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-sparkline {
            max-width: 320px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparklinePage {
    protected readonly examples = {kpi: sparklineKpi}
    protected readonly data = [4, 7, 5, 12, 9, 15, 11, 18, 14, 20, 17, 22]

    protected readonly type = signal<MSparklineType>('line')
    protected readonly color = signal<MColor>('primary')
    protected readonly height = signal(40)
    protected readonly curved = signal(true)
    protected readonly animated = signal(true)
    protected readonly showMinMax = signal(false)
    protected readonly controls = [
        selectControl('type', this.type, TYPES),
        selectControl('color', this.color, COLORS),
        sliderControl('height', this.height, {min: 20, max: 80, step: 5}),
        booleanControl('curved', this.curved),
        booleanControl('animated', this.animated),
        booleanControl('showMinMax', this.showMinMax),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[data]="[4, 7, 5, 12, 9, 15, 11, 18, 14, 20, 17, 22]"',
            'label="Sales, last 12 days"',
            this.type() !== 'line' && `type="${this.type()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.height() !== 40 && `[height]="${this.height()}"`,
            !this.curved() && '[curved]="false"',
            !this.animated() && '[animated]="false"',
            this.showMinMax() && 'showMinMax',
        ].filter((attr) => typeof attr === 'string')
        return `<m-sparkline ${attrs.join(' ')} />`
    })
}
