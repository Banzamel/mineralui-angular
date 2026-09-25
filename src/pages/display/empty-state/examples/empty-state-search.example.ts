import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MEmptyState} from '@banzamel/mineralui-angular/display/empty-state'
import {MIcon, mSearchIcon} from '@banzamel/mineralui-angular/icons'
import {MInputSearch} from '@banzamel/mineralui-angular/inputs/input-search'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Mango', 'Orange']

@Component({
    selector: 'app-empty-state-search',
    imports: [MEmptyState, MIcon, MInputSearch, MStack],
    template: `
        <m-stack class="app-empty-state-search">
            <m-input-search label="Fruit" [(value)]="query" />
            @if (matches().length > 0) {
                <ul>
                    @for (fruit of matches(); track fruit) {
                        <li>{{ fruit }}</li>
                    }
                </ul>
            } @else {
                <m-empty-state
                    size="sm"
                    color="primary"
                    heading="No fruit matches"
                    [description]="'Nothing contains “' + query() + '”.'"
                    buttonText="Clear search"
                    (action)="query.set('')"
                >
                    <m-icon mStart [icon]="searchIcon" [size]="36" />
                </m-empty-state>
            }
        </m-stack>
    `,
    styles: `
        .app-empty-state-search {
            max-width: 360px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateSearchExample {
    protected readonly searchIcon = mSearchIcon
    protected readonly query = signal('kiwi')
    protected readonly matches = computed(() => {
        const query = this.query().trim().toLowerCase()
        return FRUITS.filter((fruit) => fruit.toLowerCase().includes(query))
    })
}
