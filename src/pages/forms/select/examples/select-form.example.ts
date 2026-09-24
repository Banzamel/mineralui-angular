import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption} from '@banzamel/mineralui-angular/dropdowns/select'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface User {
    readonly id: number
    readonly name: string
}

@Component({
    selector: 'app-select-form',
    imports: [MSelect, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="form">
            <m-stack align="start">
                <m-select
                    label="Owner"
                    formControlName="owner"
                    [options]="users"
                    [compareWith]="sameUser"
                    [errorMessages]="{required: 'Pick an owner'}"
                />
                <m-select
                    label="Reviewers"
                    formControlName="reviewers"
                    [options]="users"
                    [compareWith]="sameUser"
                    multiple
                />
                <p mText size="sm" tone="muted">Form value: {{ json(value()) }}</p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFormExample {
    protected readonly users: readonly MSelectOption<User>[] = [
        {value: {id: 1, name: 'Ada'}, label: 'Ada Lovelace'},
        {value: {id: 2, name: 'Grace'}, label: 'Grace Hopper'},
        {value: {id: 3, name: 'Linus'}, label: 'Linus Torvalds'},
    ]
    protected readonly form = new FormGroup({
        // A copy from "the server": another object, matched by id through compareWith.
        owner: new FormControl<User | User[] | null>({id: 2, name: 'Grace'}, Validators.required),
        reviewers: new FormControl<User | User[] | null>([]),
    })
    protected readonly value = toSignal(this.form.valueChanges, {initialValue: this.form.value})
    protected readonly sameUser = (a: User, b: User) => a.id === b.id

    protected json(value: unknown): string {
        return JSON.stringify(value)
    }
}
