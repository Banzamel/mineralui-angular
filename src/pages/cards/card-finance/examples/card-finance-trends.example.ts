import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCardFinance} from '@banzamel/mineralui-angular/cards/card-finance'
import {mChartIcon, MIcon, mUsersIcon, mWalletIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-card-finance-trends',
    imports: [MCardFinance, MIcon],
    template: `
        <div class="app-card-finance-trends">
            <m-card-finance
                label="Revenue"
                currency="USD"
                value="$24,500"
                changeLabel="vs last month"
                [change]="12.5"
                [sparkline]="[12, 15, 13, 18, 22, 20, 24, 28, 26, 31]"
            >
                <m-icon mCardFinanceIcon [icon]="walletIcon" />
            </m-card-finance>
            <m-card-finance
                label="Churned customers"
                value="38"
                changeLabel="fewer than last month"
                changeType="up"
                color="info"
                sparklineType="line"
                [change]="-8.4"
                [sparkline]="[28, 26, 24, 22, 25, 20, 18, 16, 19, 14]"
            >
                <m-icon mCardFinanceIcon [icon]="usersIcon" />
            </m-card-finance>
            <m-card-finance
                label="Conversion rate"
                value="3.2%"
                changeLabel="no change"
                color="news"
                sparklineType="bar"
                [change]="0"
                [sparkline]="[20, 21, 19, 20, 22, 21, 20, 19, 21, 20]"
            >
                <m-icon mCardFinanceIcon [icon]="chartIcon" />
            </m-card-finance>
        </div>
    `,
    styles: `
        .app-card-finance-trends {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--mineral-spacing-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFinanceTrendsExample {
    protected readonly walletIcon = mWalletIcon
    protected readonly usersIcon = mUsersIcon
    protected readonly chartIcon = mChartIcon
}
