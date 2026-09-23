import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import stickyPanelActions from '@generated/examples/layout/sticky-panel/sticky-panel-actions'
import stickyPanelBasic from '@generated/examples/layout/sticky-panel/sticky-panel-basic'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-sticky-panel-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable, MCode, MStack, MText],
    templateUrl: './sticky-panel.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyPanelPage {
    protected readonly examples = {stickyPanelBasic, stickyPanelActions}
}
