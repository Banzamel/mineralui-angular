import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MDetailList, MDetailListStatus, MDetailListValue} from '@banzamel/mineralui-angular/display/detail-list'
import type {MDetailListItem} from '@banzamel/mineralui-angular/display/detail-list'
import {MEmptyState} from '@banzamel/mineralui-angular/display/empty-state'
import {mCheckIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MLink} from '@banzamel/mineralui-angular/typography/link'

@Component({
    selector: 'app-detail-list-links',
    imports: [
        MDetailList,
        MDetailListStatus,
        MDetailListValue,
        MEmptyState,
        MIcon,
        MLink,
        MStack,
        MSurface,
        RouterLink,
    ],
    template: `
        <m-stack class="app-detail-list-links">
            <div mSurface>
                <m-detail-list [items]="items">
                    <!-- Router link: render the anchor yourself. -->
                    <ng-template mDetailListValue="owner" let-item>
                        <a mLink routerLink="/docs/link">{{ item.value }}</a>
                    </ng-template>
                    <ng-template mDetailListStatus="invoice">
                        <m-icon [icon]="checkIcon" size="sm" color="success" label="Paid" />
                    </ng-template>
                </m-detail-list>
            </div>
            <div mSurface>
                <m-detail-list [items]="[]">
                    <m-empty-state mDetailListEmpty size="xs" heading="No billing details yet" />
                </m-detail-list>
            </div>
        </m-stack>
    `,
    styles: `
        .app-detail-list-links {
            max-width: 480px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailListLinksExample {
    protected readonly checkIcon = mCheckIcon
    protected readonly items: readonly MDetailListItem[] = [
        {key: 'amount', label: 'Amount', value: '640 PLN', helperText: 'Due on 30 Apr 2026'},
        {key: 'owner', label: 'Owner', value: 'Anna Kowalska'},
        {
            key: 'invoice',
            label: 'Invoice document',
            value: 'INV-2026-0317.pdf',
            href: '/files/INV-2026-0317.pdf',
            target: '_blank',
            rel: 'noopener',
        },
    ]
}
