import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MDetailList, MDetailListStatus, MDetailListValue} from '@banzamel/mineralui-angular/display/detail-list'
import type {MDetailListItem} from '@banzamel/mineralui-angular/display/detail-list'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MIcon, mMailIcon, mPhoneIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MLink} from '@banzamel/mineralui-angular/typography/link'

@Component({
    selector: 'app-detail-list-profile',
    imports: [MBadge, MDetailList, MDetailListStatus, MDetailListValue, MIcon, MInline, MLink, MSurface],
    template: `
        <div mSurface class="app-detail-list-profile">
            <m-detail-list [items]="items">
                <ng-template mDetailListValue="email" let-item>
                    <a mLink [href]="'mailto:' + item.value">
                        <m-inline spacing="xs"><m-icon [icon]="mailIcon" size="sm" />{{ item.value }}</m-inline>
                    </a>
                </ng-template>
                <ng-template mDetailListValue="phone" let-item>
                    <m-inline spacing="xs"><m-icon [icon]="phoneIcon" size="sm" />{{ item.value }}</m-inline>
                </ng-template>
                <ng-template mDetailListStatus="plan"><m-badge color="success" size="sm">Active</m-badge></ng-template>
            </m-detail-list>
        </div>
    `,
    styles: `
        .app-detail-list-profile {
            max-width: 480px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailListProfileExample {
    protected readonly mailIcon = mMailIcon
    protected readonly phoneIcon = mPhoneIcon
    protected readonly items: readonly MDetailListItem[] = [
        {key: 'family', label: 'Family', value: 'Kowalski family'},
        {key: 'email', label: 'Primary contact', value: 'anna.kowalska@example.com'},
        {key: 'phone', label: 'Phone', value: '+48 600 123 456', helperText: 'Reachable Mon–Fri 09:00–17:00'},
        {key: 'plan', label: 'Subscription', value: 'English B2 — annual', helperText: 'Renews 12 Sep 2026'},
    ]
}
