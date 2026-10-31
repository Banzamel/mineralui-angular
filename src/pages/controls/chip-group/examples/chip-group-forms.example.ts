import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MChipGroup} from '@banzamel/mineralui-angular/controls/chip-group'
import type {MChipGroupItem} from '@banzamel/mineralui-angular/controls/chip-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-chip-group-forms',
    imports: [MButton, MChipGroup, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-chip-group
                label="Interests"
                helperText="Pick a few topics for your feed"
                [items]="topics"
                [formControl]="interests"
                [errorMessages]="{required: 'Pick at least one topic'}"
            />
            <button mButton size="sm" (click)="interests.markAsTouched()">Continue</button>
            <p mText size="sm" tone="muted">Value: {{ value().join(', ') || 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipGroupFormsExample {
    protected readonly topics: readonly MChipGroupItem[] = [
        {value: 'design', label: 'Design'},
        {value: 'frontend', label: 'Frontend'},
        {value: 'backend', label: 'Backend'},
        {value: 'devops', label: 'DevOps'},
    ]
    protected readonly interests = new FormControl<readonly string[]>([], {
        nonNullable: true,
        validators: Validators.required,
    })
    protected readonly value = toSignal(this.interests.valueChanges, {initialValue: this.interests.value})
}
