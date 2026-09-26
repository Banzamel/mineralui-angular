import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTreeView} from '@banzamel/mineralui-angular/data/tree-view'
import type {
    MTreeNode,
    MTreeViewContextMenuActionEvent,
    MTreeViewContextMenuItem,
    MTreeViewMoveEvent,
} from '@banzamel/mineralui-angular/data/tree-view'
import {mEditIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const START: readonly MTreeNode[] = [
    {
        id: 'workspace',
        label: 'workspace',
        kind: 'folder',
        children: [
            {
                id: 'src',
                label: 'src',
                kind: 'folder',
                children: [
                    {
                        id: 'api',
                        label: 'api',
                        kind: 'folder',
                        children: [
                            {id: 'sync-client', label: 'syncClient.ts'},
                            {id: 'exports', label: 'exports.pdf'},
                        ],
                    },
                    {id: 'types', label: 'types.ts'},
                ],
            },
            {
                id: 'assets',
                label: 'assets',
                kind: 'folder',
                children: [
                    {id: 'brief', label: 'brief.pdf'},
                    {id: 'logo', label: 'logo.svg'},
                ],
            },
            {id: 'readme', label: 'README.md'},
        ],
    },
]

/** Removes a node from the tree and returns it with the remaining tree. */
function detach(nodes: readonly MTreeNode[], id: string): [MTreeNode[], MTreeNode | null] {
    let found: MTreeNode | null = null
    const rest = nodes
        .filter((node) => {
            if (node.id !== id) return true
            found = node
            return false
        })
        .map((node) => {
            if (found || !node.children) return node
            const [children, inner] = detach(node.children, id)
            found = inner
            return {...node, children}
        })
    return [rest, found]
}

function insert(nodes: readonly MTreeNode[], targetId: string, moved: MTreeNode): MTreeNode[] {
    return nodes.map((node) =>
        node.id === targetId
            ? {...node, children: [...(node.children ?? []), moved]}
            : {...node, children: node.children && insert(node.children, targetId, moved)}
    )
}

@Component({
    selector: 'app-tree-view-files',
    imports: [MText, MTreeView],
    template: `
        <m-tree-view
            class="app-tree-view-files"
            label="Workspace files"
            selectable
            draggable
            [items]="files()"
            [contextMenuItems]="menu"
            [(expanded)]="expanded"
            [(selected)]="selected"
            (move)="onMove($event)"
            (contextMenuAction)="onAction($event)"
        />
        <p mText size="sm" tone="muted">{{ log() }}</p>
    `,
    styles: `
        .app-tree-view-files {
            max-width: 360px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewFilesExample {
    protected readonly files = signal<readonly MTreeNode[]>(START)
    protected readonly expanded = signal<readonly string[]>(['workspace', 'src', 'assets'])
    protected readonly selected = signal<string | null>(null)
    protected readonly log = signal('Right-click a node, or focus it and press Shift+F10.')

    protected readonly menu = (node: MTreeNode): MTreeViewContextMenuItem[] => [
        {id: 'rename', label: 'Rename', icon: mEditIcon},
        {id: 'delete', label: `Delete ${node.label}`, icon: mTrashIcon, color: 'error'},
    ]

    protected onMove(event: MTreeViewMoveEvent): void {
        const [rest, moved] = detach(this.files(), event.draggedId)
        if (!moved) return
        this.files.set(insert(rest, event.targetId, moved))
        this.log.set(`Moved ${event.draggedNode.label} to ${event.targetNode.label}.`)
    }

    protected onAction(event: MTreeViewContextMenuActionEvent): void {
        if (event.actionId === 'delete') this.files.set(detach(this.files(), event.node.id)[0])
        this.log.set(`${event.actionId}: ${event.node.label}`)
    }
}
