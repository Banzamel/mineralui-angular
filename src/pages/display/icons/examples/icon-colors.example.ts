import {ChangeDetectionStrategy, Component} from '@angular/core'
import type {MIconColor} from '@banzamel/mineralui-angular/icons'
import {MIcon, mBellIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-icon-colors',
    imports: [MIcon],
    template: `
        @for (color of colors; track color) {
            <m-icon [icon]="bell" [color]="color" size="lg" />
        }
    `,
    styles: ':host { display: flex; flex-wrap: wrap; gap: 1rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconColorsExample {
    protected readonly bell = mBellIcon
    protected readonly colors: readonly MIconColor[] = [
        'inherit',
        'primary',
        'neutral',
        'success',
        'error',
        'warning',
        'info',
        'news',
    ]
}
