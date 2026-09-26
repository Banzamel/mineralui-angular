import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCardStat} from '@banzamel/mineralui-angular/cards/card-stat'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {mChartIcon, MIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-card-stat-grid',
    imports: [MBadge, MCardStat, MIcon],
    template: `
        <div class="app-card-stat-grid">
            <m-card-stat label="New leads" value="48" [trend]="12" helperText="This week" color="success">
                <m-icon mCardStatIcon [icon]="chartIcon" />
            </m-card-stat>
            <m-card-stat label="At-risk accounts" value="7" [trend]="-3" helperText="Need follow-up" color="warning">
                <m-badge mCardStatBadge color="warning" size="sm">Attention</m-badge>
            </m-card-stat>
            <m-card-stat
                label="Live sessions"
                value="19"
                [trend]="0"
                trendType="neutral"
                helperText="No change today"
                color="news"
            >
                <m-badge mCardStatBadge color="news" size="sm">Now</m-badge>
            </m-card-stat>
        </div>
    `,
    styles: `
        .app-card-stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--mineral-spacing-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStatGridExample {
    protected readonly chartIcon = mChartIcon
}
