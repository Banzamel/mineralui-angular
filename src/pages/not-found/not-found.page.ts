import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MIllustration, mNotFoundIllustration} from '@banzamel/mineralui-angular/illustrations'

@Component({
    selector: 'doc-not-found-page',
    imports: [RouterLink, MTranslatePipe, MIllustration],
    template: `
        <div class="doc-stack" style="justify-items: center; text-align: center">
            <m-illustration [illustration]="notFound" size="md" color="warning" />
            <h1 class="doc-h1">{{ 'ui.missingDocsTitle' | mT }}</h1>
            <p class="doc-muted">{{ 'ui.missingDocsDescription' | mT }} Some pages are not ported from React yet.</p>
            <a class="doc-button" data-variant="primary" routerLink="/docs">Back to the docs</a>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
    protected readonly notFound = mNotFoundIllustration
}
