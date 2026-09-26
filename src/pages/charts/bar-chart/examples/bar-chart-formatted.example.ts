import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MBarChart} from '@banzamel/mineralui-angular/data/bar-chart'
import type {MChartDataset} from '@banzamel/mineralui-angular/data/chart'

@Component({
    selector: 'app-bar-chart-formatted',
    imports: [MBarChart],
    template: `
        <m-bar-chart
            label="Orders by channel, last 12 months"
            stacked
            [data]="orders"
            [height]="340"
            [xAxis]="{labels: months, labelRotation: -45}"
            [yAxis]="{title: 'Orders', formatter: compact}"
            [valueFormatter]="exact"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartFormattedExample {
    protected readonly months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    protected readonly orders: readonly MChartDataset[] = [
        {label: 'Shop', data: [1240, 1310, 1580, 1490, 1720, 1850, 1690, 1760, 1930, 2110, 2480, 2960]},
        {label: 'Marketplace', data: [620, 700, 690, 810, 880, 940, 1010, 990, 1120, 1240, 1510, 1890]},
        {label: 'Phone', data: [180, 150, 170, 160, 140, 130, 120, 125, 118, 110, 140, 160], color: 'neutral'},
    ]

    private readonly numbers = new Intl.NumberFormat('en-US')
    protected readonly exact = (value: number) => this.numbers.format(value)
    protected readonly compact = (value: number) => (value >= 1000 ? `${value / 1000}k` : String(value))
}
