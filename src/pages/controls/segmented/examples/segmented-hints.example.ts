import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MSegment, MSegmented} from '@banzamel/mineralui-angular/controls/segmented'
import type {MSegmentedItem} from '@banzamel/mineralui-angular/controls/segmented'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MTooltip} from '@banzamel/mineralui-angular/overlays/tooltip'

@Component({
    selector: 'app-segmented-hints',
    imports: [MSegment, MSegmented, MStack, MTooltip],
    template: `
        <m-stack align="start">
            <!-- hint: a tooltip on the option, also on a disabled one. -->
            <m-segmented label="Price source" [items]="sources" [(value)]="source" />
            <!-- m-segment children: put [mTooltip] on the option yourself. -->
            <m-segmented ariaLabel="Region" size="sm" color="neutral" [(value)]="region">
                <m-segment value="eu" label="EU" [mTooltip]="'Europe servers'" />
                <m-segment value="us" label="US" [mTooltip]="'Americas and Oceania servers'" />
            </m-segmented>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedHintsExample {
    protected readonly sources: readonly MSegmentedItem[] = [
        {value: 'market', label: 'Market', hint: 'Lowest current listing'},
        {value: 'average', label: '7-day average', hint: 'Mean of the daily prices of the last week'},
        {
            value: 'vendor',
            label: 'Vendor',
            disabled: true,
            hint: 'Unavailable: this item cannot be bought from a vendor, so it has no vendor price.',
        },
    ]
    protected readonly source = signal('market')
    protected readonly region = signal('eu')
}
