import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {MColorPicker} from '@banzamel/mineralui-angular/display/color-picker'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-color-picker-form',
    imports: [MColorPicker, MInline, MText, ReactiveFormsModule],
    template: `
        <m-inline align="start" spacing="lg">
            <m-color-picker label="Button color" format="rgb" size="sm" [formControl]="color" />
            <div class="app-color-picker-form-preview" [style.background]="value()">
                <span mText weight="semibold">{{ value() }}</span>
            </div>
        </m-inline>
    `,
    styles: `
        .app-color-picker-form-preview {
            display: grid;
            place-items: center;
            width: 200px;
            min-height: 120px;
            padding: var(--mineral-spacing-md);
            border-radius: var(--mineral-radius-md);
            color: #fff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerFormExample {
    protected readonly color = new FormControl('rgb(22, 163, 74)', {nonNullable: true})
    protected readonly value = toSignal(this.color.valueChanges, {initialValue: this.color.value})
}
