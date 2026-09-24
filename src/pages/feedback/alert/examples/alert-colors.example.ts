import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MAlert} from '@banzamel/mineralui-angular/feedback/alert'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-alert-colors',
    imports: [MAlert, MStack],
    template: `
        <m-stack>
            <m-alert color="info" heading="Heads up">A new version of the dashboard is available.</m-alert>
            <m-alert color="success" heading="Operation complete">Your changes have been saved.</m-alert>
            <m-alert color="warning" heading="Storage almost full">You have used 92% of your quota.</m-alert>
            <m-alert color="error" heading="Payment failed">The card was declined. Try another one.</m-alert>
            <m-alert color="neutral" [icon]="false">No icon, just a quiet note.</m-alert>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertColorsExample {}
