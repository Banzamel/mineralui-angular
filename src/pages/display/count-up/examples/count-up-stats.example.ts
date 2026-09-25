import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCountUp} from '@banzamel/mineralui-angular/display/count-up'
import {MSimpleGrid} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-count-up-stats',
    imports: [MCountUp, MSimpleGrid, MText],
    template: `
        <m-simple-grid minItemWidth="140px">
            <div>
                <p mText size="xl" weight="bold"><span mCountUp [value]="48200" separator="," suffix="+"></span></p>
                <p mText tone="muted" size="sm">Downloads</p>
            </div>
            <div>
                <p mText size="xl" weight="bold">
                    <span mCountUp [value]="99.95" [decimals]="2" suffix="%" [duration]="1600"></span>
                </p>
                <p mText tone="muted" size="sm">Uptime</p>
            </div>
            <div>
                <p mText size="xl" weight="bold"><span mCountUp [value]="1290" prefix="$" separator=","></span></p>
                <p mText tone="muted" size="sm">Monthly revenue</p>
            </div>
        </m-simple-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountUpStatsExample {}
