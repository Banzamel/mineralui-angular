import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MClickOutside} from '@banzamel/mineralui-angular/utils'

@Component({
    selector: 'app-account-menu',
    imports: [MButton, MClickOutside],
    template: `
        <!-- useClickOutside(ref, handler) → an output on the element itself: no ref. -->
        <div (mClickOutside)="open.set(false)">
            <button mButton (click)="open.set(!open())">Account</button>
            @if (open()) {
                <p>Signed in as Ada</p>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountMenu {
    protected readonly open = signal(false)
}
