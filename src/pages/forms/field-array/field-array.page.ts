import {ChangeDetectionStrategy, Component} from '@angular/core'
import fieldArrayReactive from '@generated/examples/forms/field-array/field-array-reactive'
import fieldArraySignal from '@generated/examples/forms/field-array/field-array-signal'
import fieldArraySignalForms from '@generated/examples/forms/field-array/field-array-signal-forms'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-field-array-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MFieldArray"
            description="Repeatable rows of form fields — periods, contacts, steps — in a fieldset with an add button, a remove button per row and optional up / down buttons. The rows live in your form: a FormArray, a Signal Forms array field or a signal with a plain array."
        >
            <doc-section
                title="Reactive forms"
                description="Bind the FormArray to [mFieldArray] and the same array to [mFieldArrayRow] (it types let-period). newRow returns a new control. After Add, focus moves to the new row's first field; after Remove, to the row now in its place, or to the add button. maxRows disables Add, minRows the remove buttons. The array's own error (here Validators.required on an empty FormArray) shows under the rows once the form is submitted."
            >
                <doc-preview [example]="examples.fieldArrayReactive" />
            </doc-section>

            <doc-section
                title="Signal Forms"
                description="Bind the array field (contacts.people): each row gets the item field for [formField], newRow returns the item value and the field array writes it to the model. reorderable adds up / down buttons; focus stays on the moved row."
            >
                <doc-preview [example]="examples.fieldArraySignalForms" />
            </doc-section>

            <doc-section
                title="Plain array in a signal"
                description="Without a form, bind a writable signal. Rows are tracked by position, so equal values are fine. Content with mFieldArrayEmpty shows when there are no rows."
            >
                <doc-preview [example]="examples.fieldArraySignal" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The fieldset is named by its legend (label); rows are a list, each row a group named by rowLabel (“Period 2”). Remove and move buttons are named with the row number (removeLabel, moveUpLabel, moveDownLabel — {index} is filled in). Every add, remove and move is announced in a polite live region (mineralui.fieldArray.added / .removed / .moved). All texts are mineralui.fieldArray.* keys."
            />

            <doc-section title="MFieldArray API">
                <doc-props-table api="MFieldArray" />
            </doc-section>

            <doc-section title="mFieldArrayRow API">
                <doc-props-table api="MFieldArrayRowDef" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldArrayPage {
    protected readonly examples = {fieldArrayReactive, fieldArraySignalForms, fieldArraySignal}
}
