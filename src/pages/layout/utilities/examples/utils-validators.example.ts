import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {composeValidators, validateEmail, validateMinLength, validateRequired} from '@banzamel/mineralui-angular/utils'

// Runs validators in order and stops at the first failure.
const validateWorkEmail = composeValidators(validateRequired, validateMinLength(6), validateEmail)

@Component({
    selector: 'app-utils-validators',
    imports: [MCode, MInputEmail, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- The built-in rule is off: this example shows the result of composeValidators instead. -->
            <m-input-email label="Work email" [(value)]="email" [validate]="false" />
            <p mText size="sm" [tone]="result().valid ? 'accent' : 'muted'" aria-live="polite">
                <code mCode>{{ result().valid ? 'valid' : result().error }}</code>
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilsValidatorsExample {
    protected readonly email = signal('ann@')
    protected readonly result = computed(() => validateWorkEmail(this.email()))
}
