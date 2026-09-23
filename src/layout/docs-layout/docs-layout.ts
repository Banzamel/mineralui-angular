import {DOCUMENT} from '@angular/common'
import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {NavigationEnd, Router, RouterOutlet} from '@angular/router'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {filter} from 'rxjs'
import {DocsHeader} from '../docs-header/docs-header'
import {DocsNavigation} from '../docs-navigation/docs-navigation'

// TEMP: replace with MAppShell + MSidebar + MBody + MContainer (etap 2)
@Component({
    selector: 'doc-docs-layout',
    imports: [RouterOutlet, DocsHeader, DocsNavigation, MTranslatePipe],
    templateUrl: './docs-layout.html',
    styleUrl: './docs-layout.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'(document:keydown.escape)': 'navOpen.set(false)'},
})
export class DocsLayout {
    private readonly document = inject(DOCUMENT)
    protected readonly navOpen = signal(false)

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
