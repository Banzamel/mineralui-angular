import {DOCUMENT} from '@angular/common'
import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {NavigationEnd, Router, RouterOutlet} from '@angular/router'
import {MScrollTop} from '@banzamel/mineralui-angular/controls/scroll-top'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MAppShell, MBody} from '@banzamel/mineralui-angular/layout/app-shell'
import {MContainer} from '@banzamel/mineralui-angular/layout/container'
import {MSidebar} from '@banzamel/mineralui-angular/layout/sidebar'
import {filter} from 'rxjs'
import {DocsHeader} from '../docs-header/docs-header'
import {DocsNavigation} from '../docs-navigation/docs-navigation'
import {DocsTopbar} from '../docs-topbar/docs-topbar'
import {DocsSettingsDrawer} from '../settings-drawer/settings-drawer'
import type {DocsTopbarContainer} from '../settings-drawer/settings-drawer'

// Shell of the docs (docs-react DocsLayout): MSidebar with the navigation, header, optional topbar, page.
@Component({
    selector: 'doc-docs-layout',
    imports: [
        RouterOutlet,
        DocsHeader,
        DocsNavigation,
        DocsSettingsDrawer,
        DocsTopbar,
        MAppShell,
        MBody,
        MContainer,
        MScrollTop,
        MSidebar,
        MTranslatePipe,
    ],
    templateUrl: './docs-layout.html',
    styleUrl: './docs-layout.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsLayout {
    private readonly document = inject(DOCUMENT)
    protected readonly navOpen = signal(false)
    protected readonly settingsOpen = signal(false)
    // Session-only: docs-react persists it behind cookie consent, which the Angular docs do not have.
    protected readonly showSidebar = signal(true)
    protected readonly showTopbar = signal(false)
    protected readonly topbarContainer = signal<DocsTopbarContainer>('content')

    constructor() {
        inject(Router)
            .events.pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed()
            )
            .subscribe(() => this.navOpen.set(false))
    }

    protected focusMain(): void {
        this.document.getElementById('doc-main')?.focus()
    }
}
