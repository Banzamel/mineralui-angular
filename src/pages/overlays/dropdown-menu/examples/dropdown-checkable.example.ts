import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {
    MDropdownDivider,
    MDropdownGroup,
    MDropdownItem,
    MDropdownMenu,
} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'

type Density = 'compact' | 'comfortable'

// View options: radio items pick one density, checkbox items switch extras on and off. The menu stays open.
@Component({
    selector: 'app-dropdown-checkable',
    imports: [MButton, MDropdownDivider, MDropdownGroup, MDropdownItem, MDropdownMenu, MPopoverTrigger, MText],
    template: `
        <button mButton size="sm" variant="outlined" [mPopoverTrigger]="menu">View</button>
        <m-dropdown-menu #menu [closeOnSelect]="false">
            <m-dropdown-group label="Density">
                <button
                    mDropdownItem
                    itemRole="menuitemradio"
                    description="More rows on screen"
                    [checked]="density() === 'compact'"
                    (click)="density.set('compact')"
                >
                    Compact
                </button>
                <button
                    mDropdownItem
                    itemRole="menuitemradio"
                    description="Roomier rows, easier to scan"
                    [checked]="density() === 'comfortable'"
                    (click)="density.set('comfortable')"
                >
                    Comfortable
                </button>
            </m-dropdown-group>
            <m-dropdown-divider />
            <button mDropdownItem itemRole="menuitemcheckbox" [checked]="grid()" (click)="grid.set(!grid())">
                Show grid lines
            </button>
            <button
                mDropdownItem
                itemRole="menuitemcheckbox"
                [checked]="weekends()"
                (click)="weekends.set(!weekends())"
            >
                Show weekends
            </button>
        </m-dropdown-menu>
        <p mText tone="muted" size="sm">
            {{ density() }} · grid {{ grid() ? 'on' : 'off' }} · weekends {{ weekends() ? 'on' : 'off' }}
        </p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownCheckableExample {
    protected readonly density = signal<Density>('compact')
    protected readonly grid = signal(true)
    protected readonly weekends = signal(false)
}
