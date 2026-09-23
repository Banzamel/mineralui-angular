import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {composeValidators, validateEmail, validateMinLength, validateRequired} from '@banzamel/mineralui-angular/utils'

// Runs validators in order and stops at the first failure.
const validateWorkEmail = composeValidators(validateRequired, validateMinLength(6), validateEmail)

@Component({
    selector: 'app-utils-validators',
    imports: [MCode, MStack, MText],
    template: `
        <m-stack>
            <!-- TEMP: replace with MInputEmail (etap 4) -->
            <label>
                Work email
                <input type="email" [value]="email()" (input)="onInput($event)" />
            </label>
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

    protected onInput(event: Event): void {
        if (event.target instanceof HTMLInputElement) this.email.set(event.target.value)
    }
}
