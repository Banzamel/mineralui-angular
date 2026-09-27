import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MBarChart} from '@banzamel/mineralui-angular/data/bar-chart'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import barChartFormatted from '@generated/examples/charts/bar-chart/bar-chart-formatted'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {flagAttributes, MONTHS, MULTI_SERIES, SINGLE_SERIES} from '../chart-samples'

@Component({
    selector: 'doc-bar-chart-page',
    imports: [DocArticle, DocProNotice, DocSection, DocPlayground, DocPreview, DocPropsTable, MBarChart, MStack],
    template: `
        <doc-article
            title="MBarChart"
            description="Vertical bar chart for comparing categories: the series side by side, or piled in one bar with stacked."
        >
            <doc-pro-notice
                [components]="['MBarChart']"
                reason="Bar chart is part of the MineralUI Pro charts module."
            />

            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-bar-chart
                        label="Revenue, expenses and profit by month"
                        [data]="multiColor() ? multiSeries : singleSeries"
                        [xAxis]="{labels: months}"
                        [height]="320"
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
                title="Formatted values and dense labels"
                description="valueFormatter formats the tooltip, the value axis and the hidden table; yAxis.formatter only the axis ticks. Twelve months fit with xAxis.labelRotation: -45. The tooltip of grouped bars shows the hovered bar, of stacked bars the whole column."
            >
                <doc-preview [example]="examples.formatted" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="An image named by label with a visually hidden data table (one row per category, one column per series). With interactive the bars are buttons in one Tab stop: ←/→ between categories, ↑/↓ between series, Enter emits (dataClick)."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Same as MLineChart: its own component instead of MChart type='bar', required label, the hidden data table, interactive with keyboard, (dataClick) only with interactive, gradient ids unique per chart, height of the drawing only. Bars are vertical only, as in React."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MBarChart" />
                    <doc-props-table api="MChartDataset" />
                    <doc-props-table api="MChartAxisConfig" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartPage {
    protected readonly examples = {formatted: barChartFormatted}
    protected readonly months = MONTHS
    protected readonly multiSeries = MULTI_SERIES
    protected readonly singleSeries = SINGLE_SERIES

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
        return `<m-bar-chart\n${attrs.join('\n')}\n/>`
    })
}
