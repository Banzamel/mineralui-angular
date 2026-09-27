import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MFileManager} from '@banzamel/mineralui-angular/data/file-manager'
import type {MFileManagerNode, MFileManagerView} from '@banzamel/mineralui-angular/data/file-manager'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import fileManagerWorkspace from '@generated/examples/data/file-manager/file-manager-workspace'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VIEWS: readonly MFileManagerView[] = ['list', 'grid']

const FILES: readonly MFileManagerNode[] = [
    {
        id: 'clients',
        label: 'Clients',
        kind: 'folder',
        children: [
            {id: 'brief', label: 'campaign-brief.pdf', size: 482_000, modifiedAt: '2026-09-18T09:30:00Z'},
            {id: 'moodboard', label: 'moodboard.png', size: 2_410_000, description: 'Selected references'},
            {
                id: 'contracts',
                label: 'Contracts',
                kind: 'folder',
                children: [{id: 'nda', label: 'nda-2026.pdf', size: 128_000}],
            },
        ],
    },
    {id: 'reports', label: 'Reports', kind: 'folder', children: [{id: 'q3', label: 'q3-summary.xls', size: 96_000}]},
    {id: 'notes', label: 'meeting-notes.md', size: 4_200, modifiedAt: '2026-09-24T15:05:00Z'},
]

@Component({
    selector: 'doc-file-manager-page',
    imports: [DocArticle, DocProNotice, DocSection, DocPlayground, DocPreview, DocPropsTable, MFileManager, MStack],
    template: `
        <doc-article
            title="MFileManager"
            description="File browser with breadcrumbs, search, a folder tree, list and grid views and a preview panel."
        >
            <doc-pro-notice
                [components]="['MFileManager']"
                reason="The file manager is a higher-level workflow module of MineralUI Pro."
            />

            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-file-manager
                        [items]="files"
                        [searchable]="searchable()"
                        [showSidebar]="showSidebar()"
                        [showPreview]="showPreview()"
                        [actions]="actions()"
                        [draggable]="draggable()"
                        [(view)]="view"
                        [(expanded)]="expanded"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Workspace with actions and a preview template"
                description="The component reports and the page updates items: (toolbarAction) carries the selection, the open folder and the visible items, (itemAction) the entry of an item menu or of the tree's context menu, (itemOpen) a double click or Enter on the selected file. <ng-template mFileManagerPreview let-node> replaces the icon in the preview."
            >
                <doc-preview [example]="examples.workspace" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Breadcrumbs are a named nav with aria-current='location' on the open folder; the view switch is a pair of toggle buttons (aria-pressed); the panels are named regions. Items are buttons: Enter selects a file or opens a folder, Enter on the selected file opens it (the keyboard's double click). The folder tree is a full MTreeView (keyboard, context menu with Shift+F10, moves with Ctrl+X / Ctrl+V). Texts: mineralui.fileManager.*."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Controlled / uncontrolled pairs become models: [(folderId)], [(selected)], [(view)], [(search)], [(expanded)]. onSelectionChange is [(selected)]; onItemAction and onContextMenuAction are one (itemAction); onOpenItem is (itemOpen), also on Enter. Menus and moves need explicit actions / draggable (an output does not tell whether it is listened to). renderPreview and node.preview are one mFileManagerPreview template; description is text, icons are MIconDef. The one-column layout follows the component width, not the viewport."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MFileManager" />
                    <doc-props-table api="MFileManagerPreview" />
                    <doc-props-table api="MFileManagerNode" />
                    <doc-props-table api="MFileManagerToolbarAction" />
                    <doc-props-table api="MFileManagerActionEvent" />
                    <doc-props-table api="MFileManagerItemActionEvent" />
                    <doc-props-table api="MFileManagerMoveEvent" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerPage {
    protected readonly examples = {workspace: fileManagerWorkspace}
    protected readonly files = FILES

    protected readonly view = signal<MFileManagerView>('list')
    protected readonly expanded = signal<readonly string[]>(['clients'])
    protected readonly searchable = signal(true)
    protected readonly showSidebar = signal(true)
    protected readonly showPreview = signal(true)
    protected readonly actions = signal(false)
    protected readonly draggable = signal(false)
    protected readonly controls = [
        selectControl('view', this.view, VIEWS),
        booleanControl('searchable', this.searchable),
        booleanControl('showSidebar', this.showSidebar),
        booleanControl('showPreview', this.showPreview),
        booleanControl('actions', this.actions),
        booleanControl('draggable', this.draggable),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[items]="files"',
            !this.searchable() && '[searchable]="false"',
            !this.showSidebar() && '[showSidebar]="false"',
            !this.showPreview() && '[showPreview]="false"',
            this.actions() && 'actions',
            this.draggable() && 'draggable',
            `[(view)]="view"`,
            '[(expanded)]="expanded"',
            this.actions() && '(itemAction)="onAction($event)"',
            this.draggable() && '(move)="onMove($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-file-manager\n    ${attrs.join('\n    ')}\n/>`
    })
}
