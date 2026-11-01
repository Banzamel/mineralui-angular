import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDropdownItem, MDropdownMenu} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopconfirm} from '@banzamel/mineralui-angular/overlays/popconfirm'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// A row menu whose only risky action asks first: "Keep" (or Escape) closes the whole menu and focus goes back to the
// menu button, so the user is not left in a menu they no longer need.
@Component({
    selector: 'app-dropdown-close-on-cancel',
    imports: [MButton, MDropdownItem, MDropdownMenu, MPopconfirm, MPopoverTrigger, MText],
    template: `
        <button mButton size="sm" variant="outlined" [mPopoverTrigger]="menu">Entry actions</button>
        <m-dropdown-menu #menu closeOnCancel (closed)="reason.set($event)">
            <button mDropdownItem (click)="last.set('Edited')">Edit entry</button>
            <button mDropdownItem color="error" [mPopoverTrigger]="withdraw">Withdraw entry</button>
            <m-popconfirm
                #withdraw
                heading="Withdraw this entry?"
                color="error"
                placement="left-start"
                confirmText="Withdraw"
                cancelText="Keep"
                (confirmed)="last.set('Withdrawn')"
            />
        </m-dropdown-menu>
        <p mText tone="muted" size="sm">last action: {{ last() || '—' }} · menu closed: {{ reason() || '—' }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownCloseOnCancelExample {
    protected readonly last = signal('')
    protected readonly reason = signal('')
}
