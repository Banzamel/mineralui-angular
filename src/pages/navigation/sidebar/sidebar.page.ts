import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MIcon, mChartIcon, mDashboardIcon, mSettingsIcon, mUsersIcon} from '@banzamel/mineralui-angular/icons'
import {MAppShell, MBody} from '@banzamel/mineralui-angular/layout/app-shell'
import {
    MSidebar,
    MSidebarBody,
    MSidebarFooter,
    MSidebarGroup,
    MSidebarHeader,
    MSidebarItem,
    MSidebarNav,
} from '@banzamel/mineralui-angular/layout/sidebar'
import type {MSidebarMode, MSidebarSide, MSidebarTone} from '@banzamel/mineralui-angular/layout/sidebar'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import sidebarMobile from '@generated/examples/navigation/sidebar/sidebar-mobile'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TONES: readonly MSidebarTone[] = ['subtle', 'default', 'surface', 'inverse']
const SIDES: readonly MSidebarSide[] = ['left', 'right']
const MODES: readonly MSidebarMode[] = ['expanded', 'collapsed']

@Component({
    selector: 'doc-sidebar-page',
    imports: [
        DocArticle,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        DocSection,
        MAppShell,
        MBadge,
        MBody,
        MCode,
        MIcon,
        MList,
        MListItem,
        MSidebar,
        MSidebarBody,
        MSidebarFooter,
        MSidebarGroup,
        MSidebarHeader,
        MSidebarItem,
        MSidebarNav,
        MText,
    ],
    template: `
        <doc-article
            title="MSidebar"
            description="Responsive app sidebar with full desktop, compact icon-only desktop and mobile drawer behavior."
        >
            <doc-section
                title="Playground"
                description="The header toggle switches between expanded and collapsed; in a collapsed sidebar a group opens its rows in a flyout. The page's own sidebar shows the responsive behavior — narrow the window."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <!-- Breakpoints at 0: the demo keeps its desktop layout at any window width. -->
                    <m-app-shell class="demo-shell">
                        <m-sidebar
                            ariaLabel="Demo"
                            [(mode)]="mode"
                            [tone]="tone()"
                            [side]="side()"
                            [bordered]="bordered()"
                            [collapsible]="collapsible()"
                            [mobileBreakpoint]="0"
                            [compactBreakpoint]="0"
                        >
                            <m-sidebar-header [bordered]="bordered()">Acme</m-sidebar-header>
                            <m-sidebar-body>
                                <nav mSidebarNav aria-label="Demo">
                                    <a mSidebarItem href="#dashboard" [active]="true" (click)="$event.preventDefault()">
                                        <m-icon mStart [icon]="icons.dashboard" />Dashboard
                                    </a>
                                    <a
                                        mSidebarItem
                                        href="#team"
                                        description="People and roles"
                                        (click)="$event.preventDefault()"
                                    >
                                        <m-icon mStart [icon]="icons.users" />Team
                                        <m-badge mEnd size="xs" color="news">3</m-badge>
                                    </a>
                                    <m-sidebar-group label="Reports" [icon]="icons.chart">
                                        <a mSidebarItem href="#sales" (click)="$event.preventDefault()">Sales</a>
                                        <a mSidebarItem href="#costs" (click)="$event.preventDefault()">Costs</a>
                                        <a mSidebarItem href="#forecast" disabled>Forecast</a>
                                    </m-sidebar-group>
                                    <button mSidebarItem><m-icon mStart [icon]="icons.settings" />Settings</button>
                                </nav>
                            </m-sidebar-body>
                            <m-sidebar-footer [bordered]="bordered()">
                                <span mText size="xs" tone="muted">v2.4.0</span>
                            </m-sidebar-footer>
                        </m-sidebar>
                        <m-body>
                            <p mText tone="muted" class="demo-content">Page content</p>
                        </m-body>
                    </m-app-shell>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Mobile"
                description="Below mobileBreakpoint the sidebar is a modal dialog. Open it from your own button with [(mobileOpen)] (the docs header does this) or keep the floating menu button."
            >
                <doc-preview [example]="examples.sidebarMobile" />
            </doc-section>

            <doc-section title="Routing and accessibility">
                <ul mList>
                    <li mListItem>
                        <code mCode>mSidebarItem</code> goes on your anchor or button, so
                        <code mCode>routerLink</code> works directly; bind <code mCode>[active]</code> from
                        <code mCode>routerLinkActive</code> — it sets <code mCode>aria-current="page"</code>.
                    </li>
                    <li mListItem>
                        Collapsed rows keep their label for screen readers and show it as a tooltip; a collapsed group
                        is a button with <code mCode>aria-expanded</code> opening a flyout.
                    </li>
                    <li mListItem>
                        The mobile dialog traps focus, returns it to the opener and closes on Escape or a click on the
                        backdrop.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MSidebar" />
                <doc-props-table api="MSidebarHeader" />
                <doc-props-table api="MSidebarItem" />
                <doc-props-table api="MSidebarGroup" />
                <doc-props-table api="MSidebarFooter" />
                <doc-props-table api="MSidebarDivider" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .demo-shell {
            --sidebar-height: 26rem;
            min-height: 26rem;
            width: 100%;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            overflow: hidden;
        }
        .demo-content {
            padding: var(--mineral-spacing-lg);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarPage {
    protected readonly examples = {sidebarMobile}
    protected readonly icons = {
        dashboard: mDashboardIcon,
        users: mUsersIcon,
        chart: mChartIcon,
        settings: mSettingsIcon,
    }

    protected readonly mode = signal<MSidebarMode>('expanded')
    protected readonly tone = signal<MSidebarTone>('subtle')
    protected readonly side = signal<MSidebarSide>('left')
    protected readonly bordered = signal(true)
    protected readonly collapsible = signal(true)

    protected readonly controls = [
        selectControl('mode', this.mode, MODES),
        selectControl('tone', this.tone, TONES),
        selectControl('side', this.side, SIDES),
        booleanControl('bordered', this.bordered),
        booleanControl('collapsible', this.collapsible),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.mode() !== 'expanded' && `mode="${this.mode()}"`,
            this.tone() !== 'subtle' && `tone="${this.tone()}"`,
            this.side() !== 'left' && `side="${this.side()}"`,
            !this.bordered() && '[bordered]="false"',
            !this.collapsible() && '[collapsible]="false"',
            'persist',
        ].filter((attr) => typeof attr === 'string')
        return [
            `<m-sidebar ${attrs.join(' ')}>`,
            '    <m-sidebar-header>Acme</m-sidebar-header>',
            '    <m-sidebar-body>',
            '        <nav mSidebarNav aria-label="Main">',
            '            <a mSidebarItem routerLink="/" routerLinkActive #home="routerLinkActive" [active]="home.isActive">',
            '                <m-icon mStart [icon]="dashboardIcon" />Dashboard',
            '            </a>',
            '            <m-sidebar-group label="Reports" [icon]="chartIcon">',
            '                <a mSidebarItem routerLink="/sales">Sales</a>',
            '            </m-sidebar-group>',
            '        </nav>',
            '    </m-sidebar-body>',
            '    <m-sidebar-footer>v2.4.0</m-sidebar-footer>',
            '</m-sidebar>',
        ].join('\n')
    })
}
