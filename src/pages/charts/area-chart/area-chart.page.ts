import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MAreaChart} from '@banzamel/mineralui-angular/data/area-chart'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import areaChartCompact from '@generated/examples/charts/area-chart/area-chart-compact'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {flagAttributes, MONTHS, MULTI_SERIES, SINGLE_SERIES} from '../chart-samples'

@Component({
    selector: 'doc-area-chart-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MAreaChart, MStack],
    template: `
        <doc-article
            title="MAreaChart"
            description="Line chart with a gradient fill under each series — stacked, it shows how parts add up to a total over time."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-area-chart
                        label="Revenue, expenses and profit by month"
                        [data]="multiColor() ? multiSeries : singleSeries"
                        [xAxis]="{labels: months}"
                        [height]="320"
                        [curved]="curved()"
                        [stacked]="stacked()"
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
                title="Compact trend"
                description="Without axes, grid and legend, with aspectRatio instead of a fixed height, the area chart scales with its container — here in a card of a dashboard."
            >
                <doc-preview [example]="examples.compact" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="An image named by label with a visually hidden data table; stacked charts list the values of each series, not the running sums. With interactive the points on each line are buttons in one Tab stop (←/→ categories, ↑/↓ series) and the whole category is highlighted."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Same as MLineChart: its own component, required label, the hidden data table, interactive with keyboard, (dataClick) only with interactive, height of the drawing only. A stacked chart has (hidden) points too, so it can be walked from the keyboard and shows them on hover. curved defaults to false (React docs showed it on)."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MAreaChart" />
                    <doc-props-table api="MChartDataset" />
                    <doc-props-table api="MChartAxisConfig" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaChartPage {
    protected readonly examples = {compact: areaChartCompact}
    protected readonly months = MONTHS
    protected readonly multiSeries = MULTI_SERIES
    protected readonly singleSeries = SINGLE_SERIES

    protected readonly curved = signal(true)
    protected readonly stacked = signal(false)
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
        booleanControl('stacked', this.stacked),
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
                stacked: {value: this.stacked(), default: false},
                showGrid: {value: this.showGrid(), default: true},
                showXAxis: {value: this.showXAxis(), default: true},
                showYAxis: {value: this.showYAxis(), default: true},
                showLegend: {value: this.showLegend(), default: true},
                showTooltip: {value: this.showTooltip(), default: true},
                animated: {value: this.animated(), default: true},
                interactive: {value: this.interactive(), default: false},
            }),
        ]
        return `<m-area-chart\n${attrs.join('\n')}\n/>`
    })
}
