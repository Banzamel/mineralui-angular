import {JsonPipe} from '@angular/common'
import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {applyEach, email, form, FormField, minLength, required} from '@angular/forms/signals'
import {MFieldArray, MFieldArrayRowDef} from '@banzamel/mineralui-angular/inputs/field-array'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Contact {
    name: string
    email: string
}

@Component({
    selector: 'app-field-array-signal-forms',
    imports: [FormField, JsonPipe, MFieldArray, MFieldArrayRowDef, MInput, MInputEmail, MStack, MText],
    template: `
        <m-stack align="stretch">
            <fieldset
                [mFieldArray]="contacts.people"
                label="Emergency contacts"
                addText="Add contact"
                rowLabel="Contact {index}"
                removeLabel="Remove contact {index}"
                moveUpLabel="Move contact {index} up"
                moveDownLabel="Move contact {index} down"
                reorderable
                [newRow]="newContact"
            >
                <ng-template [mFieldArrayRow]="contacts.people" let-person>
                    <m-input label="Name" [formField]="person.name" />
                    <m-input-email label="Email" [formField]="person.email" />
                </ng-template>
            </fieldset>
            <p mText size="sm" tone="muted">Model: {{ model().people | json }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldArraySignalFormsExample {
    protected readonly model = signal<{people: Contact[]}>({people: [{name: 'Anna Nowak', email: 'anna@example.com'}]})
    protected readonly contacts = form(this.model, (path) => {
        minLength(path.people, 1, {message: 'Add at least one contact'})
        applyEach(path.people, (person) => {
            required(person.name)
            email(person.email)
        })
    })
    // Signal Forms: newRow returns the item value; the field array writes it to the model.
    protected readonly newContact = (): Contact => ({name: '', email: ''})
}
