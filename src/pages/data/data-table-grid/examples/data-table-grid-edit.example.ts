import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MDataTableCellEdit, MDataTableGrid} from '@banzamel/mineralui-angular/data/data-table-grid'
import type {MDataTableCellEditEvent} from '@banzamel/mineralui-angular/data/data-table-grid'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption} from '@banzamel/mineralui-angular/dropdowns/select'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Player {
    readonly id: string
    readonly name: string
    readonly club: string
    readonly board: number
    readonly role: string
}

const ROLES: readonly MSelectOption[] = ['Captain', 'Player', 'Reserve'].map((role) => ({value: role, label: role}))

@Component({
    selector: 'app-data-table-grid-edit',
    imports: [MBadge, MDataTable, MDataTableCell, MDataTableCellEdit, MDataTableGrid, MInput, MSelect, MText],
    template: `
        <!-- One tab stop: arrows move between cells, Enter / F2 edits the board and role cells, Escape cancels. -->
        <m-data-table
            label="Team line-up"
            sortable
            selectable
            [columns]="columns"
            [data]="players()"
            [mDataTableGrid]="players()"
            (cellEdit)="save($event)"
        >
            <ng-template mCell="role" [mCellOf]="players()" let-player>
                <m-badge size="sm" [color]="player.role === 'Captain' ? 'primary' : 'neutral'">{{
                    player.role
                }}</m-badge>
            </ng-template>
            <!-- A text field: bind it to the draft — Enter, F2 or Tab commits the draft. -->
            <ng-template mCellEdit="board" [mCellEditOf]="players()" let-draft="draft">
                <m-input
                    size="sm"
                    type="number"
                    ariaLabel="Board"
                    [value]="'' + draft()"
                    (valueChange)="draft.set($event)"
                />
            </ng-template>
            <!-- A select commits its choice at once; its own Enter and Escape stay with the list. -->
            <ng-template mCellEdit="role" [mCellEditOf]="players()" let-value="value" let-commit="commit">
                <m-select ariaLabel="Role" size="sm" [options]="roles" [value]="value" (valueChange)="commit($event)" />
            </ng-template>
        </m-data-table>
        <span mText size="sm" tone="muted" class="app-grid-state" aria-live="polite">{{ lastEdit() }}</span>
    `,
    styles: `
        .app-grid-state {
            display: block;
            margin-top: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableGridEditExample {
    protected readonly roles = ROLES
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'name', label: 'Player', rowHeader: true},
        {key: 'club', label: 'Club'},
        {key: 'board', label: 'Board', align: 'right', width: 120},
        {key: 'role', label: 'Role', width: 180},
    ]
    protected readonly players = signal<readonly Player[]>([
        {id: 'P-101', name: 'Anna Kowalska', club: 'KS Hetman', board: 1, role: 'Captain'},
        {id: 'P-102', name: 'Jan Nowak', club: 'UKS Wieża', board: 2, role: 'Player'},
        {id: 'P-103', name: 'Ewa Zielińska', club: 'KS Hetman', board: 3, role: 'Player'},
        {id: 'P-104', name: 'Piotr Wójcik', club: 'MKS Goniec', board: 4, role: 'Reserve'},
    ])
    protected readonly lastEdit = signal('Focus a cell and press Enter or F2 on Board or Role')

    // The grid only reports the edit: the data is yours to update (here a signal, in an app the store or server).
    protected save(edit: MDataTableCellEditEvent<Player>): void {
        const value = edit.key === 'board' ? Number(edit.value) : String(edit.value)
        if (typeof value === 'number' && (!Number.isInteger(value) || value < 1)) {
            this.lastEdit.set(`Board must be a positive whole number — ${edit.row.name} keeps ${edit.previous}`)
            return
        }
        this.players.update((players) =>
            players.map((player) => (player.id === edit.row.id ? {...player, [edit.key]: value} : player))
        )
        this.lastEdit.set(`${edit.row.name}: ${edit.key} ${edit.previous} → ${value}`)
    }
}
