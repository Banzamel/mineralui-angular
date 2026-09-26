import {ChangeDetectionStrategy, Component} from '@angular/core'
import type {MChartDataset} from '@banzamel/mineralui-angular/data/chart'
import {MPieChart} from '@banzamel/mineralui-angular/data/pie-chart'

@Component({
    selector: 'app-pie-chart-datasets',
    imports: [MPieChart],
    template: `
        <m-pie-chart
            label="Budget by department"
            donut
            interactive
            [height]="280"
            [donutWidth]="48"
            [data]="departments"
            [valueFormatter]="money"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartDatasetsExample {
    protected readonly departments: readonly MChartDataset[] = [
        {label: 'Engineering', data: [420_000], color: 'primary'},
        {label: 'Marketing', data: [180_000], color: 'news'},
        {label: 'Sales', data: [240_000], color: 'success'},
        {label: 'Support', data: [95_000], color: 'warning'},
    ]

    protected readonly money = (value: number) => `$${Math.round(value / 1000)}k`
}
