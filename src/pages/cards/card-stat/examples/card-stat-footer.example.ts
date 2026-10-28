import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCardStat} from '@banzamel/mineralui-angular/cards/card-stat'
import {MStatGrid} from '@banzamel/mineralui-angular/layout/stat-grid'
import {MLink} from '@banzamel/mineralui-angular/typography/link'

@Component({
    selector: 'app-card-stat-footer',
    imports: [MCardStat, MLink, MStatGrid],
    template: `
        <m-stat-grid [columns]="3">
            <m-card-stat label="Overdue invoices" value="7" color="warning" [trend]="2" helperText="since Monday">
                <a mCardStatFooter mLink tone="accent" href="#overdue" (click)="$event.preventDefault()">Show list →</a>
            </m-card-stat>
            <m-card-stat label="Open disputes" value="2" color="error">
                <a mCardStatFooter mLink tone="accent" href="#disputes" (click)="$event.preventDefault()"
                    >Show list →</a
                >
            </m-card-stat>
            <!-- The whole card is the link: no footer (a link inside a link is invalid HTML). -->
            <a mCardStat href="#players" label="Active players" value="1,204" (click)="$event.preventDefault()"></a>
        </m-stat-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStatFooterExample {}
