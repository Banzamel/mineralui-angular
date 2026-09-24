import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import formCustomField from '@generated/examples/forms/form/form-custom-field'
import formSignup from '@generated/examples/forms/form/form-signup'
import * as snippets from '@generated/snippets/forms/form'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

/** MForm / useFormField of MineralUI for React and their Angular counterparts (ADR 0010). */
const MIGRATION = [
    {react: '<MForm initialValues onSubmit>', angular: '<form [formGroup]="form" (ngSubmit)="submit()">'},
    {
        react: 'useFormField(name) / name="email"',
        angular: 'formControlName="email" (the component is a ControlValueAccessor)',
    },
    {react: 'useFormContext()', angular: 'inject the FormGroup you own, or FormGroupDirective'},
    {
        react: "validationMode: 'onBlur' | 'onChange' | 'onSubmit'",
        angular: "updateOn: 'blur' | 'change' | 'submit' on the control or group",
    },
    {react: 'helpers.setFieldError(name, message)', angular: 'control.setErrors({server: {message}})'},
    {react: 'helpers.resetForm()', angular: 'form.reset()'},
    {
        react: 'helpers.setSubmitting(bool) / isSubmitting',
        angular: 'a signal of your own (e.g. submitting = signal(false))',
    },
    {react: 'values', angular: 'form.getRawValue() — raw values: digits, numbers, Date, full IBAN'},
    {
        react: 'onValueChange(raw, formatted)',
        angular: 'the control holds the raw value; (formattedChange) gives the shown text',
    },
    {
        react: 'validateOnBlur (local, visual only)',
        angular: 'built-in NG_VALIDATORS — form.invalid sees it; [validate]="false" turns it off',
    },
    {react: 'onValidationChange', angular: '(validationChange)'},
] as const

/** Where the text of a field's automatic error comes from, first match wins. */
const MESSAGE_ORDER = [
    ['errorText', 'always shown, also for a valid control'],
    ['errorMessages', 'per error key on the component: {required: …, mEmail: …}'],
    ['mineralui.validation.<key>', 'the i18n dictionary (MI18nService), for the whole app'],
    ['message of the error', 'the English text of the rule (MValidators, built-in validation)'],
    ['built-in default', "English text for Angular's own validators (required, minlength, min, …)"],
] as const

@Component({
    selector: 'doc-form-page',
    imports: [CodeBlock, DocArticle, DocSection, DocPreview, DocPropsTable, MCode, MList, MListItem, MStack, MText],
    templateUrl: './form.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPage {
    protected readonly examples = {formSignup, formCustomField}
    protected readonly snippets = snippets
    protected readonly migration = MIGRATION
    protected readonly messageOrder = MESSAGE_ORDER
}
