import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MSocialButton} from '@banzamel/mineralui-angular/controls/social-button'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-social-button-google',
    imports: [MSocialButton, MInline],
    template: `
        <!-- variant switches only the Google preset: outline (default), dark or light. -->
        <m-inline>
            <button mSocialButton size="sm"></button>
            <button mSocialButton size="sm" variant="dark"></button>
            <button mSocialButton size="sm" variant="light"></button>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonGoogleExample {}
