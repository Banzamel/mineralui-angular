import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {M_THEME_INIT_SCRIPT} from '@banzamel/mineralui-angular/theme'
import * as snippets from '@generated/snippets/getting-started/installation'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {API} from '@kit/doc-props-table/api'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MLink} from '@banzamel/mineralui-angular/typography/link'

const PACKAGE = '@banzamel/mineralui-angular'

@Component({
    selector: 'doc-installation-page',
    imports: [MText, RouterLink, DocArticle, DocSection, CodeBlock, MCode, MList, MListItem, MLink],
    templateUrl: './installation.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationPage {
    protected readonly snippets = snippets
    /** Public entry points, read from the generated API (always current). */
    protected readonly entryPoints = [
        PACKAGE,
        ...new Set(
            Object.values(API)
                .map((entry) => entry.entryPoint)
                .filter((path) => path !== PACKAGE)
                .sort()
        ),
    ]
    protected readonly themeInitScript = `<script>\n${M_THEME_INIT_SCRIPT}\n</script>`
}
