import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIcon, mStarIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-icon-sizes',
    imports: [MIcon],
    template: `
        <m-icon [icon]="star" size="xs" />
        <m-icon [icon]="star" size="sm" />
        <m-icon [icon]="star" size="md" />
        <m-icon [icon]="star" size="lg" />
        <m-icon [icon]="star" size="xl" />
        <m-icon [icon]="star" [size]="48" />
        <m-icon [icon]="star" size="4rem" />
    `,
    styles: ':host { display: flex; align-items: center; gap: 1rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSizesExample {
    protected readonly star = mStarIcon
}
