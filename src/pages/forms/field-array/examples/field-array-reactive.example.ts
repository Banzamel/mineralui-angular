import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDatePicker} from '@banzamel/mineralui-angular/dropdowns/date-picker'
import {MFieldArray, MFieldArrayRowDef} from '@banzamel/mineralui-angular/inputs/field-array'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

type Period = FormGroup<{from: FormControl<Date | null>; to: FormControl<Date | null>}>

function period(): Period {
    return new FormGroup({
        from: new FormControl<Date | null>(null, Validators.required),
        to: new FormControl<Date | null>(null),
    })
}

@Component({
    selector: 'app-field-array-reactive',
    imports: [MButton, MDatePicker, MFieldArray, MFieldArrayRowDef, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="save()">
            <m-stack align="stretch">
                <fieldset
                    [mFieldArray]="form.controls.periods"
                    label="Membership periods"
                    helperText="Up to five periods"
                    maxRows="5"
                    addText="Add period"
                    rowLabel="Period {index}"
                    removeLabel="Remove period {index}"
                    [newRow]="newPeriod"
                    [errorMessages]="{required: 'Add at least one period'}"
                >
                    <ng-template [mFieldArrayRow]="form.controls.periods" let-period>
                        <m-date-picker label="From" [formControl]="period.controls.from" />
                        <m-date-picker label="To" [formControl]="period.controls.to" />
                    </ng-template>
                </fieldset>
                <div>
                    <button mButton type="submit">Save</button>
                </div>
                <p mText size="sm" tone="muted">{{ status() }}</p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldArrayReactiveExample {
    protected readonly form = new FormGroup({
        // Validators.required fails on an empty FormArray; the field array shows it under the rows.
        periods: new FormArray<Period>([period()], Validators.required),
    })
    // A FormArray needs a control per row.
    protected readonly newPeriod = (): Period => period()
    protected readonly status = signal('Not saved')

    protected save(): void {
        this.form.markAllAsTouched()
        if (this.form.invalid) {
            this.status.set('Fix the errors first')
            return
        }
        this.status.set(`Saved ${this.form.controls.periods.length} period(s)`)
    }
}
