import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MInputPostCode} from '@banzamel/mineralui-angular/inputs/input-post-code'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-post-code-other',
    imports: [MInputPostCode, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- Sweden has no built-in rule: the field takes the code as typed. -->
            <m-input-post-code label="Postal code" country="SE" [selectableCountry]="false" [(value)]="code" />
            <p mText size="sm" tone="muted">Value: "{{ code() }}"</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPostCodeOtherExample {
    protected readonly code = signal('113 51')
}
