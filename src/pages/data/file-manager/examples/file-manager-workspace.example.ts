import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MFileManager, MFileManagerPreview} from '@banzamel/mineralui-angular/data/file-manager'
import type {
    MFileManagerActionEvent,
    MFileManagerItemActionEvent,
    MFileManagerNode,
    MFileManagerToolbarAction,
} from '@banzamel/mineralui-angular/data/file-manager'
import {mFolderPlusIcon, mUploadIcon} from '@banzamel/mineralui-angular/icons'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const START: readonly MFileManagerNode[] = [
    {
        id: 'photos',
        label: 'Photos',
        kind: 'folder',
        children: [
            {id: 'beach', label: 'beach.jpg', size: 1_840_000, modifiedAt: '2026-08-14T18:20:00Z'},
            {id: 'forest', label: 'forest.jpg', size: 2_260_000, modifiedAt: '2026-08-16T07:45:00Z'},
        ],
    },
    {id: 'invoices', label: 'Invoices', kind: 'folder', children: []},
    {id: 'plan', label: 'plan.md', size: 3_100, description: 'Trip plan and budget'},
]

function without(nodes: readonly MFileManagerNode[], id: string): MFileManagerNode[] {
    return nodes
        .filter((node) => node.id !== id)
        .map((node) => (node.children ? {...node, children: without(node.children, id)} : node))
}

function withChild(nodes: readonly MFileManagerNode[], folderId: string | null, child: MFileManagerNode) {
    if (folderId === null) return [...nodes, child]
    const add = (list: readonly MFileManagerNode[]): MFileManagerNode[] =>
        list.map((node) =>
            node.id === folderId
                ? {...node, children: [...(node.children ?? []), child]}
                : node.children
                  ? {...node, children: add(node.children)}
                  : node
        )
    return add(nodes)
}

@Component({
    selector: 'app-file-manager-workspace',
    imports: [MFileManager, MFileManagerPreview, MText],
    template: `
        <m-file-manager
            actions
            [items]="files()"
            [toolbarActions]="toolbar"
            [(folderId)]="folderId"
            [(selected)]="selected"
            (toolbarAction)="onToolbar($event)"
            (itemAction)="onItem($event)"
            (itemOpen)="log.set('Open ' + $event.label)"
        >
            <ng-template mFileManagerPreview let-node>
                @if (node.label.endsWith('.jpg')) {
                    <img
                        width="320"
                        height="180"
                        [src]="'https://picsum.photos/seed/' + node.id + '/320/180'"
                        [alt]="node.label"
                    />
                } @else {
                    <span mText tone="muted">No preview for {{ node.label }}</span>
                }
            </ng-template>
        </m-file-manager>
        <p mText size="sm" tone="muted">{{ log() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerWorkspaceExample {
    protected readonly files = signal<readonly MFileManagerNode[]>(START)
    protected readonly folderId = signal<string | null>('photos')
    protected readonly selected = signal<string | null>('beach')
    protected readonly log = signal('Double-click a file, or use the item menus.')
    protected readonly toolbar: readonly MFileManagerToolbarAction[] = [
        {id: 'upload', label: 'Upload', icon: mUploadIcon, variant: 'filled'},
        {id: 'new-folder', label: 'New folder', icon: mFolderPlusIcon},
    ]
    private created = 0

    protected onToolbar(event: MFileManagerActionEvent): void {
        if (event.actionId === 'new-folder') this.addFolder(event.activeFolderId)
        else this.log.set(`${event.actionId} into ${event.activeFolder?.label ?? 'Home'}`)
    }

    protected onItem(event: MFileManagerItemActionEvent): void {
        if (event.actionId === 'delete') {
            this.files.set(without(this.files(), event.node.id))
            if (this.selected() === event.node.id) this.selected.set(null)
        } else if (event.actionId === 'new-folder') {
            this.addFolder(event.node.id)
        }
        this.log.set(`${event.actionId}: ${event.node.label}`)
    }

    private addFolder(parentId: string | null): void {
        this.created += 1
        const folder: MFileManagerNode = {
            id: `folder-${this.created}`,
            label: `New folder ${this.created}`,
            kind: 'folder',
        }
        this.files.set(withChild(this.files(), parentId, folder))
    }
}
