import {ChangeDetectionStrategy, Component} from '@angular/core'
// The Pro package has every entry point of Basic under its own name — Basic and Pro components side by side.
import {MCard, MCardBody} from '@banzamel/mineralui-angular-pro/cards/card'
import type {MChartDataset} from '@banzamel/mineralui-angular-pro/data/chart'
import {MLineChart} from '@banzamel/mineralui-angular-pro/data/line-chart'

@Component({
    selector: 'app-revenue',
    imports: [MCard, MCardBody, MLineChart],
    template: `
        <m-card>
            <m-card-body>
                <m-line-chart label="Revenue" [data]="revenue" [xAxis]="{labels: months}" />
            </m-card-body>
        </m-card>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Revenue {
    protected readonly months = ['Jan', 'Feb', 'Mar', 'Apr']
    protected readonly revenue: readonly MChartDataset[] = [{label: '2026', data: [12, 18, 15, 24]}]
}
