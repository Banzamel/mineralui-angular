import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Injector,
    signal,
    viewChild,
} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDashboardGrid, MDashboardTile} from '@banzamel/mineralui-angular/data/dashboard-grid'
import type {
    MDashboardGridItem,
    MDashboardGridMenuActionEvent,
    MDashboardGridMenuItem,
} from '@banzamel/mineralui-angular/data/dashboard-grid'
import {mSettingsIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Widget extends MDashboardGridItem {
    readonly label: string
    readonly metric: string
}

const CATALOGUE: readonly Widget[] = [
    {id: 'revenue', span: 6, minSpan: 4, label: 'Revenue', metric: '$48,200'},
    {id: 'signups', span: 3, minSpan: 3, label: 'Signups', metric: '1,284'},
    {id: 'churn', span: 3, minSpan: 3, label: 'Churn', metric: '1.8%'},
    {id: 'tickets', span: 4, minSpan: 3, label: 'Open tickets', metric: '42'},
    {id: 'nps', span: 4, minSpan: 3, label: 'NPS', metric: '61'},
]

@Component({
    selector: 'app-dashboard-grid-catalogue',
    imports: [MButton, MCard, MCardBody, MCardHeader, MDashboardGrid, MDashboardTile, MHeading, MInline, MStack, MText],
    template: `
        <m-stack>
            <m-inline>
                @for (widget of available(); track widget.id) {
                    <button mButton size="sm" variant="outlined" (click)="add(widget)">+ {{ widget.label }}</button>
                } @empty {
                    <p mText size="sm" tone="muted">Every widget is on the dashboard.</p>
                }
            </m-inline>
            <m-dashboard-grid
                #grid
                editable
                removable
                [(layout)]="layout"
                [menuItems]="menu"
                (itemRemove)="remove($event)"
                (menuAction)="onMenu($event)"
            >
                @for (item of layout(); track item.id) {
                    <m-dashboard-tile [id]="item.id">
                        <m-card>
                            <m-card-header>
                                <h6 mHeading>{{ item.label }}</h6>
                            </m-card-header>
                            <m-card-body>
                                <p mText size="lg" weight="semibold">{{ item.metric }}</p>
                            </m-card-body>
                        </m-card>
                    </m-dashboard-tile>
                }
                <p mDashboardGridEmpty mText size="sm" tone="muted">Add a widget from the catalogue above.</p>
            </m-dashboard-grid>
            <p mText size="sm" tone="muted">{{ log() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGridCatalogueExample {
    private readonly grid = viewChild.required<MDashboardGrid<Widget>>('grid')
    private readonly injector = inject(Injector)

    protected readonly layout = signal<readonly Widget[]>(CATALOGUE.slice(0, 3))
    protected readonly available = computed(() =>
        CATALOGUE.filter((widget) => !this.layout().some((item) => item.id === widget.id))
    )
    protected readonly log = signal('Add a widget: the grid scrolls to it and focuses its handle.')

    protected readonly menu = (item: Widget): MDashboardGridMenuItem[] => [
        {id: 'configure', label: `Configure ${item.label}`, icon: mSettingsIcon},
    ]

    protected add(widget: Widget): void {
        this.layout.update((items) => [...items, widget])
        // The tile exists after the next render.
        afterNextRender(() => this.grid().focusItem(widget.id), {injector: this.injector})
    }

    protected remove(id: string): void {
        this.layout.update((items) => items.filter((item) => item.id !== id))
        this.log.set(`Removed ${id}.`)
    }

    protected onMenu(event: MDashboardGridMenuActionEvent<Widget>): void {
        this.log.set(`${event.actionId}: ${event.item.label}`)
    }
}
