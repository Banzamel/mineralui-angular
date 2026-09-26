import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import type {MChartDataClick, MChartDataset} from '@banzamel/mineralui-angular/data/chart'
import {MLineChart} from '@banzamel/mineralui-angular/data/line-chart'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-line-chart-interactive',
    imports: [MLineChart, MText],
    template: `
        <m-line-chart
            label="Active users per week"
            interactive
            curved
            [data]="series"
            [xAxis]="{labels: weeks, title: 'Week', labelRotation: -45}"
            [yAxis]="{title: 'Users', ticks: 4}"
            [valueFormatter]="thousands"
            (dataClick)="selected.set($event)"
        />
        <p mText tone="muted" size="sm" aria-live="polite">
            @if (selected(); as click) {
                Selected: {{ series[click.datasetIndex]?.label }}, {{ weeks[click.dataIndex] }} —
                {{ thousands(click.value) }}
            } @else {
                Click a point, or Tab to the chart and press Enter.
            }
        </p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartInteractiveExample {
    protected readonly weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
    protected readonly series: readonly MChartDataset[] = [
        {label: 'Web', data: [4200, 4800, 5100, 4900, 5600, 6100, 6400, 7000], color: 'primary'},
        {label: 'Mobile', data: [2100, 2600, 3300, 3900, 4200, 4800, 5500, 6200], color: 'news'},
    ]
    protected readonly selected = signal<MChartDataClick | null>(null)

    protected readonly thousands = (value: number) => `${(value / 1000).toFixed(1)}k`
}
