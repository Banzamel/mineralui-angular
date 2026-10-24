import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'

@Component({
    selector: 'app-checkbox-without-label',
    imports: [MCheckbox],
    template: `
        <table class="rows">
            <thead>
                <tr>
                    <th>
                        <!-- No visible label: ariaLabel names the native input. -->
                        <m-checkbox
                            ariaLabel="Select all rows"
                            [checked]="allSelected()"
                            [indeterminate]="someSelected()"
                            (checkedChange)="selectAll($event)"
                        />
                    </th>
                    <th>Invoice</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                @for (row of rows; track row.id) {
                    <tr>
                        <td>
                            <!-- The row's own cell names the checkbox. -->
                            <m-checkbox
                                [ariaLabelledby]="row.id"
                                [checked]="selected().has(row.id)"
                                (checkedChange)="toggle(row.id, $event)"
                            />
                        </td>
                        <td [id]="row.id">{{ row.name }}</td>
                        <td>{{ row.amount }}</td>
                    </tr>
                }
            </tbody>
        </table>
    `,
    styles: `
        .rows {
            border-collapse: collapse;
        }
        .rows th,
        .rows td {
            padding: 0.375rem 0.75rem;
            text-align: left;
            border-bottom: 1px solid var(--mineral-border);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxWithoutLabelExample {
    protected readonly rows = [
        {id: 'invoice-1042', name: 'INV-1042', amount: '$320.00'},
        {id: 'invoice-1043', name: 'INV-1043', amount: '$1,150.00'},
        {id: 'invoice-1044', name: 'INV-1044', amount: '$89.90'},
    ] as const
    protected readonly selected = signal<ReadonlySet<string>>(new Set(['invoice-1043']))

    protected readonly allSelected = computed(() => this.selected().size === this.rows.length)
    protected readonly someSelected = computed(() => this.selected().size > 0 && !this.allSelected())

    protected selectAll(checked: boolean): void {
        this.selected.set(new Set(checked ? this.rows.map((row) => row.id) : []))
    }

    protected toggle(id: string, checked: boolean): void {
        const next = new Set(this.selected())
        if (checked) next.add(id)
        else next.delete(id)
        this.selected.set(next)
    }
}
