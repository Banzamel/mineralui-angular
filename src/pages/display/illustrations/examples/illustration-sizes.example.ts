import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIllustration, mDashboardIllustration} from '@banzamel/mineralui-angular/illustrations'

@Component({
    selector: 'app-illustration-sizes',
    imports: [MIllustration],
    template: `
        <m-illustration [illustration]="dashboard" size="sm" color="primary" />
        <m-illustration [illustration]="dashboard" size="md" color="info" />
        <m-illustration [illustration]="dashboard" size="lg" color="success" />
    `,
    styles: ':host { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 1rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustrationSizesExample {
    protected readonly dashboard = mDashboardIllustration
}
