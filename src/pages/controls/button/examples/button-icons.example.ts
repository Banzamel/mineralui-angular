import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mArrowRightIcon, mPlusIcon, mSearchIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-button-icons',
    imports: [MButton, MIcon, MInline],
    template: `
        <m-inline>
            <button mButton><m-icon mStart [icon]="icons.plus" />New project</button>
            <button mButton variant="outlined">Continue<m-icon mEnd [icon]="icons.arrow" /></button>
            <!-- Icon-only buttons have no visible text: name them with aria-label. -->
            <button mButton variant="ghost" iconOnly aria-label="Search"><m-icon [icon]="icons.search" /></button>
            <button mButton color="error" shape="circle" iconOnly aria-label="Delete">
                <m-icon [icon]="icons.trash" />
            </button>
            <button mButton variant="secondary" rounded>Rounded</button>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconsExample {
    protected readonly icons = {plus: mPlusIcon, arrow: mArrowRightIcon, search: mSearchIcon, trash: mTrashIcon}
}
