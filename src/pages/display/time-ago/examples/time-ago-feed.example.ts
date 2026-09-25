import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MTimeAgo} from '@banzamel/mineralui-angular/display/time-ago'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const MINUTE = 60 * 1000

@Component({
    selector: 'app-time-ago-feed',
    imports: [MTimeAgo, MText],
    template: `
        <ul class="app-time-ago-feed">
            @for (item of feed; track item.text) {
                <li>
                    <span mText>{{ item.text }}</span>
                    <!-- Older than a week: the date instead of "3 weeks ago". -->
                    <span mText tone="muted" size="sm"><time mTimeAgo [value]="item.at" maxRelative="7d"></time></span>
                </li>
            }
        </ul>
    `,
    styles: `
        .app-time-ago-feed {
            display: grid;
            gap: var(--mineral-spacing-sm);
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .app-time-ago-feed li {
            display: flex;
            justify-content: space-between;
            gap: var(--mineral-spacing-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeAgoFeedExample {
    private readonly now = Date.now()
    protected readonly feed = [
        {text: 'Deployed v2.4.0', at: new Date(this.now - 2 * MINUTE)},
        {text: 'Merged the theming PR', at: new Date(this.now - 3 * 60 * MINUTE)},
        {text: 'Opened issue #128', at: new Date(this.now - 2 * 24 * 60 * MINUTE)},
        {text: 'Released v2.0.0', at: new Date(this.now - 40 * 24 * 60 * MINUTE)},
    ]
}
