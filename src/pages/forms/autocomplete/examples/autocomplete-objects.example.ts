import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {
    MAutocomplete,
    MAutocompleteOptionDef,
    MAutocompleteTagsDef,
} from '@banzamel/mineralui-angular/dropdowns/autocomplete'
import {MTag} from '@banzamel/mineralui-angular/feedback/tag'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Person {
    readonly id: number
    readonly name: string
    readonly role: string
}

@Component({
    selector: 'app-autocomplete-objects',
    imports: [MAutocomplete, MAutocompleteOptionDef, MAutocompleteTagsDef, MStack, MTag, MText],
    template: `
        <m-stack>
            <m-autocomplete
                label="Assignees"
                fullWidth
                multiple
                [options]="people"
                [optionLabel]="nameOf"
                [optionValue]="idOf"
                [(value)]="assignees"
            >
                <ng-template mAutocompleteOption [mAutocompleteOptionOf]="people" let-person let-selected="selected">
                    <strong>{{ person.name }}</strong> · {{ person.role }}{{ selected ? ' ✓' : '' }}
                </ng-template>
                <ng-template mAutocompleteTags [mAutocompleteTagsOf]="people" let-selected let-remove="remove">
                    @for (person of selected; track person.id) {
                        <m-tag color="info" variant="outlined" size="sm" closable (closed)="remove($index)">
                            {{ person.name }}
                        </m-tag>
                    }
                </ng-template>
            </m-autocomplete>
            <p mText size="sm" tone="muted">Selected ids: {{ ids() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteObjectsExample {
    protected readonly people: readonly Person[] = [
        {id: 1, name: 'Ada Lovelace', role: 'Engineering'},
        {id: 2, name: 'Grace Hopper', role: 'Platform'},
        {id: 3, name: 'Katherine Johnson', role: 'Research'},
        {id: 4, name: 'Margaret Hamilton', role: 'Reliability'},
    ]
    protected readonly assignees = signal<Person | Person[] | null>([])
    protected readonly nameOf = (person: Person) => person.name
    protected readonly idOf = (person: Person) => String(person.id)

    protected ids(): string {
        const value = this.assignees()
        const list = Array.isArray(value) ? value : value ? [value] : []
        return list.map((person) => person.id).join(', ') || '—'
    }
}
