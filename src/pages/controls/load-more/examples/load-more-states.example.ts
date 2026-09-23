import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MLoadMore} from '@banzamel/mineralui-angular/controls/load-more'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-load-more-states',
    imports: [MLoadMore, MStack],
    template: `
        <m-stack>
            <!-- The button is a regular mButton: pick its variant and color. -->
            <m-load-more variant="filled" color="success" label="Show more results" />
            <m-load-more variant="ghost" loading loadingLabel="Fetching orders…" [loaded]="40" [total]="120" />
            <!-- hasMore=false swaps the button for the done text (role="status"). -->
            <m-load-more [hasMore]="false" doneLabel="You're all caught up" />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreStatesExample {}
