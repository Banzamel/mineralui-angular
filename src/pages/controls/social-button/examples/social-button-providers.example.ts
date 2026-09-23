import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MSocialButton} from '@banzamel/mineralui-angular/controls/social-button'
import type {MSocialButtonPlatform} from '@banzamel/mineralui-angular/controls/social-button'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const PLATFORMS: readonly MSocialButtonPlatform[] = [
    'google',
    'facebook',
    'apple',
    'microsoft',
    'pinterest',
    'linkedin',
]

@Component({
    selector: 'app-social-button-providers',
    imports: [MSocialButton, MStack, MText],
    template: `
        <!-- Each provider has a fixed brand preset; the label defaults to "Sign in with …". -->
        <m-stack class="providers">
            @for (platform of platforms; track platform) {
                <button mSocialButton [platform]="platform" (click)="provider.set(platform)"></button>
            }
            <p mText size="sm" tone="muted" aria-live="polite">Selected provider: {{ provider() ?? 'none' }}</p>
        </m-stack>
    `,
    styles: '.providers { max-width: 360px; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonProvidersExample {
    protected readonly platforms = PLATFORMS
    protected readonly provider = signal<MSocialButtonPlatform | null>(null)
}
