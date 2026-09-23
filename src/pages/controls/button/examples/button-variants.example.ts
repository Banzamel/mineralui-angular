import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mSettingsIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-button-variants',
    imports: [MButton, MIcon, MInline],
    template: `
        <m-inline>
            <button mButton>Filled</button>
            <button mButton variant="secondary">Secondary</button>
            <button mButton variant="outlined">Outlined</button>
            <button mButton variant="ghost">Ghost</button>
            <button mButton variant="link">Link</button>
            <button mButton variant="icon" aria-label="Settings"><m-icon [icon]="settingsIcon" /></button>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonVariantsExample {
    protected readonly settingsIcon = mSettingsIcon
}
