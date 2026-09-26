import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MLineChart} from '@banzamel/mineralui-angular/data/line-chart'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import lineChartInteractive from '@generated/examples/charts/line-chart/line-chart-interactive'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {flagAttributes, MONTHS, MULTI_SERIES, SINGLE_SERIES} from '../chart-samples'

@Component({
    selector: 'doc-line-chart-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MLineChart, MStack],
    template: `
        <doc-article
            title="MLineChart"
            description="Line chart for trends and continuous series, with optional Bézier curves, axes, grid, legend and a tooltip that follows the pointer."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-line-chart
                        label="Revenue, expenses and profit by month"
                        [data]="multiColor() ? multiSeries : singleSeries"
                        [xAxis]="{labels: months}"
                        [height]="320"
                        [curved]="curved()"
                        [showGrid]="showGrid()"
                        [showXAxis]="showXAxis()"
                        [showYAxis]="showYAxis()"
                        [showLegend]="showLegend()"
                        [showTooltip]="showTooltip()"
                        [animated]="animated()"
                        [interactive]="interactive()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Interactive points"
                description="interactive turns the points into buttons in one Tab stop: arrows move between months (←/→) and series (↑/↓), Home / End jump to the ends, Enter or a click emits (dataClick) with the dataset index, the value index and the value. The tooltip follows the focus. Axis titles, rotated labels and value formatters in the same example."
            >
                <doc-preview [example]="examples.interactive" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The drawing is an image named by label (required). A visually hidden table under it carries every value — one row per category, one column per series, the x axis title as the header. Axes and the tooltip are hidden from assistive technology. With interactive the drawing becomes a group of buttons named 'Revenue, Mar: 14'. Colors are not the only cue: the legend and the table name each series."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="One component per chart type on a shared base (React: MChart with a type switch). New: label (required), the hidden data table, interactive with keyboard navigation — (dataClick) replaces onDataClick and only fires with interactive. labelFormatter is applied (React ignores it). height sizes the drawing only, the legend comes on top (React: the legend overflows the fixed height). Gradient ids are unique per chart; the line draws in with pathLength (no fixed 2000 px dash); reduced motion disables the animations."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MLineChart" />
                    <doc-props-table api="MChartDataset" />
                    <doc-props-table api="MChartAxisConfig" />
                    <doc-props-table api="MChartDataClick" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartPage {
    protected readonly examples = {interactive: lineChartInteractive}
    protected readonly months = MONTHS
    protected readonly multiSeries = MULTI_SERIES
    protected readonly singleSeries = SINGLE_SERIES

    protected readonly curved = signal(false)
    protected readonly showGrid = signal(true)
    protected readonly showXAxis = signal(true)
    protected readonly showYAxis = signal(true)
    protected readonly showLegend = signal(true)
    protected readonly showTooltip = signal(true)
    protected readonly animated = signal(true)
    protected readonly interactive = signal(false)
    protected readonly multiColor = signal(true)
    protected readonly controls = [
        booleanControl('curved', this.curved),
        booleanControl('showGrid', this.showGrid),
        booleanControl('showXAxis', this.showXAxis),
        booleanControl('showYAxis', this.showYAxis),
        booleanControl('showLegend', this.showLegend),
        booleanControl('showTooltip', this.showTooltip),
        booleanControl('animated', this.animated),
        booleanControl('interactive', this.interactive),
        booleanControl('multiColor', this.multiColor),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '    label="Revenue, expenses and profit by month"',
            '    [data]="series"',
            '    [xAxis]="{labels: months}"',
            '    [height]="320"',
            ...flagAttributes({
                curved: {value: this.curved(), default: false},
                showGrid: {value: this.showGrid(), default: true},
                showXAxis: {value: this.showXAxis(), default: true},
                showYAxis: {value: this.showYAxis(), default: true},
                showLegend: {value: this.showLegend(), default: true},
                showTooltip: {value: this.showTooltip(), default: true},
                animated: {value: this.animated(), default: true},
                interactive: {value: this.interactive(), default: false},
            }),
        ]
        return `<m-line-chart\n${attrs.join('\n')}\n/>`
    })
}
