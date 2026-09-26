import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardDocumentTree} from '@banzamel/mineralui-angular/cards/card-document-tree'
import type {MCardDocumentTreeAction} from '@banzamel/mineralui-angular/cards/card-document-tree'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MTreeNode} from '@banzamel/mineralui-angular/data/tree-view'
import type {MDetailListItem} from '@banzamel/mineralui-angular/display/detail-list'
import {mDocIcon, mDownloadIcon, mSendIcon, mTrashIcon, mUploadIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

const INVOICES: readonly MTreeNode[] = [
    {
        id: 'workspace',
        label: 'Billing workspace',
        kind: 'folder',
        children: [
            {
                id: 'needs-action',
                label: 'Needs action',
                kind: 'folder',
                children: [
                    {id: 'fv-220', label: 'FV/04/220 - Kowalski family', kind: 'file', icon: mDocIcon},
                    {id: 'pro-16', label: 'PRO/04/16 - Trial class', kind: 'file', icon: mDocIcon},
                ],
            },
            {
                id: 'paid',
                label: 'Paid',
                kind: 'folder',
                children: [{id: 'fv-188', label: 'FV/03/188 - Wisniewski family', kind: 'file', icon: mDocIcon}],
            },
        ],
    },
]

const DETAILS: Readonly<Record<string, {heading: string; meta: string; items: MDetailListItem[]}>> = {
    'fv-220': {
        heading: 'FV/04/220',
        meta: 'Issued 1 Apr · due today',
        items: [
            {label: 'Family', value: 'Kowalski family'},
            {label: 'Amount', value: '640 PLN', status: 'Due today'},
        ],
    },
    'pro-16': {
        heading: 'PRO/04/16',
        meta: 'Pro forma · draft',
        items: [
            {label: 'Family', value: 'Trial class'},
            {label: 'Amount', value: '120 PLN', status: 'Draft'},
        ],
    },
    'fv-188': {
        heading: 'FV/03/188',
        meta: 'Issued 12 Mar · paid 20 Mar',
        items: [
            {label: 'Family', value: 'Wisniewski family'},
            {label: 'Amount', value: '520 PLN', status: 'Paid'},
        ],
    },
}

@Component({
    selector: 'doc-card-document-tree-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MButton, MCardDocumentTree, MIcon, MStack],
    template: `
        <doc-article
            title="MCardDocumentTree"
            description="Card pairing a selectable document tree with the details of the selected document."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-card-document-tree
                        heading="Invoices"
                        [description]="showDescription() ? 'Documents grouped by payment status' : undefined"
                        [color]="color()"
                        [items]="invoices"
                        [detailsHeading]="details()?.heading"
                        [detailsMeta]="details()?.meta"
                        [detailsItems]="details()?.items ?? []"
                        [detailsActions]="showActions() && details() ? actions : []"
                        [(selected)]="selected"
                        [(expanded)]="expanded"
                        (detailsAction)="lastAction.set($event)"
                    >
                        @if (showPrimaryAction()) {
                            <button mButton mCardDocumentTreeAction size="sm">
                                <m-icon mStart [icon]="uploadIcon" />
                                Upload
                            </button>
                        }
                    </m-card-document-tree>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The tree is a full MTreeView named by the card heading (keyboard, aria-selected). The actions button is named by mineralui.documentTree.actions and opens a WAI-ARIA menu; the details follow the selection."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="title is heading (ADR 0004) and names the tree; primaryAction and renderDetails are slots ([mCardDocumentTreeAction], [mCardDocumentTreeDetails]); detailsTitle is detailsHeading; actions report (detailsAction) with the id instead of per-action onClick / href. selected + onSelect and expanded + onExpandChange are [(selected)] / [(expanded)]. The texts hard-coded in React (Documents, the empty details text, the button name) are mineralui.documentTree.*. The two columns follow the card width, not the viewport."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MCardDocumentTree" />
                    <doc-props-table api="MCardDocumentTreeAction" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocumentTreePage {
    protected readonly invoices = INVOICES
    protected readonly uploadIcon = mUploadIcon
    protected readonly actions: readonly MCardDocumentTreeAction[] = [
        {id: 'download', label: 'Download PDF', icon: mDownloadIcon},
        {id: 'send', label: 'Send reminder', icon: mSendIcon},
        {id: 'delete', label: 'Delete', icon: mTrashIcon, color: 'error'},
    ]

    protected readonly selected = signal<string | null>('fv-220')
    protected readonly expanded = signal<readonly string[]>(['workspace', 'needs-action'])
    protected readonly lastAction = signal<string | null>(null)
    protected readonly details = computed(() => DETAILS[this.selected() ?? ''])

    protected readonly color = signal<MColor>('primary')
    protected readonly showDescription = signal(true)
    protected readonly showActions = signal(true)
    protected readonly showPrimaryAction = signal(true)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        booleanControl('description', this.showDescription),
        booleanControl('detailsActions', this.showActions),
        booleanControl('primaryAction', this.showPrimaryAction),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'heading="Invoices"',
            this.showDescription() && 'description="Documents grouped by payment status"',
            this.color() !== 'primary' && `color="${this.color()}"`,
            '[items]="invoices"',
            '[detailsHeading]="details()?.heading"',
            '[detailsMeta]="details()?.meta"',
            '[detailsItems]="details()?.items ?? []"',
            this.showActions() && '[detailsActions]="actions"',
            '[(selected)]="selected"',
            this.showActions() && '(detailsAction)="run($event)"',
        ].filter((attr) => typeof attr === 'string')
        const slot = this.showPrimaryAction()
            ? '\n    <button mButton mCardDocumentTreeAction size="sm">Upload</button>\n'
            : ''
        return `<m-card-document-tree\n    ${attrs.join('\n    ')}\n>${slot}</m-card-document-tree>`
    })
}
