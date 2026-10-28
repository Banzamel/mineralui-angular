import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MSegmented} from '@banzamel/mineralui-angular/controls/segmented'
import type {MSegmentedItem} from '@banzamel/mineralui-angular/controls/segmented'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-segmented-forms',
    imports: [MButton, MSegmented, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-segmented
                label="Billing period"
                helperText="Yearly billing saves two months"
                [items]="periods"
                [formControl]="period"
                [errorMessages]="{required: 'Choose a billing period'}"
            />
            <button mButton size="sm" (click)="period.markAsTouched()">Continue</button>
            <p mText size="sm" tone="muted">Value: {{ value() ?? 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedFormsExample {
    protected readonly periods: readonly MSegmentedItem[] = [
        {value: 'monthly', label: 'Monthly'},
        {value: 'yearly', label: 'Yearly'},
        {value: 'lifetime', label: 'Lifetime', disabled: true},
    ]
    protected readonly period = new FormControl<string | null>(null, Validators.required)
    protected readonly value = toSignal(this.period.valueChanges, {initialValue: this.period.value})
}
