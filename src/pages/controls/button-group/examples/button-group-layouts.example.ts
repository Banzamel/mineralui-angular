import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-button-group-layouts',
    imports: [MButton, MButtonGroup, MInline],
    template: `
        <m-inline align="start">
            <m-button-group orientation="vertical" variant="secondary" aria-label="Account">
                <button mButton>Profile</button>
                <button mButton>Billing</button>
                <button mButton>Team</button>
            </m-button-group>

            <!-- Detached: the buttons keep their own corners and a small gap. -->
            <m-button-group [attached]="false" size="sm" aria-label="Filters">
                <button mButton>All</button>
                <button mButton variant="ghost">Open</button>
                <!-- A button's own input always wins over the group default. -->
                <button mButton variant="ghost" color="success">Closed</button>
            </m-button-group>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupLayoutsExample {}
