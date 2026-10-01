import {JsonPipe} from '@angular/common'
import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {form, FormField, FormRoot, required} from '@angular/forms/signals'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import {MInputName} from '@banzamel/mineralui-angular/inputs/input-name'
import {MInputPhone} from '@banzamel/mineralui-angular/inputs/input-phone'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Signup {
    name: string
    email: string
    phone: string
    terms: boolean
}

const EMPTY: Signup = {name: '', email: '', phone: '', terms: false}

@Component({
    selector: 'app-signal-forms-signup',
    imports: [
        FormField,
        FormRoot,
        JsonPipe,
        MButton,
        MCheckbox,
        MInline,
        MInputEmail,
        MInputName,
        MInputPhone,
        MStack,
        MText,
    ],
    template: `
        <!-- [formRoot] submits the form tree; [formField] binds each component through its ControlValueAccessor. -->
        <form [formRoot]="signup">
            <m-stack>
                <m-input-name label="Full name" [formField]="signup.name" [minWords]="2" fullWidth />
                <m-input-email label="Email" [formField]="signup.email" fullWidth />
                <m-input-phone label="Phone" [formField]="signup.phone" helperText="Optional" fullWidth />
                <m-checkbox [formField]="signup.terms" [errorMessages]="{required: 'Accept the terms to continue'}">
                    I accept the terms
                </m-checkbox>
                <m-inline>
                    <button mButton type="submit">Create account</button>
                    <button mButton type="button" variant="ghost" (click)="reset()">Reset</button>
                </m-inline>
                <p mText size="sm" tone="muted">Valid: {{ signup().valid() }}</p>
                @if (sent(); as value) {
                    <p mText size="sm">Sent: {{ value | json }}</p>
                }
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsSignupExample {
    // Raw values in the model: the phone field shows "600 700 800", the model holds "600700800".
    protected readonly model = signal<Signup>(EMPTY)
    protected readonly sent = signal<Signup | null>(null)
    protected readonly signup = form(
        this.model,
        (path) => {
            required(path.name)
            required(path.email)
            required(path.terms)
        },
        {
            submission: {
                action: async (tree) => {
                    this.sent.set(tree().value())
                    return undefined
                },
                // submit() touches every field, so all errors show; focus goes to the first one.
                onInvalid: (tree) => tree().errorSummary()[0]?.fieldTree().focusBoundControl(),
            },
        }
    )

    protected reset(): void {
        this.signup().reset(EMPTY)
        this.sent.set(null)
    }
}
