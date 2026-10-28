import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTab, MTabs} from '@banzamel/mineralui-angular/layout/tabs'
import type {MTabsItem} from '@banzamel/mineralui-angular/layout/tabs'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// A count or a dot after the label; screen readers hear it with the tab name ("Entries, 3 new").
@Component({
    selector: 'app-tabs-badge',
    imports: [MButton, MTab, MTabs, MText],
    template: `
        <m-tabs ariaLabel="Competition">
            <m-tab value="overview" label="Overview"><p mText>Venue, schedule and contacts.</p></m-tab>
            <m-tab value="entries" label="Entries" [badge]="entries() || null" badgeColor="warning">
                <p mText>{{ entries() }} new entries waiting for approval.</p>
                <button mButton size="sm" variant="outlined" (click)="entries.set(0)">Approve all</button>
            </m-tab>
            <m-tab value="results" label="Results" badge badgeLabel="results updated">
                <p mText>Heat results were published an hour ago.</p>
            </m-tab>
        </m-tabs>

        <m-tabs size="sm" variant="pills" ariaLabel="Inbox filter" [items]="filters" [(value)]="filter" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBadgeExample {
    protected readonly entries = signal(3)
    protected readonly filter = signal('all')
    protected readonly filters: readonly MTabsItem[] = [
        {value: 'all', label: 'All', badge: 24, badgeColor: 'neutral'},
        {value: 'mentions', label: 'Mentions', badge: 2, badgeColor: 'error'},
        {value: 'archived', label: 'Archived'},
    ]
}
