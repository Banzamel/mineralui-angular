import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {form, FormField, required, submit} from '@angular/forms/signals'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MCheckboxGroup} from '@banzamel/mineralui-angular/controls/checkbox-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Survey {
    sources: string[]
}

@Component({
    selector: 'app-checkbox-group-signal-forms',
    imports: [FormField, MButton, MCheckbox, MCheckboxGroup, MStack, MText],
    template: `
        <m-stack align="start">
            <fieldset
                mCheckboxGroup
                label="How did you hear about us?"
                [formField]="survey.sources"
                [errorMessages]="{required: 'Pick at least one source'}"
            >
                <m-checkbox value="search">Search engine</m-checkbox>
                <m-checkbox value="friend">A friend</m-checkbox>
                <m-checkbox value="social">Social media</m-checkbox>
            </fieldset>
            <button mButton size="sm" (click)="send()">Send</button>
            <p mText size="sm" tone="muted">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupSignalFormsExample {
    protected readonly model = signal<Survey>({sources: []})
    protected readonly survey = form(this.model, (path) => {
        // required() marks the group; the group itself reports `required` for an empty list, so its text comes
        // from errorMessages (or the dictionary), not from a rule message.
        required(path.sources)
    })
    protected readonly status = signal('Not sent')

    protected send(): void {
        void submit(this.survey, async () => {
            this.status.set(`Sent: ${this.model().sources.join(', ')}`)
            return undefined
        })
    }
}
