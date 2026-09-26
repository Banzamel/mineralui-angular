import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MAreaChart} from '@banzamel/mineralui-angular/data/area-chart'
import type {MChartDataset} from '@banzamel/mineralui-angular/data/chart'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-area-chart-compact',
    imports: [MAreaChart, MCard, MCardBody, MCardHeader, MText],
    template: `
        <m-card class="app-area-chart-compact">
            <m-card-header>
                <p mText size="sm" tone="muted">Sign-ups this week</p>
                <p mText weight="bold" size="xl">1,284</p>
            </m-card-header>
            <m-card-body>
                <m-area-chart
                    label="Sign-ups per day this week"
                    curved
                    [aspectRatio]="3"
                    [data]="signups"
                    [xAxis]="{labels: days}"
                    [showXAxis]="false"
                    [showYAxis]="false"
                    [showGrid]="false"
                    [showLegend]="false"
                />
            </m-card-body>
        </m-card>
    `,
    styles: `
        .app-area-chart-compact {
            max-width: 420px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaChartCompactExample {
    protected readonly days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    protected readonly signups: readonly MChartDataset[] = [
        {label: 'Sign-ups', data: [142, 168, 155, 201, 236, 190, 192], color: 'news'},
    ]
}
