import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MDashboardGrid, MDashboardTile} from '@banzamel/mineralui-angular/data/dashboard-grid'
import type {MDashboardGridItem} from '@banzamel/mineralui-angular/data/dashboard-grid'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-dashboard-grid-pinned',
    imports: [MCard, MCardBody, MCardHeader, MDashboardGrid, MDashboardTile, MHeading, MText],
    template: `
        <m-dashboard-grid editable removable [(layout)]="layout" [canDrop]="notOnPinned" (itemRemove)="remove($event)">
            @for (item of layout(); track item.id) {
                <m-dashboard-tile [id]="item.id">
                    <m-card>
                        <m-card-header>
                            <h6 mHeading>{{ item.label }}</h6>
                        </m-card-header>
                        <m-card-body>
                            <p mText size="sm" tone="muted">
                                {{ item.locked ? 'Pinned — stays first.' : item.span + ' of 12 columns.' }}
                            </p>
                        </m-card-body>
                    </m-card>
                </m-dashboard-tile>
            }
        </m-dashboard-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGridPinnedExample {
    protected readonly layout = signal<readonly MDashboardGridItem[]>([
        {id: 'announcement', span: 12, minSpan: 12, label: 'Announcement', locked: true},
        {id: 'revenue', span: 6, minSpan: 4, label: 'Revenue'},
        {id: 'signups', span: 6, minSpan: 4, label: 'Signups'},
        {id: 'usage', span: 12, minSpan: 6, label: 'Usage'},
    ])

    /** Nothing may take the pinned tile's slot. */
    protected readonly notOnPinned = (_dragged: MDashboardGridItem, target: MDashboardGridItem) => !target.locked

    protected remove(id: string): void {
        this.layout.update((items) => items.filter((item) => item.id !== id))
    }
}
