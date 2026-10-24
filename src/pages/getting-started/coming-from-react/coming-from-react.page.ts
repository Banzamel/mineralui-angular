import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import * as snippets from '@generated/snippets/getting-started/coming-from-react'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MLink} from '@banzamel/mineralui-angular/typography/link'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'

/** Differences from MineralUI for React (CHANGELOG 1.0.0), each with a React and an Angular snippet. */
@Component({
    selector: 'doc-coming-from-react-page',
    imports: [RouterLink, DocArticle, DocSection, CodeBlock, MCode, MLink, MList, MListItem, MText],
    templateUrl: './coming-from-react.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingFromReactPage {
    protected readonly snippets = snippets
}
