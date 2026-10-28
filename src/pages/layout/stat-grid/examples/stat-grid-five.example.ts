import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCardStat} from '@banzamel/mineralui-angular/cards/card-stat'
import {MStatGrid} from '@banzamel/mineralui-angular/layout/stat-grid'
import type {MColor} from '@banzamel/mineralui-angular/theme'

interface Stat {
    readonly label: string
    readonly value: string
    readonly color: MColor
}

@Component({
    selector: 'app-stat-grid-five',
    imports: [MCardStat, MStatGrid],
    template: `
        <!-- Five tiles in a row; two per row at 1024 px and narrower, also on phones. -->
        <m-stat-grid [columns]="5">
            @for (stat of stats; track stat.label) {
                <m-card-stat [label]="stat.label" [value]="stat.value" [color]="stat.color" />
            }
        </m-stat-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatGridFiveExample {
    protected readonly stats: readonly Stat[] = [
        {label: 'Clubs', value: '48', color: 'primary'},
        {label: 'Players', value: '1,204', color: 'info'},
        {label: 'Matches', value: '316', color: 'success'},
        {label: 'Pending', value: '9', color: 'warning'},
        {label: 'Disputes', value: '2', color: 'error'},
    ]
}
