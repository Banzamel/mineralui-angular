import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIcon, mCalendarIconV2, mFlagPlIconV2, mHomeIconV2} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-icon-v2-shell',
    imports: [MIcon],
    template: `
        <!-- The same constant, with and without the card shell (header shell for calendar, flag card for flags). -->
        <m-icon [icon]="home" size="xl" color="primary" />
        <m-icon [icon]="home" size="xl" color="primary" shell />
        <m-icon [icon]="calendar" size="xl" color="info" shell />
        <m-icon [icon]="flag" size="xl" shell label="Polski" />
    `,
    styles: ':host { display: flex; align-items: center; gap: 1.25rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconV2ShellExample {
    protected readonly home = mHomeIconV2
    protected readonly calendar = mCalendarIconV2
    protected readonly flag = mFlagPlIconV2
}
