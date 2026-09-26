import {ChangeDetectionStrategy, Component} from '@angular/core'
import cardEventMeetups from '@generated/examples/cards/card-event/card-event-meetups'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-card-event-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MCardEvent"
            description="Event card with a date block, location, duration and status badges, price and a register action."
        >
            <doc-section title="Events" description="A status of 'Sold out' (any case) turns the badge red.">
                <doc-preview [example]="examples.main" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The heading is an h3; images are decorative (the heading names the card). The rating is one image named "Rated 4.8 of 5, 126 reviews" (mineralui.serviceCard.rating). Gallery dots are buttons named "Image 2" with aria-current; autoplay stops under reduced motion. The favorite toggle has aria-pressed; the menu is a WAI-ARIA menu button. The date block is a <time> with a machine-readable datetime; the month follows the active locale.'
            />

            <doc-section
                title="Differences from MineralUI for React"
                description='onRegister becomes (register) and registerLabel is renamed actionLabel. The month name comes from the active locale (React: always English). title is renamed heading (ADR 0004); icon is the [mStart] slot. favorite + onFavorite become [(favorite)] (the heart shows when bound) and menuItems are plain data with (menuSelect) (ADR 0008). The action shows by default and hides with actionLabel set to null (React: only with a handler). Gallery images use an empty alt instead of repeating the title. The shared inputs come from MServiceCardBase (listed with "from").'
            />

            <doc-section title="MCardEvent API">
                <doc-props-table api="MCardEvent" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardEventPage {
    protected readonly examples = {main: cardEventMeetups}
}
