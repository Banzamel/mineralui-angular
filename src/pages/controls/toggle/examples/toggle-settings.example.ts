import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-toggle-settings',
    imports: [MStack, MText, MToggle],
    template: `
        <m-stack>
            <m-toggle [(checked)]="email">Email notifications</m-toggle>
            <m-toggle [(checked)]="sound" color="success">Sound effects</m-toggle>
            <!-- A switch applies at once: no save button is needed. -->
            <m-toggle [(checked)]="beta" color="warning" labelPosition="left">Beta features</m-toggle>
            <m-toggle [checked]="true" disabled>Security alerts (always on)</m-toggle>
            <p mText size="sm" tone="muted">
                Email {{ email() ? 'on' : 'off' }} · sound {{ sound() ? 'on' : 'off' }} · beta
                {{ beta() ? 'on' : 'off' }}
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSettingsExample {
    protected readonly email = signal(true)
    protected readonly sound = signal(false)
    protected readonly beta = signal(false)
}
