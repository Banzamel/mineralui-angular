import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mMoonIcon, mSunIcon} from '@banzamel/mineralui-angular/icons'
import {MIllustration, mOnboardingIllustration} from '@banzamel/mineralui-angular/illustrations'
import {MSpacing, MThemeService} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-welcome-card',
    imports: [MButton, MIcon, MIllustration, MSpacing],
    template: `
        <section class="card">
            <m-illustration [illustration]="onboarding" size="sm" color="success" />
            <h2 mSpacing mt="sm">Welcome aboard</h2>
            <p>Mode: {{ theme.resolvedMode() }}</p>
            <button mButton variant="outlined" (click)="theme.toggleMode()">
                <m-icon mStart [icon]="theme.resolvedMode() === 'dark' ? sun : moon" />
                Toggle theme
            </button>
        </section>
    `,
    styles: `
        .card {
            display: grid;
            justify-items: center;
            max-width: 280px;
            padding: var(--mineral-spacing-lg);
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-lg);
            background: var(--mineral-surface);
            text-align: center;
        }
        h2 {
            margin-bottom: 0;
            font-size: 1.125rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeCardExample {
    protected readonly theme = inject(MThemeService)
    protected readonly onboarding = mOnboardingIllustration
    protected readonly sun = mSunIcon
    protected readonly moon = mMoonIcon
}
