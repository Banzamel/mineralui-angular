import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {disabled, form, FormField, required} from '@angular/forms/signals'
import {MSegmented} from '@banzamel/mineralui-angular/controls/segmented'
import type {MSegmentedItem} from '@banzamel/mineralui-angular/controls/segmented'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Delivery {
    express: boolean
    slot: string
}

@Component({
    selector: 'app-segmented-signal-forms',
    imports: [FormField, MSegmented, MStack, MText, MToggle],
    template: `
        <m-stack align="start">
            <m-toggle [formField]="delivery.express">Express delivery</m-toggle>
            <!-- Disabled for express delivery by the schema, not by [disabled]. -->
            <m-segmented label="Delivery slot" fullWidth [items]="slots" [formField]="delivery.slot" />
            <p mText size="sm" tone="muted">Model: {{ model().slot || 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedSignalFormsExample {
    protected readonly slots: readonly MSegmentedItem[] = [
        {value: 'morning', label: 'Morning'},
        {value: 'afternoon', label: 'Afternoon'},
        {value: 'evening', label: 'Evening'},
    ]
    protected readonly model = signal<Delivery>({express: false, slot: ''})
    protected readonly delivery = form(this.model, (path) => {
        required(path.slot, {message: 'Pick a delivery slot'})
        disabled(path.slot, ({valueOf}) => valueOf(path.express))
    })
}
