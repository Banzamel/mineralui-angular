import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import keyboardNavListbox from '@generated/examples/getting-started/keyboard-nav/keyboard-nav-listbox'
import keyboardNavMenu from '@generated/examples/getting-started/keyboard-nav/keyboard-nav-menu'
import keyboardNavToolbar from '@generated/examples/getting-started/keyboard-nav/keyboard-nav-toolbar'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-keyboard-nav-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable, MCode, MList, MListItem, MText],
    templateUrl: './keyboard-nav.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardNavPage {
    protected readonly examples = {keyboardNavToolbar, keyboardNavMenu, keyboardNavListbox}
}
