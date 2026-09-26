import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MAvatar} from '@banzamel/mineralui-angular/media/avatar'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Member {
    readonly email: string
    readonly name: string
    readonly role: string
    readonly department: string
    readonly projects: number
    readonly status: 'Active' | 'On leave' | 'Probation'
    readonly avatar: string
}

const PHOTO = 'https://images.unsplash.com/photo-'
const FACE = '?w=120&h=120&fit=crop&crop=face'

@Component({
    selector: 'app-data-table-selection',
    imports: [MAvatar, MBadge, MButton, MDataTable, MDataTableCell, MText],
    template: `
        <div class="app-selection-bar">
            <span mText size="sm" aria-live="polite">{{ selected().length }} of {{ members.length }} selected</span>
            <button mButton size="sm" variant="outlined" [disabled]="!selected().length" (click)="selected.set([])">
                Clear selection
            </button>
        </div>
        <m-data-table
            label="Team members"
            selectable
            striped
            [columns]="columns"
            [data]="members"
            rowKey="email"
            [(selected)]="selected"
        >
            <ng-template mCell="name" [mCellOf]="members" let-member>
                <span class="app-member">
                    <m-avatar size="sm" [src]="member.avatar" [name]="member.name" />
                    <span class="app-cell">
                        <span mText weight="semibold">{{ member.name }}</span>
                        <span mText tone="muted" size="sm">{{ member.email }}</span>
                    </span>
                </span>
            </ng-template>
            <ng-template mCell="role" [mCellOf]="members" let-member>
                <span class="app-cell">
                    <span mText>{{ member.role }}</span>
                    <span mText tone="muted" size="sm">{{ member.department }}</span>
                </span>
            </ng-template>
            <ng-template mCell="projects" let-value="value">
                <m-badge color="neutral">{{ value }}</m-badge>
            </ng-template>
            <ng-template mCell="status" [mCellOf]="members" let-member>
                <m-badge [color]="statusColor(member.status)">{{ member.status }}</m-badge>
            </ng-template>
        </m-data-table>
    `,
    styles: `
        .app-selection-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--mineral-spacing-sm);
            margin-bottom: var(--mineral-spacing-sm);
        }

        .app-member {
            display: flex;
            align-items: center;
            gap: var(--mineral-spacing-sm);
        }

        .app-cell {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableSelectionExample {
    protected readonly selected = signal<readonly string[]>(['mei.zhang@company.com'])
    protected readonly members: readonly Member[] = [
        {
            email: 'anna.kowalska@company.com',
            name: 'Anna Kowalska',
            role: 'Lead Engineer',
            department: 'Engineering',
            projects: 8,
            status: 'Active',
            avatar: `${PHOTO}1494790108377-be9c29b29330${FACE}`,
        },
        {
            email: 'carlos.rivera@company.com',
            name: 'Carlos Rivera',
            role: 'Product Designer',
            department: 'Design',
            projects: 5,
            status: 'Active',
            avatar: `${PHOTO}1472099645785-5658abf4ff4e${FACE}`,
        },
        {
            email: 'mei.zhang@company.com',
            name: 'Mei Zhang',
            role: 'Data Analyst',
            department: 'Analytics',
            projects: 3,
            status: 'On leave',
            avatar: `${PHOTO}1534528741775-53994a69daeb${FACE}`,
        },
        {
            email: 'james.obrien@company.com',
            name: "James O'Brien",
            role: 'DevOps Engineer',
            department: 'Infrastructure',
            projects: 12,
            status: 'Active',
            avatar: `${PHOTO}1507003211169-0a1dd7228f2d${FACE}`,
        },
        {
            email: 'sofia.petrov@company.com',
            name: 'Sofia Petrov',
            role: 'QA Engineer',
            department: 'Engineering',
            projects: 2,
            status: 'Probation',
            avatar: `${PHOTO}1438761681033-6461ffad8d80${FACE}`,
        },
    ]
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'name', label: 'Member'},
        {key: 'role', label: 'Role'},
        {key: 'projects', label: 'Projects', align: 'right'},
        {key: 'status', label: 'Status'},
    ]

    protected statusColor(status: Member['status']): MColor {
        if (status === 'Active') return 'success'
        return status === 'On leave' ? 'warning' : 'info'
    }
}
