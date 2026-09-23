import {ChangeDetectionStrategy, Component, computed, inject, input, output} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {NavigationEnd, Router, RouterLink} from '@angular/router'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MIcon, mMenuIcon, mMoonIcon, mSunIcon} from '@banzamel/mineralui-angular/icons'
import {MThemeService} from '@banzamel/mineralui-angular/theme'
import {filter, map} from 'rxjs'
import {docIdFromUrl} from '@locales/docs-navigation'

const REACT_DOCS = 'https://mineralui.io/docs'

// TEMP: replace with MNavbar (etap 3)
@Component({
    selector: 'doc-docs-header',
    imports: [RouterLink, MButton, MIcon, MTranslatePipe],
    templateUrl: './docs-header.html',
    styleUrl: './docs-header.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsHeader {
    protected readonly theme = inject(MThemeService)
    private readonly router = inject(Router)

    readonly navOpen = input(false)
    readonly toggleNav = output()

    protected readonly icons = {menu: mMenuIcon, sun: mSunIcon, moon: mMoonIcon}

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
