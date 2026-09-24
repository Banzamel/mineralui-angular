import {ChangeDetectionStrategy, Component, computed, inject, input, output} from '@angular/core'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {toSignal} from '@angular/core/rxjs-interop'
import {NavigationEnd, Router, RouterLink} from '@angular/router'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MIcon, mMenuIcon, mSettingsIcon} from '@banzamel/mineralui-angular/icons'
import {MNavbar, MNavbarBrand} from '@banzamel/mineralui-angular/layout/navbar'
import {filter, map} from 'rxjs'
import {docIdFromUrl} from '@locales/docs-navigation'
import {DocsCommandSheet} from '../command-sheet/command-sheet'

const REACT_DOCS = 'https://mineralui.io/docs'

// The bar is MNavbar. At and below the MSidebar mobile breakpoint (768 px) the menu button opens the sidebar dialog.
@Component({
    selector: 'doc-docs-header',
    imports: [RouterLink, DocsCommandSheet, MBadge, MButton, MIcon, MNavbar, MNavbarBrand, MTranslatePipe],
    templateUrl: './docs-header.html',
    styleUrl: './docs-header.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsHeader {
    private readonly router = inject(Router)

    readonly navOpen = input(false)
    /** Hidden when the sidebar is switched off in the settings. */
    readonly showNavToggle = input(true)
    readonly toggleNav = output()
    readonly openSettings = output()

    protected readonly icons = {menu: mMenuIcon, settings: mSettingsIcon}

    private readonly url = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => event.urlAfterRedirects)
        ),
        {initialValue: this.router.url}
    )

    /** The same page in the React docs (page ids are shared). */
    protected readonly reactHref = computed(() => {
        const docId = docIdFromUrl(this.url())
        return docId ? `${REACT_DOCS}/${docId}` : REACT_DOCS
    })
}
