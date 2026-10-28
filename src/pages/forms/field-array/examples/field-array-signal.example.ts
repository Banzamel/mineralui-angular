import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MFieldArray, MFieldArrayRowDef} from '@banzamel/mineralui-angular/inputs/field-array'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-field-array-signal',
    imports: [MFieldArray, MFieldArrayRowDef, MInput, MStack, MText],
    template: `
        <m-stack align="stretch">
            <fieldset
                [mFieldArray]="steps"
                label="Checklist"
                addText="Add step"
                rowLabel="Step {index}"
                removeLabel="Remove step {index}"
                moveUpLabel="Move step {index} up"
                moveDownLabel="Move step {index} down"
                reorderable
                [newRow]="newStep"
            >
                <ng-template [mFieldArrayRow]="steps" let-step let-i="index" let-label="label">
                    <m-input [ariaLabel]="label" [value]="step" (valueChange)="rename(i, $event)" fullWidth />
                </ng-template>
                <p mText mFieldArrayEmpty size="sm" tone="muted">No steps yet — add the first one.</p>
            </fieldset>
            <p mText size="sm" tone="muted">Steps: {{ steps().join(' → ') || '—' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldArraySignalExample {
    // A plain array in a signal: rows are tracked by position, so equal values are fine.
    protected readonly steps = signal<string[]>(['Pack', 'Check tickets', 'Lock the door'])
    protected readonly newStep = () => ''

    protected rename(index: number, value: string): void {
        this.steps.update((list) => list.map((step, position) => (position === index ? value : step)))
    }
}
