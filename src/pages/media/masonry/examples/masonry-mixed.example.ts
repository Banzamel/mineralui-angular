import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MMasonry} from '@banzamel/mineralui-angular/media/masonry'
import {MMasonryItem} from '@banzamel/mineralui-angular/media/masonry-item'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-masonry-mixed',
    imports: [MCard, MCardBody, MHeading, MMasonry, MMasonryItem, MText],
    template: `
        <m-masonry [columns]="3">
            <m-masonry-item
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&fit=max&q=80"
                alt="Mountain lake"
                interactive
                imageClickEffect="zoom"
            >
                <h5 mHeading>Mountain lake</h5>
                <span mText tone="muted" size="sm" mMasonryItemFooter>Saved by 24 people</span>
            </m-masonry-item>
            <m-card padded color="info">
                <m-card-body>
                    <h5 mHeading>Weekly picks</h5>
                    <p mText tone="muted" size="sm">Six places our editors could not stop talking about this week.</p>
                </m-card-body>
            </m-card>
            <m-masonry-item
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&fit=max&q=80"
                alt="Forest path"
                [height]="320"
            />
            <m-card padded color="success">
                <m-card-body>
                    <p mText>“The best trail of the season — go early, the light is unreal.”</p>
                    <p mText tone="muted" size="sm">— Ewa, trail runner</p>
                </m-card-body>
            </m-card>
            <m-masonry-item
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&fit=max&q=80"
                alt="Autumn road"
                imageClickEffect="dim"
            />
        </m-masonry>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryMixedExample {}
