import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import {mChartIcon, mDashboardIcon, mSettingsIcon} from '@banzamel/mineralui-angular/icons'
import {MTopbar} from '@banzamel/mineralui-angular/layout/topbar'
import type {MTopbarItem, MTopbarJustify, MTopbarTone} from '@banzamel/mineralui-angular/layout/topbar'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import topbarRouter from '@generated/examples/navigation/topbar/topbar-router'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TONES: readonly MTopbarTone[] = ['surface', 'subtle', 'default']
const JUSTIFY: readonly MTopbarJustify[] = ['left', 'center', 'right']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-topbar-page',
    imports: [DocArticle, DocPlayground, DocPreview, DocPropsTable, DocSection, MCode, MList, MListItem, MTopbar],
    template: `
        <doc-article
            title="MTopbar"
            description="Horizontal application menu placed below the main header, with dropdown sections that mirror richer sidebar structures."
        >
            <doc-section
                title="Playground"
                description="Links, an action and dropdowns from [items]. When the entries do not fit the row scrolls sideways; arrows show on hover. The bar hides itself at and below compactBreakpoint (1024 px)."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <nav
                        mTopbar
                        aria-label="Demo sections"
                        [items]="items"
                        [tone]="tone()"
                        [size]="size()"
                        [justify]="justify()"
                        [bordered]="bordered()"
                        [compactBreakpoint]="0"
                        (itemClick)="clicked($event)"
                    ></nav>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Router and custom entries"
                description="Project mTopbarLink entries for routerLink; a button with [mPopoverTrigger] opens an m-dropdown-menu next to it."
            >
                <doc-preview [example]="examples.topbarRouter" />
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The host is your <code mCode>&lt;nav&gt;</code> — name it with <code mCode>aria-label</code>.
                        Active links get <code mCode>aria-current="page"</code>.
                    </li>
                    <li mListItem>
                        Dropdown triggers are buttons with <code mCode>aria-haspopup="menu"</code> and
                        <code mCode>aria-expanded</code>; the menus follow the WAI-ARIA menu pattern.
                    </li>
                    <li mListItem>
                        The scroll arrows are a pointer shortcut and stay out of the Tab order: focusing an entry
                        scrolls it into view.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MTopbar" />
                <doc-props-table api="MTopbarLink" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarPage {
    protected readonly examples = {topbarRouter}
    private readonly toast = inject(MToastService)

    protected readonly items: readonly MTopbarItem[] = [
        {label: 'Overview', href: '#overview', icon: mDashboardIcon, active: true},
        {
            label: 'Reports',
            icon: mChartIcon,
            children: [
                {label: 'Sales', href: '#sales'},
                {label: 'Costs', href: '#costs'},
                {label: 'Archive', children: [{label: '2025', href: '#2025'}, {label: 'Export all'}]},
            ],
        },
        {label: 'Customers', href: '#customers', badge: 12},
        {label: 'Invoices', href: '#invoices'},
        {label: 'Integrations', href: '#integrations', disabled: true},
        {label: 'Settings', icon: mSettingsIcon, children: [{label: 'Profile', href: '#profile'}, {label: 'Sign out'}]},
    ]

    protected readonly tone = signal<MTopbarTone>('surface')
    protected readonly size = signal<MSize>('md')
    protected readonly justify = signal<MTopbarJustify>('left')
    protected readonly bordered = signal(true)

    protected readonly controls = [
        selectControl('tone', this.tone, TONES),
        selectControl('size', this.size, SIZES),
        selectControl('justify', this.justify, JUSTIFY),
        booleanControl('bordered', this.bordered),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'aria-label="Sections"',
            '[items]="items"',
            this.tone() !== 'surface' && `tone="${this.tone()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.justify() !== 'left' && `justify="${this.justify()}"`,
            !this.bordered() && '[bordered]="false"',
            '(itemClick)="open($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<nav\n    mTopbar\n    ${attrs.join('\n    ')}\n></nav>`
    })

    protected clicked(item: MTopbarItem): void {
        this.toast.show({title: `itemClick: ${item.label}`, duration: 1600})
    }
}
