import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Player {
    readonly id: string
    readonly name: string
    readonly club: string
    readonly rating: number
    readonly retired: boolean
}

const PLAYERS: readonly Player[] = [
    {id: 'P-101', name: 'Anna Kowalska', club: 'KS Hetman', rating: 2210, retired: false},
    {id: 'P-102', name: 'Jan Nowak', club: 'UKS Wieża', rating: 1985, retired: true},
    {id: 'P-103', name: 'Ewa Zielińska', club: 'KS Hetman', rating: 2104, retired: false},
    {id: 'P-104', name: 'Piotr Wójcik', club: 'MKS Goniec', rating: 1876, retired: false},
    {id: 'P-105', name: 'Marek Lewandowski', club: 'UKS Wieża', rating: 2033, retired: true},
]

@Component({
    selector: 'app-data-table-activate',
    imports: [MBadge, MButton, MDataTable, MDataTableCell, MText],
    template: `
        <!-- The rows are one tab stop: Tab in, ↑ / ↓ / Home / End between rows, Enter opens. -->
        <m-data-table
            label="Players"
            rowClick="activate"
            [columns]="columns"
            [data]="players"
            [rowClass]="rowClass"
            (rowActivate)="opened.set($event)"
        >
            <ng-template mCell="status" [mCellOf]="players" let-player>
                <m-badge size="sm" [color]="player.retired ? 'neutral' : 'success'">
                    {{ player.retired ? 'Retired' : 'Active' }}
                </m-badge>
            </ng-template>
            <ng-template mCell="actions" [mCellOf]="players" let-player>
                <!-- A control in a cell keeps its own click and stays reachable with Tab. -->
                <button mButton size="sm" variant="ghost" (click)="messaged.set(player.name)">Message</button>
            </ng-template>
        </m-data-table>
        <span mText size="sm" tone="muted" class="app-activate-state" aria-live="polite">
            @if (opened(); as player) {
                Opened {{ player.name }} ({{ player.id }})
            } @else {
                Click a row or press Enter on it
            }
            @if (messaged(); as name) {
                · message to {{ name }}
            }
        </span>
    `,
    styles: `
        .app-activate-state {
            display: block;
            margin-top: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableActivateExample {
    protected readonly players = PLAYERS
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'name', label: 'Player', rowHeader: true},
        {key: 'club', label: 'Club'},
        {key: 'rating', label: 'Rating', align: 'right'},
        {key: 'status', label: 'Status'},
        {key: 'actions', label: 'Actions', align: 'right'},
    ]
    protected readonly opened = signal<Player | null>(null)
    protected readonly messaged = signal<string | null>(null)
    // Classes land on the row's <tr> (outside this component's view): a global utility class dims retired players.
    protected readonly rowClass = (player: Player) => (player.retired ? 'm-fcolor-muted' : null)
}
