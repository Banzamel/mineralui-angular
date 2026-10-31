import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const ACTIONS = ['Copy', 'Paste', 'Duplicate', 'Archive', 'Move', 'Export', 'Delete'] as const

@Component({
    selector: 'app-button-group-wrap',
    imports: [MButton, MButtonGroup, MStack, MText],
    template: `
        <!-- A narrow column: without wrap the group would overflow it. -->
        <m-stack spacing="md" style="max-width: 18rem">
            <p mText size="sm" tone="muted">Spaced apart — the usual choice for a toolbar that wraps</p>
            <m-button-group wrap [attached]="false" variant="outlined" size="sm" aria-label="Row actions">
                @for (action of actions; track action) {
                    <button mButton>{{ action }}</button>
                }
            </m-button-group>

            <p mText size="sm" tone="muted">Attached — lines get a gap, buttons stay joined within a line</p>
            <m-button-group wrap variant="outlined" color="neutral" size="sm" aria-label="Row actions, attached">
                @for (action of actions; track action) {
                    <button mButton>{{ action }}</button>
                }
            </m-button-group>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupWrapExample {
    protected readonly actions = ACTIONS
}
