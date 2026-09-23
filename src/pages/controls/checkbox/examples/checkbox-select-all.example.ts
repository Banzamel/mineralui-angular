import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-checkbox-select-all',
    imports: [MCheckbox, MStack],
    template: `
        <m-stack>
            <!-- Mixed state while only some items are selected. -->
            <m-checkbox [checked]="allSelected()" [indeterminate]="someSelected()" (checkedChange)="selectAll($event)">
                All notifications
            </m-checkbox>
            <m-stack class="items">
                @for (channel of channels; track channel) {
                    <m-checkbox [checked]="selected().has(channel)" (checkedChange)="toggle(channel, $event)">
                        {{ channel }}
                    </m-checkbox>
                }
            </m-stack>
        </m-stack>
    `,
    styles: '.items { padding-left: 1.75rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxSelectAllExample {
    protected readonly channels = ['Email', 'Push', 'SMS'] as const
    protected readonly selected = signal<ReadonlySet<string>>(new Set(['Email']))

    protected readonly allSelected = computed(() => this.selected().size === this.channels.length)
    protected readonly someSelected = computed(() => this.selected().size > 0 && !this.allSelected())

    protected selectAll(checked: boolean): void {
        this.selected.set(new Set(checked ? this.channels : []))
    }

    protected toggle(channel: string, checked: boolean): void {
        const next = new Set(this.selected())
        if (checked) next.add(channel)
        else next.delete(channel)
        this.selected.set(next)
    }
}
