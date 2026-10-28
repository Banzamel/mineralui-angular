import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MCheckboxGroup} from '@banzamel/mineralui-angular/controls/checkbox-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-checkbox-group-forms',
    imports: [MButton, MCheckbox, MCheckboxGroup, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <!-- The control holds string[]; the checkboxes only carry their values. -->
            <fieldset
                mCheckboxGroup
                label="Roles"
                direction="horizontal"
                helperText="A member needs at least one role"
                [formControl]="roles"
                [errorMessages]="{required: 'Choose at least one role'}"
            >
                <m-checkbox value="admin">Admin</m-checkbox>
                <m-checkbox value="editor">Editor</m-checkbox>
                <m-checkbox value="viewer">Viewer</m-checkbox>
                <m-checkbox value="owner" disabled>Owner</m-checkbox>
            </fieldset>
            <button mButton size="sm" (click)="roles.markAsTouched()">Save</button>
            <p mText size="sm" tone="muted">Value: {{ value().join(', ') || 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupFormsExample {
    protected readonly roles = new FormControl<string[]>(['editor'], {
        nonNullable: true,
        validators: Validators.required,
    })
    protected readonly value = toSignal(this.roles.valueChanges, {initialValue: this.roles.value})
}
