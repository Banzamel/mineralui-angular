import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-toggle-confirm',
    imports: [MStack, MText, MToggle],
    template: `
        <m-stack align="start">
            <!-- Turning it off asks first; turning it on applies at once. -->
            <m-toggle
                [(checked)]="published"
                confirmHeading="Unpublish the tournament?"
                confirmDescription="Players lose access to the schedule."
                confirmButtonText="Unpublish"
                confirmOn="off"
                color="success"
            >
                Published
            </m-toggle>
            <!-- Both directions ask; no visible label, so ariaLabel names the switch. -->
            <m-toggle
                [(checked)]="registration"
                ariaLabel="Registration open"
                confirmHeading="Change the registration?"
            />
            <p mText size="sm" tone="muted">
                Published: {{ published() ? 'yes' : 'no' }} · registration: {{ registration() ? 'open' : 'closed' }}
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleConfirmExample {
    protected readonly published = signal(true)
    protected readonly registration = signal(false)
}
