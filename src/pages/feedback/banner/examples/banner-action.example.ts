import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MBanner} from '@banzamel/mineralui-angular/feedback/banner'
import {MIcon, mBoltIcon, mWarningIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-banner-action',
    imports: [MBanner, MButton, MIcon, MStack],
    template: `
        <m-stack>
            @if (shown()) {
                <m-banner color="news" dismissible (dismissed)="shown.set(false)">
                    <m-icon mStart [icon]="bolt" />
                    Version 3.0 is out — faster builds and a new theme editor.
                    <a mButton mEnd variant="outlined" size="sm" color="light" href="#">What's new</a>
                </m-banner>
            } @else {
                <div>
                    <button mButton variant="ghost" size="sm" (click)="shown.set(true)">Show the banner again</button>
                </div>
            }
            <m-banner color="warning" variant="ghost">
                <m-icon mStart [icon]="warning" />
                Scheduled maintenance on Sunday, 02:00–04:00 UTC.
            </m-banner>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerActionExample {
    protected readonly bolt = mBoltIcon
    protected readonly warning = mWarningIcon
    protected readonly shown = signal(true)
}
