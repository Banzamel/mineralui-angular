import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MChipGroup} from '@banzamel/mineralui-angular/controls/chip-group'
import type {MChipGroupItem} from '@banzamel/mineralui-angular/controls/chip-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-chip-group-filters',
    imports: [MButton, MChipGroup, MStack, MText],
    template: `
        <m-stack align="stretch">
            <!-- Counts, a disabled chip with a hint, a double click presses one chip alone, an extra button after the chips. -->
            <m-chip-group
                label="Professions"
                inlineLabel
                size="sm"
                soloOnDoubleClick
                [items]="professions"
                [(value)]="selected"
            >
                <button mButton variant="ghost" size="sm" type="button" (click)="selected.set([])">Clear</button>
            </m-chip-group>
            <p mText size="sm" tone="muted">Value: {{ selected().join(', ') || 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipGroupFiltersExample {
    protected readonly professions: readonly MChipGroupItem[] = [
        {value: 'blacksmithing', label: 'Blacksmithing', count: 94},
        {value: 'mining', label: 'Mining', count: 93},
        {value: 'tailoring', label: 'Tailoring', count: 41, hint: 'Includes the recipes you can still learn'},
        {value: 'alchemy', label: 'Alchemy', count: 0, disabled: true, hint: 'No character has this profession yet.'},
    ]
    protected readonly selected = signal<readonly string[]>(['mining'])
}
