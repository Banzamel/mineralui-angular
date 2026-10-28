import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDataTable, MDataTableCell, MDataTableRowDetail} from '@banzamel/mineralui-angular/data/data-table'
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
    {id: 'P-106', name: 'Olga Mazur', club: 'MKS Goniec', rating: 1950, retired: false},
]

@Component({
    selector: 'app-data-table-cards',
    imports: [MBadge, MButton, MDataTable, MDataTableCell, MDataTableRowDetail, MText],
    template: `
        <!-- A table on a wide screen; at most 768 px wide every row is a card. -->
        <m-data-table
            label="Players"
            cardsBelow="md"
            toolbarCollapseBelow="md"
            sortable
            selectable
            searchable
            rowClick="activate"
            [columns]="columns"
            [data]="players"
            [filterKeys]="[{key: 'club', label: 'Club'}]"
            [(selected)]="selected"
            (rowActivate)="opened.set($event.name)"
        >
            <ng-template mCell="status" [mCellOf]="players" let-player>
                <m-badge size="sm" [color]="player.retired ? 'neutral' : 'success'">
                    {{ player.retired ? 'Retired' : 'Active' }}
                </m-badge>
            </ng-template>
            <ng-template mCell="actions" [mCellOf]="players" let-player>
                <button mButton size="sm" variant="ghost" (click)="messaged.set(player.name)">Message</button>
            </ng-template>
            <ng-template mRowDetail [mRowDetailOf]="players" let-player>
                <span mText size="sm" tone="muted">Player id {{ player.id }}, rating {{ player.rating }}.</span>
            </ng-template>
        </m-data-table>
        <span mText size="sm" tone="muted" class="app-cards-state" aria-live="polite">
            {{ selected().length }} selected
            @if (opened(); as name) {
                · opened {{ name }}
            }
            @if (messaged(); as name) {
                · message to {{ name }}
            }
        </span>
    `,
    styles: `
        .app-cards-state {
            display: block;
            margin-top: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableCardsExample {
    protected readonly players = PLAYERS
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'name', label: 'Player', rowHeader: true},
        {key: 'club', label: 'Club'},
        {key: 'rating', label: 'Rating', align: 'right'},
        {key: 'status', label: 'Status', sortable: false},
        {key: 'actions', label: 'Actions', sortable: false},
    ]
    protected readonly selected = signal<readonly string[]>([])
    protected readonly opened = signal<string | null>(null)
    protected readonly messaged = signal<string | null>(null)
}
