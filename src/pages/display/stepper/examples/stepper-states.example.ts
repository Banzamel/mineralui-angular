import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MStep, MStepper} from '@banzamel/mineralui-angular/display/stepper'
import {mCreditCardIcon, MIcon, mUserIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-stepper-states',
    imports: [MIcon, MStep, MStepper],
    template: `
        <ol mStepper aria-label="Checkout" variant="vertical" size="sm" clickable [(activeStep)]="step">
            <li mStep heading="Customer" description="Anna Kowalska">
                <m-icon mStart [icon]="userIcon" />
            </li>
            <li mStep heading="Payment" description="The card was declined" error>
                <m-icon mStart [icon]="cardIcon" />
            </li>
            <li mStep heading="Gift wrap" description="Not available for this order" disabled></li>
            <li mStep heading="Confirmation"></li>
        </ol>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperStatesExample {
    protected readonly userIcon = mUserIcon
    protected readonly cardIcon = mCreditCardIcon
    protected readonly step = signal(3)
}
