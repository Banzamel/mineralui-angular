import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDashboardGrid, MDashboardTile} from '@banzamel/mineralui-angular/data/dashboard-grid'
import type {MDashboardGridItem} from '@banzamel/mineralui-angular/data/dashboard-grid'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-dashboard-grid-static',
    imports: [MButton, MCard, MCardBody, MCardHeader, MDashboardGrid, MDashboardTile, MHeading, MText],
    template: `
        <m-dashboard-grid [(layout)]="layout">
            @for (item of layout(); track item.id) {
                <m-dashboard-tile [id]="item.id">
                    <m-card>
                        <m-card-header>
                            <h6 mHeading>{{ item.label }}</h6>
                        </m-card-header>
                        <m-card-body>
                            <p mText size="sm" tone="muted">{{ item.span }} of 12 columns.</p>
                            <button mButton size="sm" variant="outlined" (click)="opened.set(item.label ?? '')">
                                Open report
                            </button>
                        </m-card-body>
                    </m-card>
                </m-dashboard-tile>
            }
        </m-dashboard-grid>
        <p mText size="sm" tone="muted">{{ opened() ? 'Opened: ' + opened() : 'Tile content stays clickable.' }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGridStaticExample {
    protected readonly layout = signal<readonly MDashboardGridItem[]>([
        {id: 'revenue', span: 8, label: 'Revenue'},
        {id: 'signups', span: 4, label: 'Signups'},
    ])
    protected readonly opened = signal('')
}
