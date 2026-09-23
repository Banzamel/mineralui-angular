import {ChangeDetectionStrategy, Component} from '@angular/core'
import welcomeCard from '@generated/examples/getting-started/quick-start/welcome-card'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

/** How React props map to Angular in MineralUI (the rules every component follows). */
const CONVENTIONS: readonly {readonly react: string; readonly angular: string; readonly example: string}[] = [
    {
        react: 'Component wrapping one native element (MButton, MLink)',
        angular: 'Attribute selector on the native element',
        example: '<button mButton>, <a mLink routerLink="/docs">',
    },
    {
        react: 'Composite component',
        angular: 'm-* element',
        example: '<m-card>, <m-date-picker>',
    },
    {
        react: 'value + defaultValue + onChange',
        angular: 'model() — two-way binding, plus ControlValueAccessor for forms',
        example: '[(value)]="name", [formControl]="name"',
    },
    {
        react: 'startIcon / endIcon / header nodes',
        angular: 'Content projection into attribute slots',
        example: '<m-icon mStart [icon]="plus" />',
    },
    {
        react: 'Render props (cells, options, list items)',
        angular: 'ng-template with a typed context',
        example: '<ng-template mCell="name" let-row>',
    },
    {
        react: 'Context providers (MThemeProvider, MI18nProvider)',
        angular: 'Environment providers + injectable services',
        example: 'provideMineralUI(), inject(MThemeService)',
    },
    {
        react: 'hidden="md", title',
        angular: 'hiddenUpTo="md", label (no clash with native HTML attributes)',
        example: '<m-icon label="Settings" />',
    },
]

@Component({
    selector: 'doc-quick-start-page',
    imports: [MText, DocArticle, DocSection, DocPreview, MCode],
    templateUrl: './quick-start.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickStartPage {
    protected readonly welcomeCard = welcomeCard
    protected readonly conventions = CONVENTIONS
}
