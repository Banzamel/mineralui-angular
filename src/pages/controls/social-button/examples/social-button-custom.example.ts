import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MSocialButton} from '@banzamel/mineralui-angular/controls/social-button'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-social-button-custom',
    imports: [MSocialButton, MStack],
    template: `
        <m-stack class="custom">
            <!-- Projected text replaces the default label. -->
            <button mSocialButton platform="microsoft" [loading]="connecting()" (click)="connect()">
                Continue with Microsoft
            </button>
            <!-- On an anchor, a redirect-based flow stays a real link. -->
            <a mSocialButton platform="linkedin" href="https://www.linkedin.com/" target="_blank" rel="noopener">
                Share on LinkedIn
            </a>
            <button mSocialButton platform="apple" disabled>Apple sign-in unavailable</button>
        </m-stack>
    `,
    styles: '.custom { max-width: 360px; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonCustomExample {
    protected readonly connecting = signal(false)

    protected connect(): void {
        this.connecting.set(true)
        setTimeout(() => this.connecting.set(false), 1500)
    }
}
