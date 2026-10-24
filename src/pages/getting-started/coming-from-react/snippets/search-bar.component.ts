import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
// Icons are constants for one MIcon component (tree-shaken like any other import).
import {mAirplaneFillIcon, MIcon, mSearchIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-search-bar',
    imports: [MButton, MIcon],
    template: `
        <m-icon [icon]="airplaneIcon" size="lg" label="Flights" />
        <!-- startIcon → an element with the mStart slot attribute. -->
        <button mButton>
            <m-icon mStart [icon]="searchIcon" />
            Search
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
    protected readonly airplaneIcon = mAirplaneFillIcon
    protected readonly searchIcon = mSearchIcon
}
