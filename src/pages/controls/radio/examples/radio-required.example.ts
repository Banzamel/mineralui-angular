import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MRadio, MRadioGroup} from '@banzamel/mineralui-angular/controls/radio'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-radio-required',
    imports: [MRadio, MRadioGroup, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- required marks the legend and sets aria-required on the radiogroup; validation stays with the form. -->
            <fieldset
                mRadioGroup
                label="Shirt size"
                helperText="The size printed on your badge"
                direction="horizontal"
                required
                [(value)]="size"
            >
                <m-radio value="s">S</m-radio>
                <m-radio value="m">M</m-radio>
                <m-radio value="l">L</m-radio>
            </fieldset>
            <p mText size="sm" tone="muted">Value: {{ size() ?? 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioRequiredExample {
    protected readonly size = signal<string | undefined>(undefined)
}
