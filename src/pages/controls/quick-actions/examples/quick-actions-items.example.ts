import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MQuickActions} from '@banzamel/mineralui-angular/controls/quick-actions'
import type {MQuickActionItem} from '@banzamel/mineralui-angular/controls/quick-actions'
import {mCalendarIcon, mChartIcon, mDownloadIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-quick-actions-items',
    imports: [MQuickActions, MStack, MText],
    template: `
        <m-stack>
            <!-- Items carry data only; clicks arrive through (action) with the whole item. -->
            <m-quick-actions aria-label="Dashboard shortcuts" [items]="actions" (action)="last.set($event.label)" />
            <p mText size="sm" tone="muted" aria-live="polite">Last action: {{ last() ?? 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsItemsExample {
    protected readonly last = signal<string | null>(null)
    protected readonly actions: readonly MQuickActionItem[] = [
        {
            key: 'calendar',
            label: 'Open calendar',
            icon: mCalendarIcon,
            color: 'info',
            badge: 'Now',
            badgeColor: 'news',
            badgePulsing: true,
        },
        {key: 'reports', label: 'Reports', icon: mChartIcon, color: 'success', badge: 3, badgeColor: 'warning'},
        {key: 'export', label: 'Export', icon: mDownloadIcon, pulsing: true},
        {key: 'archive', label: 'Archive', disabled: true},
    ]
}
