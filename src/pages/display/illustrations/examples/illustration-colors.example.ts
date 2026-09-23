import {ChangeDetectionStrategy, Component} from '@angular/core'
import type {MIllustrationColor, MIllustrationDef} from '@banzamel/mineralui-angular/illustrations'
import {
    MIllustration,
    mCalendarIllustration,
    mDashboardIllustration,
    mErrorIllustration,
    mNotificationsIllustration,
    mOnboardingIllustration,
    mSecurityIllustration,
    mSuccessIllustration,
    mTeamIllustration,
    mWalletIllustration,
} from '@banzamel/mineralui-angular/illustrations'

@Component({
    selector: 'app-illustration-colors',
    imports: [MIllustration],
    template: `
        @for (item of items; track item.color) {
            <figure>
                <m-illustration [illustration]="item.illustration" size="sm" [color]="item.color" />
                <figcaption>{{ item.color }}</figcaption>
            </figure>
        }
    `,
    styles: `
        :host {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        figure {
            display: grid;
            justify-items: center;
            gap: 0.25rem;
            margin: 0;
        }
        figcaption {
            color: var(--mineral-text-secondary);
            font-size: 0.875rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustrationColorsExample {
    protected readonly items: readonly {illustration: MIllustrationDef; color: MIllustrationColor}[] = [
        {illustration: mSecurityIllustration, color: 'primary'},
        {illustration: mTeamIllustration, color: 'info'},
        {illustration: mSuccessIllustration, color: 'success'},
        {illustration: mErrorIllustration, color: 'error'},
        {illustration: mWalletIllustration, color: 'warning'},
        {illustration: mCalendarIllustration, color: 'neutral'},
        {illustration: mOnboardingIllustration, color: 'light'},
        {illustration: mDashboardIllustration, color: 'dark'},
        {illustration: mNotificationsIllustration, color: 'news'},
    ]
}
