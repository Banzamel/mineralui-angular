import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
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
    {react: 'useMaxWidth', angular: 'injectMaxWidth(breakpoint) — theme', status: 'available'},
    {react: 'useClickOutside', angular: '(mClickOutside) directive', status: 'stage 3'},
    {react: 'useKeyboardNav', angular: '[mKeyboardNav] directive', status: 'stage 3'},
    {react: 'useInteractionEffect', angular: '[mClickEffect] directive', status: 'stage 3'},
] as const

@Component({
    selector: 'doc-utilities-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable, MCode, MStack, MText],
    templateUrl: './utilities.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilitiesPage {
    protected readonly examples = {utilsSpacing, utilsValidators, utilsFormatters, utilsDates}
    protected readonly reactHelpers = REACT_HELPERS
}
