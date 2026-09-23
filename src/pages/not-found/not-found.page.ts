import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MIllustration, mNotFoundIllustration} from '@banzamel/mineralui-angular/illustrations'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

@Component({
    selector: 'doc-not-found-page',
    imports: [RouterLink, MButton, MTranslatePipe, MIllustration, MStack, MText, MHeading],
    template: `
        <m-stack align="center">
            <m-illustration [illustration]="notFound" size="md" color="warning" />
            <h1 mHeading class="doc-title">{{ 'ui.missingDocsTitle' | mT }}</h1>
            <p mText tone="muted" align="center">
                {{ 'ui.missingDocsDescription' | mT }} Some pages are not ported from React yet.
            </p>
            <a mButton routerLink="/docs">Back to the docs</a>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
    protected readonly notFound = mNotFoundIllustration
}
