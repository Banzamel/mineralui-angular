import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MSpinner} from '@banzamel/mineralui-angular/feedback/spinner'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-spinner-inline',
    imports: [MSpinner, MStack, MText],
    template: `
        <m-stack>
            <!-- The spinner is the status: its label is announced. -->
            <m-spinner label="Loading invoices" />

            <!-- The text is the status: hide the spinner and let it follow the text color. -->
            <p mText color="success" role="status">
                <m-spinner color="inherit" size="sm" aria-hidden="true" />
                Saving draft…
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInlineExample {}
