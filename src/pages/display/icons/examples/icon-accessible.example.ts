import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIcon, mTrashIcon, mWarningIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-icon-accessible',
    imports: [MIcon],
    template: `
        <!-- Decorative: the button text already names the action, so the icon stays aria-hidden. -->
        <button type="button"><m-icon [icon]="trash" /> Delete</button>

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
