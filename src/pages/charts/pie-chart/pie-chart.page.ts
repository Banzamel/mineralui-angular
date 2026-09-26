import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MChartDataset} from '@banzamel/mineralui-angular/data/chart'
import {MPieChart} from '@banzamel/mineralui-angular/data/pie-chart'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import pieChartDatasets from '@generated/examples/charts/pie-chart/pie-chart-datasets'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {flagAttributes} from '../chart-samples'

@Component({
    selector: 'doc-pie-chart-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MPieChart, MStack],
    template: `
        <doc-article
            title="MPieChart"
            description="Pie or donut chart for the shares of a whole, with a legend, a tooltip and the total in the middle of the donut."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-pie-chart
                        label="Sessions by device"
                        [data]="devices"
                        [xAxis]="{labels: labels}"
                        [height]="300"
                        [donut]="donut()"
                        [showLegend]="showLegend()"
                        [showTooltip]="showTooltip()"
                        [animated]="animated()"
                        [interactive]="interactive()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="One segment per dataset"
                description="Several datasets make one segment each from their first value, named and colored by the dataset. The donut shows the total, or the value of the hovered or focused segment; donutWidth sets the ring thickness."
            >
                <doc-preview [example]="examples.datasets" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="An image named by label with a visually hidden table of the segments. With interactive the segments are buttons in one Tab stop named 'Mobile: 35 (35%)'; the arrows walk them in order, Enter emits (dataClick). The donut total is hidden from assistive technology (it is in the table)."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Its own component instead of MChart type='pie', required label, the hidden data table, interactive with keyboard, (dataClick) only with interactive. Segments without a label are named by mineralui.chart.segment (React: a hard-coded 'Segment n'). labelFormatter applies to the segment names."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MPieChart" />
                    <doc-props-table api="MChartDataset" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartPage {
    protected readonly examples = {datasets: pieChartDatasets}
    protected readonly devices: readonly MChartDataset[] = [{label: 'Sessions', data: [35, 25, 20, 15, 5]}]
    protected readonly labels = ['Mobile', 'Desktop', 'Tablet', 'TV', 'Other']

    protected readonly donut = signal(false)
    protected readonly showLegend = signal(true)
    protected readonly showTooltip = signal(true)
    protected readonly animated = signal(true)
    protected readonly interactive = signal(false)
    protected readonly controls = [
        booleanControl('donut', this.donut),
        booleanControl('showLegend', this.showLegend),
        booleanControl('showTooltip', this.showTooltip),
        booleanControl('animated', this.animated),
        booleanControl('interactive', this.interactive),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '    label="Sessions by device"',
            `    [data]="[{label: 'Sessions', data: [35, 25, 20, 15, 5]}]"`,
            `    [xAxis]="{labels: ['Mobile', 'Desktop', 'Tablet', 'TV', 'Other']}"`,
            ...flagAttributes({
                donut: {value: this.donut(), default: false},
                showLegend: {value: this.showLegend(), default: true},
                showTooltip: {value: this.showTooltip(), default: true},
                animated: {value: this.animated(), default: true},
                interactive: {value: this.interactive(), default: false},
            }),
        ]
        return `<m-pie-chart\n${attrs.join('\n')}\n/>`
    })
}
