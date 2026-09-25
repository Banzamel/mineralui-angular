import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MBlur} from '@banzamel/mineralui-angular/display/blur'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-blur-controlled',
    imports: [MButton, MBlur, MInline, MText],
    template: `
        <m-inline spacing="md">
            <span mText>API token:</span>
            <m-blur reveal="click" [(revealed)]="revealed">sk-live-4f9a2c71e0</m-blur>
            <button mButton variant="outlined" size="sm" (click)="revealed.set(!revealed())">
                {{ revealed() ? 'Hide' : 'Show' }}
            </button>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurControlledExample {
    protected readonly revealed = signal(false)
}
