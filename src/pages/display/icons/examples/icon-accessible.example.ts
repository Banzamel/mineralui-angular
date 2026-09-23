import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mTrashIcon, mWarningIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-icon-accessible',
    imports: [MButton, MIcon],
    template: `
        <!-- Decorative: the button text already names the action, so the icon stays aria-hidden. -->
        <button mButton variant="outlined" color="error"><m-icon mStart [icon]="trash" />Delete</button>

        <!-- Meaningful on its own: label gives it role="img" and an accessible name. -->
        <m-icon [icon]="warning" color="warning" size="lg" label="Unsaved changes" />
    `,
    styles: ':host { display: flex; align-items: center; gap: 1rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconAccessibleExample {
    protected readonly trash = mTrashIcon
    protected readonly warning = mWarningIcon
}
