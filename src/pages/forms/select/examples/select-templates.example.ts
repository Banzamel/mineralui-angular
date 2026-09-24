import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MSelect, MSelectOptionDef, MSelectValueDef} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption} from '@banzamel/mineralui-angular/dropdowns/select'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'

interface Plan {
    readonly id: string
    readonly price: number
    readonly seats: string
}

@Component({
    selector: 'app-select-templates',
    imports: [MBadge, MSelect, MSelectOptionDef, MSelectValueDef],
    template: `
        <m-select label="Plan" [options]="plans" [(value)]="plan">
            <ng-template mSelectOption [mSelectOptionOf]="plans" let-option let-selected="selected">
                <span class="plan-option">
                    <strong>{{ option.label }}</strong>
                    <span>{{ option.value.seats }}</span>
                    <m-badge size="sm" [color]="selected ? 'primary' : 'neutral'">{{
                        '$' + option.value.price
                    }}</m-badge>
                </span>
            </ng-template>
            <ng-template mSelectValue [mSelectValueOf]="plans" let-option="option">
                {{ option.label }} · {{ '$' + option.value.price }} / month
            </ng-template>
        </m-select>
    `,
    styles: `
        .plan-option {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
        }
        .plan-option m-badge {
            margin-left: auto;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTemplatesExample {
    protected readonly plans: readonly MSelectOption<Plan>[] = [
        {value: {id: 'starter', price: 0, seats: '1 seat'}, label: 'Starter'},
        {value: {id: 'team', price: 29, seats: 'up to 10 seats'}, label: 'Team'},
        {value: {id: 'business', price: 99, seats: 'unlimited seats'}, label: 'Business'},
    ]
    protected readonly plan = signal<Plan | Plan[] | null>(this.plans[1]?.value ?? null)
}
