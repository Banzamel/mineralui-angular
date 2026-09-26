import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTreeView} from '@banzamel/mineralui-angular/data/tree-view'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import treeViewFiles from '@generated/examples/data/tree-view/tree-view-files'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {CATEGORY_TREE} from '../tree-samples'

@Component({
    selector: 'doc-tree-view-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MStack, MText, MTreeView],
    template: `
        <doc-article
            title="MTreeView"
            description="Tree of files, folders or categories with selection, checkboxes, a context menu and moves by drag and drop or from the keyboard."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack>
                        <m-tree-view
                            class="doc-tree-view"
                            label="Categories"
                            [items]="categories"
                            [expandable]="expandable()"
                            [selectable]="selectable()"
                            [checkable]="checkable()"
                            [showLines]="showLines()"
                            [fileIcons]="fileIcons()"
                            [draggable]="draggable()"
                            [indent]="indent()"
                            [(expanded)]="expanded"
                            [(selected)]="selected"
                            [(checked)]="checked"
                        />
                        <p mText size="sm" tone="muted">
                            selected: {{ selected() ?? 'null' }} · expanded: [{{ expanded().join(', ') }}]
                            @if (checkable()) {
                                · checked: [{{ checked().join(', ') }}]
                            }
                        </p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="File tree with moves and a context menu"
                description="draggable moves nodes into folders by drag and drop — and without a pointer: Ctrl+X on a node, Ctrl+V on a folder (or on a file inside it), also as Cut / Move here in the context menu. contextMenuItems adds your entries; the menu opens with the right button, the ContextMenu key or Shift+F10. The tree only emits (move) and (contextMenuAction) — the page updates items."
            >
                <doc-preview [example]="examples.files" />
            </doc-section>

            <doc-section
                title="Keyboard"
                description="One Tab stop (WAI-ARIA Tree View): ↑ / ↓ move between visible nodes, → opens a folder or enters it, ← closes it or goes to the parent, Home / End jump to the ends, typing a name jumps to it, * opens all folders on the level. Enter (or a click) opens / closes a folder and selects the node; Space checks it with checkable. Escape cancels a pending Ctrl+X."
            />

            <doc-section
                title="Accessibility"
                description="role='tree' named by label, treeitems with aria-level, aria-setsize, aria-posinset, aria-expanded on folders, aria-selected with selectable and aria-checked (true / false / mixed) with checkable — the checkbox is drawn, not a nested control. Disabled nodes stay focusable (aria-disabled). The context menu is a WAI-ARIA menu named after the node; moves are announced in a live region (mineralui.treeView.*)."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="defaultExpanded / expanded + onExpandChange, selected + onSelect and checked + onCheckedChange become [(expanded)], [(selected)] and [(checked)]; label is new and required. The keyboard is new (React: mouse only), and so are moving without dragging (WCAG 2.5.7), the live region, the menu keys and a named menu (React: an unnamed fixed div). Node icons and menu icons are MIconDef, menu labels strings. A node cannot be dropped into the folder it is already in. The menu is MDropdownMenu in the top layer."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MTreeView" />
                    <doc-props-table api="MTreeNode" />
                    <doc-props-table api="MTreeViewContextMenuItem" />
                    <doc-props-table api="MTreeViewMoveEvent" />
                    <doc-props-table api="MTreeViewContextMenuActionEvent" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-tree-view {
            max-width: 360px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewPage {
    protected readonly examples = {files: treeViewFiles}
    protected readonly categories = CATEGORY_TREE

    protected readonly expanded = signal<readonly string[]>(['electronics', 'phones'])
    protected readonly selected = signal<string | null>(null)
    protected readonly checked = signal<readonly string[]>([])

    protected readonly expandable = signal(true)
    protected readonly selectable = signal(true)
    protected readonly checkable = signal(false)
    protected readonly showLines = signal(true)
    protected readonly fileIcons = signal(true)
    protected readonly draggable = signal(false)
    protected readonly indent = signal(20)
    protected readonly controls = [
        booleanControl('expandable', this.expandable),
        booleanControl('selectable', this.selectable),
        booleanControl('checkable', this.checkable),
        booleanControl('showLines', this.showLines),
        booleanControl('fileIcons', this.fileIcons),
        booleanControl('draggable', this.draggable),
        sliderControl('indent', this.indent, {min: 12, max: 32, step: 2}),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Categories"',
            '[items]="categories"',
            !this.expandable() && '[expandable]="false"',
            this.selectable() && 'selectable',
            this.checkable() && 'checkable',
            !this.showLines() && '[showLines]="false"',
            !this.fileIcons() && '[fileIcons]="false"',
            this.draggable() && 'draggable',
            this.indent() !== 20 && `[indent]="${this.indent()}"`,
            '[(expanded)]="expanded"',
            this.selectable() && '[(selected)]="selected"',
            this.checkable() && '[(checked)]="checked"',
            this.draggable() && '(move)="onMove($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-tree-view\n    ${attrs.join('\n    ')}\n/>`
    })
}
