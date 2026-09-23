import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-text-truncate',
    imports: [MStack, MText],
    template: `
        <m-stack>
            <p mText truncate>
                A single line that is far too long for its column gets cut with an ellipsis instead of wrapping onto the
                next line.
            </p>
            <p mText truncate="2" tone="muted">
                Clamping keeps card descriptions even: this paragraph shows two lines at most, whatever the length of
                the copy the content team writes for it, and ends with an ellipsis where it was cut off by the clamp.
            </p>
        </m-stack>
    `,
    styles: ':host { display: block; max-width: 360px; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTruncateExample {}
