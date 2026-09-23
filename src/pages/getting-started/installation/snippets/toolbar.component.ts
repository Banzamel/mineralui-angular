import {ChangeDetectionStrategy, Component} from '@angular/core'
// Import from the entry point you need (…/icons, …/theme, later …/controls/button) — never from deep paths.
import {MIcon, mSearchIcon} from '@banzamel/mineralui-angular/icons'
import {MSpacing} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-toolbar',
    imports: [MIcon, MSpacing],
    template: `<p mSpacing mt="md"><m-icon [icon]="search" /> Search</p>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar {
    protected readonly search = mSearchIcon
}
