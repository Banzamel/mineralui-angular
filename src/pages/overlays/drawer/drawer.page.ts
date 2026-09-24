import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDrawer, MDrawerBody, MDrawerFooter, MDrawerHeader} from '@banzamel/mineralui-angular/overlays/drawer'
import type {MDrawerSide, MDrawerSize} from '@banzamel/mineralui-angular/overlays/drawer'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import drawerNavigation from '@generated/examples/overlays/drawer/drawer-navigation'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIDES: readonly MDrawerSide[] = ['right', 'left', 'bottom']
const SIZES: readonly MDrawerSize[] = ['sm', 'md', 'lg', 'full']

@Component({
    selector: 'doc-drawer-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MCode,
        MDrawer,
        MDrawerBody,
        MDrawerFooter,
        MDrawerHeader,
        MList,
        MListItem,
        MText,
    ],
    template: `
        <doc-article
            title="MDrawer"
            description="Slide-out panel from the edge of the screen for secondary content, settings or navigation."
        >
            <doc-section title="Playground" description="Toggle inputs and open the drawer to test combinations.">
                <doc-playground [controls]="controls" [code]="code()">
                    <button mButton size="sm" (click)="open.set(true)">Open drawer</button>
                    <m-drawer
                        [(open)]="open"
                        [side]="side()"
                        [size]="size()"
                        [overlay]="overlay()"
                        [closeOnBackdrop]="closeOnBackdrop()"
                        [closeOnEscape]="closeOnEscape()"
                    >
                        <m-drawer-header bordered>Settings</m-drawer-header>
                        <m-drawer-body>
                            <p mText tone="muted">
                                This is a drawer panel sliding in from the {{ side() }} side. It can hold forms,
                                settings, details or any secondary content.
                            </p>
                        </m-drawer-body>
                        <m-drawer-footer bordered>
                            <button mButton variant="outlined" (click)="open.set(false)">Close</button>
                        </m-drawer-footer>
                    </m-drawer>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Navigation with lazy content"
                description="Content in <ng-template mDrawerContent> becomes the body and exists only while the drawer is open; the header stays outside the template."
            >
                <doc-preview [example]="examples.drawerNavigation" />
            </doc-section>

            <doc-section title="Behaviour">
                <ul mList>
                    <li mListItem>
                        With the overlay the drawer is a native modal <code mCode>&lt;dialog&gt;</code> in the top
                        layer: the page is dimmed, inert and does not scroll.
                    </li>
                    <li mListItem>
                        With <code mCode>[overlay]="false"</code> it is a non-modal dialog: the page stays usable, Tab
                        can leave the drawer, and a press outside it closes it (unless
                        <code mCode>closeOnBackdrop</code> is off).
                    </li>
                    <li mListItem>
                        Focus moves to the element with <code mCode>autofocus</code>, otherwise to the panel, and
                        returns after closing. The header title names the dialog; without a header, set
                        <code mCode>ariaLabel</code>.
                    </li>
                    <li mListItem>
                        <code mCode>(closed)</code> reports why the drawer closed itself: <code mCode>escape</code>,
                        <code mCode>backdrop</code> or <code mCode>button</code> (the header close button).
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Differences from MineralUI for React">
                <ul mList>
                    <li mListItem>
                        <code mCode>open</code> + <code mCode>onClose</code> → <code mCode>[(open)]</code> and
                        <code mCode>(closed)</code>. The sections are elements:
                        <code mCode>&lt;m-drawer-header&gt;</code>, <code mCode>&lt;m-drawer-body&gt;</code>,
                        <code mCode>&lt;m-drawer-footer&gt;</code>; content outside them becomes the body, as in React.
                    </li>
                    <li mListItem>
                        React keeps focus behind the drawer and marks every drawer <code mCode>aria-modal</code>; here
                        focus moves in and back, the drawer is named by its header, and without the overlay the page is
                        not blocked (React still covers it with a transparent backdrop).
                    </li>
                    <li mListItem>The header close button has a translatable label (mineralui.drawer.close).</li>
                </ul>
            </doc-section>

            <doc-section title="MDrawer API">
                <doc-props-table api="MDrawer" />
            </doc-section>

            <doc-section title="Sections">
                <doc-props-table api="MDrawerHeader" />
                <doc-props-table api="MDrawerBody" />
                <doc-props-table api="MDrawerFooter" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerPage {
    protected readonly examples = {drawerNavigation}

    protected readonly open = signal(false)
    protected readonly side = signal<MDrawerSide>('right')
    protected readonly size = signal<MDrawerSize>('md')
    protected readonly overlay = signal(true)
    protected readonly closeOnBackdrop = signal(true)
    protected readonly closeOnEscape = signal(true)
    protected readonly controls = [
        selectControl('side', this.side, SIDES),
        selectControl('size', this.size, SIZES),
        booleanControl('overlay', this.overlay),
        booleanControl('closeOnBackdrop', this.closeOnBackdrop),
        booleanControl('closeOnEscape', this.closeOnEscape),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[(open)]="open"',
            this.side() !== 'right' && `side="${this.side()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.overlay() && '[overlay]="false"',
            !this.closeOnBackdrop() && '[closeOnBackdrop]="false"',
            !this.closeOnEscape() && '[closeOnEscape]="false"',
        ].filter((attr) => attr !== false)
        return `<m-drawer ${attrs.join(' ')}>
    <m-drawer-header bordered>Settings</m-drawer-header>
    <m-drawer-body>
        <p mText>Drawer content here.</p>
    </m-drawer-body>
    <m-drawer-footer bordered>
        <button mButton variant="outlined" (click)="open.set(false)">Close</button>
    </m-drawer-footer>
</m-drawer>`
    })
}
