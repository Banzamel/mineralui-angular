import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MDropdownItem, MDropdownMenu} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'

const COUNTRIES = [
    'Austria',
    'Belgium',
    'Croatia',
    'Czechia',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Ireland',
    'Italy',
    'Latvia',
    'Lithuania',
    'Netherlands',
    'Poland',
    'Portugal',
    'Slovakia',
    'Spain',
    'Sweden',
]

@Component({
    selector: 'app-dropdown-long',
    imports: [MButton, MInline, MDropdownItem, MDropdownMenu, MPopoverTrigger],
    template: `
        <m-inline>
            <button mButton variant="outlined" [mPopoverTrigger]="all">All countries</button>
            <m-dropdown-menu #all>
                @for (country of countries; track country) {
                    <button mDropdownItem>{{ country }}</button>
                }
            </m-dropdown-menu>

            <button mButton variant="outlined" [mPopoverTrigger]="capped">Capped at 200px</button>
            <m-dropdown-menu #capped style="--m-dropdown-menu-max-height: 200px">
                @for (country of countries; track country) {
                    <button mDropdownItem>{{ country }}</button>
                }
            </m-dropdown-menu>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownLongExample {
    protected readonly countries = COUNTRIES
}
