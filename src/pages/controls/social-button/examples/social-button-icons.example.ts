import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MSocialButton} from '@banzamel/mineralui-angular/controls/social-button'
import type {MSocialButtonPlatform} from '@banzamel/mineralui-angular/controls/social-button'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

const PLATFORMS: readonly MSocialButtonPlatform[] = [
    'google',
    'facebook',
    'apple',
    'microsoft',
    'pinterest',
    'linkedin',
]

@Component({
    selector: 'app-social-button-icons',
    imports: [MSocialButton, MInline, MStack],
    template: `
        <!-- Icon-only buttons keep "Sign in with …" as their accessible name. -->
        <m-stack>
            <m-inline aria-label="Sign in (round)" role="group">
                @for (platform of platforms; track platform) {
                    <button mSocialButton iconOnly size="sm" [platform]="platform"></button>
                }
            </m-inline>
            <m-inline aria-label="Sign in (square)" role="group">
                @for (platform of platforms; track platform) {
                    <button mSocialButton iconOnly iconShape="square" size="sm" [platform]="platform"></button>
                }
            </m-inline>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonIconsExample {
    protected readonly platforms = PLATFORMS
}
