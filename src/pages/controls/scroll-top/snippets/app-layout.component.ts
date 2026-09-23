import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {MScrollTop} from '@banzamel/mineralui-angular/controls/scroll-top'

// One instance per page is enough: put it next to the router outlet of your layout.
@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, MScrollTop],
    template: `
        <main>
            <router-outlet />
        </main>
        <m-scroll-top [threshold]="400" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {}
