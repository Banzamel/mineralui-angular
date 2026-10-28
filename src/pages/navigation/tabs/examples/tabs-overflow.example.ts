import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTabs} from '@banzamel/mineralui-angular/layout/tabs'
import type {MTabsItem} from '@banzamel/mineralui-angular/layout/tabs'

@Component({
    selector: 'app-tabs-overflow',
    imports: [MTabs],
    template: `
        <!-- A phone-width card: the labels keep their width and the tab list scrolls sideways. -->
        <div class="doc-tabs-narrow">
            <m-tabs size="sm" ariaLabel="Competition" [items]="sections" [(value)]="section" />
        </div>
    `,
    styles: `
        .doc-tabs-narrow {
            max-width: 320px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsOverflowExample {
    protected readonly sections: readonly MTabsItem[] = [
        {value: 'overview', label: 'Overview'},
        {value: 'events', label: 'Competition events'},
        {value: 'entries', label: 'Entries'},
        {value: 'officials', label: 'Officials'},
        {value: 'results', label: 'Results'},
    ]
    protected readonly section = signal('overview')
}
