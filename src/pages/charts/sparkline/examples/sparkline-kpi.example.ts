import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MSparkline} from '@banzamel/mineralui-angular/data/sparkline'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-sparkline-kpi',
    imports: [MCard, MCardBody, MSparkline, MText],
    template: `
        <div class="app-sparkline-kpi">
            @for (kpi of kpis; track kpi.label) {
                <m-card>
                    <m-card-body>
                        <p mText size="sm" tone="muted">{{ kpi.label }}</p>
                        <p mText size="xl" weight="bold">{{ kpi.value }}</p>
                        <m-sparkline [data]="kpi.trend" [type]="kpi.type" [color]="kpi.color" [height]="36" />
                    </m-card-body>
                </m-card>
            }
        </div>
    `,
    styles: `
        .app-sparkline-kpi {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--mineral-spacing-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparklineKpiExample {
    protected readonly kpis = [
        {label: 'Revenue', value: '24,500 PLN', trend: [8, 9, 11, 10, 13, 15, 14, 18], type: 'area', color: 'success'},
        {label: 'Orders', value: '312', trend: [30, 42, 38, 51, 47, 55, 49, 60], type: 'bar', color: 'primary'},
        {label: 'Refunds', value: '9', trend: [6, 4, 7, 5, 3, 4, 2, 3], type: 'line', color: 'error'},
    ] as const
}
