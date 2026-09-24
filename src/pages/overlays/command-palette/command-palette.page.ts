import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import {
    mChartIcon,
    mDocIcon,
    mDownloadIcon,
    mFileIcon,
    mHomeIcon,
    mSettingsIcon,
    mUserIcon,
    mUsersIcon,
} from '@banzamel/mineralui-angular/icons'
import {MCommandPalette, MCommandPaletteFooter} from '@banzamel/mineralui-angular/overlays/command-palette'
import type {MCommandPaletteItem} from '@banzamel/mineralui-angular/overlays/command-palette'
import type {MSheetSize} from '@banzamel/mineralui-angular/overlays/sheet'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSheetSize[] = ['md', 'lg', 'full']

@Component({
    selector: 'doc-command-palette-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPropsTable,
        MCode,
        MCommandPalette,
        MCommandPaletteFooter,
        MList,
        MListItem,
        MText,
    ],
    template: `
        <doc-article
            title="MCommandPalette"
            description="Searchable command launcher in a bottom sheet: featured shortcuts on the left, grouped results on the right."
        >
            <doc-section
                title="Playground"
                description="Open it with the search button or Alt+P (the docs keep Ctrl+K for their own search)."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-command-palette
                        [items]="items"
                        shortcut="alt+p"
                        [size]="size()"
                        [closeOnSelect]="closeOnSelect()"
                        description="Jump to a module, record or action."
                        (selected)="ran($event)"
                    >
                        <p mText size="sm" tone="muted" mCommandPaletteFooter>
                            ↑ ↓ to move, Enter to run, Esc to close
                        </p>
                    </m-command-palette>
                </doc-playground>
            </doc-section>

            <doc-section title="Keyboard and screen readers">
                <ul mList>
                    <li mListItem>
                        The search field is a combobox of the result list: focus stays in it while ↑ / ↓ move the active
                        result (<code mCode>aria-activedescendant</code>); Enter runs it, Escape closes the sheet.
                    </li>
                    <li mListItem>
                        Typing filters titles, descriptions, groups, action labels and keywords; the result count is
                        announced politely.
                    </li>
                    <li mListItem>
                        <code mCode>shortcut</code> (default <code mCode>ctrl+k</code>) listens on the document; an
                        empty string turns it off. <code mCode>[showTrigger]="false"</code> hides the built-in button.
                    </li>
                </ul>
            </doc-section>

            <doc-section
                title="From your navigation"
                description="commandPaletteFromNavGroups turns the menu model (MNavGroup[]) into palette items, so both share one source. Pass your router in onSelect — the library does not depend on @angular/router."
            >
                <doc-props-table api="overlays/command-palette/command-palette-from-nav-groups" />
            </doc-section>

            <doc-section title="Differences from MineralUI for React">
                <ul mList>
                    <li mListItem>
                        <code mCode>open</code> / <code mCode>defaultOpen</code> / <code mCode>onOpenChange</code> →
                        <code mCode>[(open)]</code>; <code mCode>onSelect</code> → <code mCode>(selected)</code>;
                        <code mCode>title</code> → <code mCode>heading</code>; <code mCode>footer</code> → an element
                        with <code mCode>mCommandPaletteFooter</code>; <code mCode>trigger</code> →
                        <code mCode>showTrigger</code> + your own button bound to <code mCode>open</code>.
                    </li>
                    <li mListItem>
                        Item texts are strings and icons are icon constants; no <code mCode>component</code> /
                        <code mCode>to</code> — navigate in <code mCode>onSelect</code>.
                    </li>
                    <li mListItem>
                        React leaves the list without roles, so a screen reader does not hear the highlighted result.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MCommandPalette" />
            </doc-section>

            <doc-section title="MCommandPaletteItem">
                <doc-props-table api="MCommandPaletteItem" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPalettePage {
    private readonly toast = inject(MToastService)

    protected readonly size = signal<MSheetSize>('lg')
    protected readonly closeOnSelect = signal(true)
    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        booleanControl('closeOnSelect', this.closeOnSelect),
    ]

    protected readonly items: readonly MCommandPaletteItem[] = [
        {id: 'dashboard', title: 'Dashboard', description: 'Overview of today', group: 'Navigate', icon: mHomeIcon},
        {id: 'reports', title: 'Reports', description: 'Revenue and usage', group: 'Navigate', icon: mChartIcon},
        {id: 'team', title: 'Team', description: 'People and roles', group: 'Navigate', icon: mUsersIcon, badge: '3'},
        {id: 'invoice', title: 'New invoice', group: 'Create', icon: mFileIcon, keywords: ['bill']},
        {id: 'contact', title: 'New contact', group: 'Create', icon: mUserIcon, actionLabel: 'Add a contact'},
        {id: 'export', title: 'Export data', description: 'CSV of all records', group: 'Actions', icon: mDownloadIcon},
        {id: 'settings', title: 'Settings', group: 'Actions', icon: mSettingsIcon},
        {id: 'guide', title: 'User guide', description: 'Opens the docs', group: 'Help', icon: mDocIcon},
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[items]="items"',
            this.size() !== 'lg' && `size="${this.size()}"`,
            !this.closeOnSelect() && '[closeOnSelect]="false"',
            '(selected)="run($event)"',
        ].filter((attr) => attr !== false)
        return `<m-command-palette ${attrs.join(' ')}>
    <p mText size="sm" tone="muted" mCommandPaletteFooter>↑ ↓ to move, Enter to run, Esc to close</p>
</m-command-palette>

items: MCommandPaletteItem[] = [
    {id: 'dashboard', title: 'Dashboard', group: 'Navigate', icon: mHomeIcon, onSelect: () => this.router.navigateByUrl('/')},
    {id: 'invoice', title: 'New invoice', group: 'Create', keywords: ['bill']},
]`
    })

    protected ran(item: MCommandPaletteItem): void {
        this.toast.show({title: item.title, color: 'info', duration: 1600})
    }
}
