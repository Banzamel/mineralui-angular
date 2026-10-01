import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {form, FormField, required, submit} from '@angular/forms/signals'
import type {FieldTree, TreeValidationResult} from '@angular/forms/signals'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MRules} from '@banzamel/mineralui-angular/form'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MInputPassword} from '@banzamel/mineralui-angular/inputs/input-password'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Account {
    username: string
    password: string
}

// A stand-in for the API: "admin" is taken.
async function register(account: Account, tree: FieldTree<Account>): Promise<TreeValidationResult> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    if (account.username.trim().toLowerCase() === 'admin') {
        return [{kind: 'server', fieldTree: tree.username, message: 'This username is already taken'}]
    }
    return undefined
}

@Component({
    selector: 'app-signal-forms-submit',
    imports: [FormField, MButton, MInput, MInputPassword, MStack, MText],
    template: `
        <form novalidate (submit)="send($event)">
            <m-stack>
                <m-input label="Username" helperText="Try “admin”" [formField]="account.username" fullWidth />
                <m-input-password label="Password" [formField]="account.password" fullWidth />
                <button mButton type="submit" [loading]="account().submitting()">Register</button>
                <p mText size="sm" tone="muted" role="status">{{ result() }}</p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsSubmitExample {
    protected readonly model = signal<Account>({username: '', password: ''})
    protected readonly result = signal('')
    protected readonly account = form(this.model, (path) => {
        required(path.username)
        required(path.password)
        MRules.minLength(path.password, 8)
    })

    protected async send(event: Event): Promise<void> {
        event.preventDefault()
        this.result.set('')
        // Errors returned by the action (here: from the server) land on their fields, like rule errors.
        const done = await submit(this.account, (tree) => register(tree().value(), tree))
        if (done) {
            this.result.set(`Registered ${this.model().username}`)
            return
        }
        // Invalid or rejected: focus the first field with an error.
        this.account().errorSummary()[0]?.fieldTree().focusBoundControl()
    }
}
