import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mCopyIcon, mSettingsIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MTooltip} from '@banzamel/mineralui-angular/overlays/tooltip'

@Component({
    selector: 'app-tooltip-icons',
    imports: [MButton, MIcon, MInline, MTooltip],
    template: `
        <m-inline>
            <button mButton variant="ghost" iconOnly aria-label="Copy" [mTooltip]="'Copy link'">
                <m-icon [icon]="icons.copy" />
            </button>
            <button
                mButton
                variant="ghost"
                iconOnly
                aria-label="Settings"
                [mTooltip]="settingsHint"
                tooltipPlacement="bottom"
            >
                <m-icon [icon]="icons.settings" />
            </button>
            <button
                mButton
                variant="ghost"
                color="error"
                iconOnly
                aria-label="Delete"
                [mTooltip]="'Moves to trash'"
                tooltipPlacement="right"
            >
                <m-icon [icon]="icons.trash" />
            </button>
        </m-inline>
        <ng-template #settingsHint>Opens <strong>workspace settings</strong></ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipIconsExample {
    protected readonly icons = {copy: mCopyIcon, settings: mSettingsIcon, trash: mTrashIcon}
}
