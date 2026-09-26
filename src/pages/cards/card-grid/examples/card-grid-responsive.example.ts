import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MCardGrid, MCardGridItem} from '@banzamel/mineralui-angular/cards/card-grid'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Destination {
    readonly id: string
    readonly city: string
    readonly country: string
}

@Component({
    selector: 'app-card-grid-responsive',
    imports: [MCard, MCardBody, MCardGrid, MCardGridItem, MHeading, MText],
    template: `
        <!-- 1 column on phones, 2 from 640 px, 3 from 1024 px, 4 from 1280 px -->
        <m-card-grid label="Destinations" [items]="destinations" [columns]="{base: 1, sm: 2, lg: 3, xl: 4}">
            <ng-template mCardGridItem [mCardGridItemOf]="destinations" let-place>
                <m-card>
                    <m-card-body>
                        <h3 mHeading class="app-grid-title">{{ place.city }}</h3>
                        <p mText tone="muted" size="sm">{{ place.country }}</p>
                    </m-card-body>
                </m-card>
            </ng-template>
        </m-card-grid>
    `,
    styles: `
        h3.app-grid-title {
            font-size: var(--mineral-font-size-lg);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGridResponsiveExample {
    protected readonly destinations: readonly Destination[] = [
        {id: 'lis', city: 'Lisbon', country: 'Portugal'},
        {id: 'krk', city: 'Kraków', country: 'Poland'},
        {id: 'kyo', city: 'Kyoto', country: 'Japan'},
        {id: 'val', city: 'Valparaíso', country: 'Chile'},
        {id: 'tbs', city: 'Tbilisi', country: 'Georgia'},
        {id: 'que', city: 'Québec', country: 'Canada'},
        {id: 'mar', city: 'Marrakesh', country: 'Morocco'},
        {id: 'hoi', city: 'Hội An', country: 'Vietnam'},
    ]
}
