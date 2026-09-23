import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import utilsClickOutside from '@generated/examples/layout/utilities/utils-click-outside'
import utilsDates from '@generated/examples/layout/utilities/utils-dates'
import utilsFormatters from '@generated/examples/layout/utilities/utils-formatters'
import utilsSpacing from '@generated/examples/layout/utilities/utils-spacing'
import utilsValidators from '@generated/examples/layout/utilities/utils-validators'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

/** React hooks and helpers and where they went in Angular (CLAUDE.md → Utils, validators, hooks). */
const REACT_HELPERS = [
    {react: 'cn(...)', angular: '[class.x] / [class] bindings', status: 'not needed'},
    {
        react: 'useDebounce / useDebouncedCallback',
        angular: 'RxJS debounceTime or a debounced signal',
        status: 'not ported',
    },
    {react: 'useControllableString', angular: 'model()', status: 'not needed'},
    {react: 'useMaxWidth', angular: 'injectMaxWidth(breakpoint | signal) — theme', status: 'available'},
    {react: 'useClickOutside', angular: '(mClickOutside) directive — utils', status: 'available'},
    {react: 'useKeyboardNav', angular: '[mKeyboardNav] directive', status: 'stage 5'},
    {react: 'useInteractionEffect', angular: '[mClickEffect] directive — utils', status: 'available'},
] as const

@Component({
    selector: 'doc-utilities-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable, MCode, MStack, MText],
    templateUrl: './utilities.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilitiesPage {
    protected readonly examples = {utilsSpacing, utilsValidators, utilsFormatters, utilsDates, utilsClickOutside}
    protected readonly reactHelpers = REACT_HELPERS
}
