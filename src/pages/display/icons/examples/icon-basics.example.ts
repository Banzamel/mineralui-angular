import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIcon, mHomeIcon, mSearchIcon, mSettingsIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-icon-basics',
    imports: [MIcon],
    template: `
        <m-icon [icon]="home" />
        <m-icon [icon]="search" />
        <m-icon [icon]="settings" />
        <span>Icons follow the font size and text color by default.</span>
    `,
    styles: ':host { display: flex; align-items: center; gap: 0.75rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBasicsExample {
    protected readonly home = mHomeIcon
    protected readonly search = mSearchIcon
    protected readonly settings = mSettingsIcon
}
