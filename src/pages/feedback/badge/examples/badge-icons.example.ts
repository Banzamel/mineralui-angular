import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MIcon, mBoltIcon, mStarIcon, mSuccessIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-badge-icons',
    imports: [MBadge, MIcon],
    template: `
        <div class="row">
            <m-badge color="success" rounded><m-icon mStart [icon]="success" />Active</m-badge>
            <m-badge color="error" pulsing rounded><m-icon mStart [icon]="bolt" />Live</m-badge>
            <m-badge color="warning" size="sm"><m-icon mStart [icon]="star" />Featured</m-badge>
            <m-badge color="neutral" size="xs">v2.4.0</m-badge>
        </div>
    `,
    styles: `
        .row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeIconsExample {
    protected readonly success = mSuccessIcon
    protected readonly bolt = mBoltIcon
    protected readonly star = mStarIcon
}
