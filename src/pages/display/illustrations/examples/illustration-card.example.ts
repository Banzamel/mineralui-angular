import {ChangeDetectionStrategy, Component} from '@angular/core'
import type {MIllustrationColor, MIllustrationDef} from '@banzamel/mineralui-angular/illustrations'
import {
    MIllustration,
    mDashboardIllustration,
    mEmptyStateIllustration,
    mOnboardingIllustration,
} from '@banzamel/mineralui-angular/illustrations'

interface Feature {
    readonly illustration: MIllustrationDef
    readonly color: MIllustrationColor
    readonly title: string
    readonly text: string
}

@Component({
    selector: 'app-illustration-card',
    imports: [MIllustration],
    template: `
        @for (feature of features; track feature.title) {
            <article class="card">
                <m-illustration [illustration]="feature.illustration" [size]="120" [color]="feature.color" />
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.text }}</p>
            </article>
        }
    `,
    styles: `
        :host {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .card {
            display: grid;
            justify-items: center;
            gap: 0.5rem;
            max-width: 240px;
            padding: 1.25rem;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-lg);
            background: var(--mineral-surface);
            text-align: center;
        }
        h3 {
            margin: 0;
            font-size: 1rem;
        }
        p {
            margin: 0;
            color: var(--mineral-text-secondary);
            font-size: 0.875rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustrationCardExample {
    protected readonly features: readonly Feature[] = [
        {
            illustration: mDashboardIllustration,
            color: 'warning',
            title: 'Analytics',
            text: 'Track key metrics across your product.',
        },
        {
            illustration: mEmptyStateIllustration,
            color: 'neutral',
            title: 'No results',
            text: 'Try adjusting filters or search terms.',
        },
        {
            illustration: mOnboardingIllustration,
            color: 'success',
            title: 'Get started',
            text: 'Complete setup to unlock all features.',
        },
    ]
}
