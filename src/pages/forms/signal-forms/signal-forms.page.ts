import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MLink} from '@banzamel/mineralui-angular/typography/link'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import signalFormsSchema from '@generated/examples/forms/signal-forms/signal-forms-schema'
import signalFormsSignup from '@generated/examples/forms/signal-forms/signal-forms-signup'
import signalFormsSubmit from '@generated/examples/forms/signal-forms/signal-forms-submit'
import * as snippets from '@generated/snippets/forms/signal-forms'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

/** Where the text of a field's error comes from with [formField], first match wins (ADR 0022). */
const MESSAGE_ORDER = [
    ['errorText', 'always shown, also for a valid field'],
    ['errorMessages', 'per error kind on the component: {required: …, mPesel: …}'],
    ['message of the rule', 'written in the schema: required(path.x, {message})'],
    ['mineralui.validation.<kind>', 'the i18n dictionary (MI18nService), for the whole app'],
    ['English default', 'MRuleError.defaultMessage, or the text of a built-in rule (required, minLength, …)'],
] as const

@Component({
    selector: 'doc-signal-forms-page',
    imports: [
        CodeBlock,
        DocArticle,
        DocPreview,
        DocPropsTable,
        DocSection,
        MCode,
        MDataTable,
        MDataTableCell,
        MLink,
        MList,
        MListItem,
        MStack,
        MText,
        RouterLink,
    ],
    templateUrl: './signal-forms.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsPage {
    protected readonly examples = {signalFormsSignup, signalFormsSchema, signalFormsSubmit}
    protected readonly snippets = snippets
    protected readonly messageColumns: readonly MDataTableColumn[] = [
        {key: '0', label: 'Source', rowHeader: true},
        {key: '1', label: 'Scope'},
    ]
    protected readonly messageOrder = MESSAGE_ORDER
}
