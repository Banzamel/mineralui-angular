import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import {MIcon, mCopyIcon, mEditIcon, mShareIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {
    MDropdownDivider,
    MDropdownGroup,
    MDropdownItem,
    MDropdownMenu,
} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import type {MPopoverPlacement} from '@banzamel/mineralui-angular/primitives/popover'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import dropdownIsolated from '@generated/examples/overlays/dropdown-menu/dropdown-isolated'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const PLACEMENTS: readonly MPopoverPlacement[] = ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start']

@Component({
    selector: 'doc-dropdown-menu-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MCode,
        MDropdownDivider,
        MDropdownGroup,
        MDropdownItem,
        MDropdownMenu,
        MIcon,
        MList,
        MListItem,
        MPopoverTrigger,
    ],
    template: `
        <doc-article
            title="MDropdownMenu"
            description="Accessible dropdown menu with keyboard navigation, mixed button and link items, color variants and grouped sections."
        >
            <doc-section
                title="Playground"
                description="Open the menu with the mouse or with Enter / Space, then use the arrows."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <button mButton size="sm" [mPopoverTrigger]="menu">Actions</button>
                    <m-dropdown-menu #menu [placement]="placement()" [closeOnSelect]="closeOnSelect()">
                        <m-dropdown-group label="Edit">
                            <button mDropdownItem (click)="run('Rename')">
                                <m-icon mStart [icon]="icons.edit" />Rename
                            </button>
                            <button mDropdownItem (click)="run('Duplicate')">
                                <m-icon mStart [icon]="icons.copy" />Duplicate
                            </button>
                            <button mDropdownItem disabled>
                                <m-icon mStart [icon]="icons.share" />Share (no access)
                            </button>
                        </m-dropdown-group>
                        <m-dropdown-divider />
                        <a mDropdownItem href="#dropdown-links">Open documentation</a>
                        <button mDropdownItem color="error" (click)="run('Delete')">
                            <m-icon mStart [icon]="icons.trash" />Delete
                        </button>
                    </m-dropdown-menu>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Inside a clickable card"
                description="isolateClick keeps item clicks from reaching a clickable parent; stop the trigger's own click with $event.stopPropagation()."
            >
                <doc-preview [example]="examples.dropdownIsolated" />
            </doc-section>

            <doc-section title="Keyboard and focus">
                <ul mList>
                    <li mListItem>
                        Opening moves focus to the first item. ↑ / ↓, Home / End and type-ahead move between items
                        (disabled ones are skipped); Enter or Space chooses one.
                    </li>
                    <li mListItem>
                        Escape, Tab or a click outside close the menu; focus returns to the trigger.
                        <code mCode>(closed)</code> reports the reason (<code mCode>select</code>,
                        <code mCode>escape</code>, <code mCode>outside</code>, <code mCode>tab</code>,
                        <code mCode>trigger</code>).
                    </li>
                    <li mListItem>
                        The trigger gets <code mCode>aria-haspopup="menu"</code>, <code mCode>aria-expanded</code> and
                        names the menu (<code mCode>aria-labelledby</code>).
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Differences from MineralUI for React">
                <ul mList>
                    <li mListItem>
                        <code mCode>trigger</code> prop → your own element with
                        <code mCode>[mPopoverTrigger]="menu"</code>; <code mCode>MDropdownItem label icon href</code> →
                        <code mCode>button[mDropdownItem]</code> / <code mCode>a[mDropdownItem]</code> with the label as
                        content and the icon in <code mCode>mStart</code>; routing through
                        <code mCode>routerLink</code> on the <code mCode>a</code>.
                    </li>
                    <li mListItem>
                        No <code mCode>openOn="hover"</code> (a menu that opens on hover cannot be used from the
                        keyboard or a touch screen) and no <code mCode>active</code> on items — the highlight follows
                        focus.
                    </li>
                    <li mListItem>
                        React keeps focus on the trigger (the items are never focused) and its trigger is a
                        <code mCode>div role="button"</code> around your button.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="MDropdownMenu API">
                <doc-props-table api="MDropdownMenu" />
            </doc-section>

            <doc-section title="Items, groups and dividers">
                <doc-props-table api="MDropdownItem" />
                <doc-props-table api="MDropdownGroup" />
                <doc-props-table api="MDropdownDivider" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuPage {
    protected readonly examples = {dropdownIsolated}
    protected readonly icons = {edit: mEditIcon, copy: mCopyIcon, share: mShareIcon, trash: mTrashIcon}
    private readonly toast = inject(MToastService)

    protected readonly placement = signal<MPopoverPlacement>('bottom-start')
    protected readonly closeOnSelect = signal(true)
    protected readonly controls = [
        selectControl('placement', this.placement, PLACEMENTS),
        booleanControl('closeOnSelect', this.closeOnSelect),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '#menu',
            this.placement() !== 'bottom-start' && `placement="${this.placement()}"`,
            !this.closeOnSelect() && '[closeOnSelect]="false"',
        ].filter((attr) => attr !== false)
        return `<button mButton [mPopoverTrigger]="menu">Actions</button>

<m-dropdown-menu ${attrs.join(' ')}>
    <m-dropdown-group label="Edit">
        <button mDropdownItem (click)="rename()"><m-icon mStart [icon]="editIcon" />Rename</button>
        <button mDropdownItem disabled>Share (no access)</button>
    </m-dropdown-group>
    <m-dropdown-divider />
    <a mDropdownItem href="/docs">Open documentation</a>
    <button mDropdownItem color="error" (click)="remove()">Delete</button>
</m-dropdown-menu>`
    })

    protected run(action: string): void {
        this.toast.show({title: action, color: 'info', duration: 1600})
    }
}
