import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MChipGroup} from '@banzamel/mineralui-angular/controls/chip-group'
import type {MChipGroupItem} from '@banzamel/mineralui-angular/controls/chip-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-chip-group-single',
    imports: [MChipGroup, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- At most one chip; pressing the pressed chip again clears the filter (back to "all"). -->
            <m-chip-group
                ariaLabel="Batch state"
                size="sm"
                color="neutral"
                [multiple]="false"
                [items]="states"
                [(value)]="state"
            />
            <p mText size="sm" tone="muted">State: {{ state()[0] ?? 'all' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipGroupSingleExample {
    protected readonly states: readonly MChipGroupItem[] = [
        {value: 'open', label: 'Open', count: 11},
        {value: 'closed', label: 'Closed', count: 12},
        {value: 'failed', label: 'Failed', count: 0},
    ]
    protected readonly state = signal<readonly string[]>([])
}
