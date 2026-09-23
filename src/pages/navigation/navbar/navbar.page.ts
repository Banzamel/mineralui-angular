import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MContainerSize} from '@banzamel/mineralui-angular/layout/container'
import {MNavbar, MNavbarBrand, MNavbarNavs} from '@banzamel/mineralui-angular/layout/navbar'
import type {MNavbarJustify, MNavbarMobileMenu, MNavbarTone} from '@banzamel/mineralui-angular/layout/navbar'
import {MNavs} from '@banzamel/mineralui-angular/layout/navs'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import navbarMobile from '@generated/examples/navigation/navbar/navbar-mobile'
import navbarProduct from '@generated/examples/navigation/navbar/navbar-product'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const CONTAINERS: readonly MContainerSize[] = ['content', 'wide', 'full']
const TONES: readonly MNavbarTone[] = ['surface', 'default', 'subtle']
const JUSTIFY: readonly MNavbarJustify[] = ['between', 'start', 'center', 'end']
const MOBILE_MENUS: readonly MNavbarMobileMenu[] = ['dropdown', 'drawer']

@Component({
    selector: 'doc-navbar-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MNavbar,
        MNavbarBrand,
        MNavbarNavs,
        MNavs,
        MText,
    ],
    template: `
        <doc-article
            title="MNavbar"
            description="Top navigation shell aligned to the same container system as the rest of the page. Below the compact shell breakpoint the links and secondary actions move into a mobile menu behind a burger."
        >
            <doc-section
                title="Playground"
                description="Test container width, tone and alignment on a product navbar. Lower mobileBreakpoint below your window width — or resize the window — to see the mobile menu."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <div class="doc-navbar-stage">
                        <nav
                            mNavbar
                            aria-label="Playground"
                            [container]="container()"
                            [tone]="tone()"
                            [justify]="justify()"
                            [padded]="padded()"
                            [bordered]="bordered()"
                            [wrap]="wrap()"
                            [mobileMenu]="mobileMenu()"
                            [mobileBreakpoint]="mobileBreakpoint()"
                        >
                            <strong mNavbarBrand mText weight="bold">MineralUI</strong>
                            <ng-template mNavbarNavs let-orientation>
                                <m-navs [orientation]="orientation" [items]="links" />
                            </ng-template>
                            <button mButton size="sm">Get started</button>
                        </nav>
                    </div>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Links and actions"
                description="Put the logo in [mNavbarBrand], the links in ng-template mNavbarNavs (it receives the orientation) and secondary actions in ng-template mNavbarActions — the navbar renders each in the bar or in the mobile menu, depending on the viewport."
            >
                <doc-preview [example]="examples.navbarProduct" />
            </doc-section>

            <doc-section
                title="Mobile menu"
                description="The burger is a WAI-ARIA disclosure: aria-expanded, a closed menu that is inert, Escape returning focus to the burger, and a press outside or a link click closing it. [mNavbarMenu] and [mNavbarMenuFooter] add content to the menu; button[mNavbarToggle] replaces the default burger."
            >
                <doc-preview [example]="examples.navbarMobile" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MNavbar" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-navbar-stage {
            width: 100%;
            min-height: 280px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarPage {
    protected readonly examples = {navbarMobile, navbarProduct}
    protected readonly links = [
        {href: '#overview', label: 'Overview', current: true},
        {href: '#components', label: 'Components'},
        {href: '#tokens', label: 'Tokens'},
    ]

    protected readonly container = signal<MContainerSize>('content')
    protected readonly tone = signal<MNavbarTone>('surface')
    protected readonly justify = signal<MNavbarJustify>('between')
    protected readonly padded = signal(true)
    protected readonly bordered = signal(true)
    protected readonly wrap = signal(false)
    protected readonly mobileMenu = signal<MNavbarMobileMenu>('dropdown')
    protected readonly mobileBreakpoint = signal(1024)

    protected readonly controls = [
        selectControl('container', this.container, CONTAINERS),
        selectControl('tone', this.tone, TONES),
        selectControl('justify', this.justify, JUSTIFY),
        selectControl('mobileMenu', this.mobileMenu, MOBILE_MENUS),
        sliderControl('mobileBreakpoint', this.mobileBreakpoint, {min: 640, max: 2560, step: 64}),
        booleanControl('padded', this.padded),
        booleanControl('bordered', this.bordered),
        booleanControl('wrap', this.wrap),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.container() !== 'content' && `container="${this.container()}"`,
            this.tone() !== 'surface' && `tone="${this.tone()}"`,
            this.justify() !== 'between' && `justify="${this.justify()}"`,
            !this.padded() && '[padded]="false"',
            !this.bordered() && '[bordered]="false"',
            this.wrap() && 'wrap',
            this.mobileMenu() !== 'dropdown' && `mobileMenu="${this.mobileMenu()}"`,
            this.mobileBreakpoint() !== 1024 && `[mobileBreakpoint]="${this.mobileBreakpoint()}"`,
        ].filter((attr) => typeof attr === 'string')

        return [
            `<nav mNavbar aria-label="Main"${attrs.map((attr) => ` ${attr}`).join('')}>`,
            '    <strong mNavbarBrand mText weight="bold">MineralUI</strong>',
            '    <ng-template mNavbarNavs let-orientation>',
            '        <m-navs [orientation]="orientation" [items]="links" />',
            '    </ng-template>',
            '    <button mButton size="sm">Get started</button>',
            '</nav>',
        ].join('\n')
    })
}
