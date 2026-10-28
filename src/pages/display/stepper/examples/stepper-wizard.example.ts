import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MStep, MStepContent, MStepper, MStepperPanel} from '@banzamel/mineralui-angular/display/stepper'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-stepper-wizard',
    imports: [MButton, MInput, MStack, MStep, MStepContent, MStepper, MStepperPanel, MText],
    template: `
        <m-stack>
            <ol mStepper #wizard="mStepper" clickable aria-label="New club" [(activeStep)]="step">
                <li mStep heading="Club">
                    <ng-template mStepContent>
                        <m-input label="Club name" [(value)]="name" />
                    </ng-template>
                </li>
                <li mStep heading="Contact" optional>
                    <ng-template mStepContent>
                        <m-input label="E-mail" type="email" />
                    </ng-template>
                </li>
                <li mStep heading="Review">
                    <ng-template mStepContent>
                        <p mText>Create the club "{{ name() || 'Unnamed' }}"?</p>
                    </ng-template>
                </li>
            </ol>
            <!-- After the list: an <ol> may only hold <li>. -->
            <m-stepper-panel [stepper]="wizard" navigation>
                @if (step() === 2) {
                    <button mStepperPanelActions mButton (click)="created.set(true)">Create club</button>
                }
            </m-stepper-panel>
            @if (created()) {
                <p mText tone="muted" role="status">Club created.</p>
            }
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperWizardExample {
    protected readonly step = signal(0)
    protected readonly name = signal('')
    protected readonly created = signal(false)
}
