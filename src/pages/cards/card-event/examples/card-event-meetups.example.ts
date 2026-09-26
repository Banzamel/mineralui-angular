import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCardEvent} from '@banzamel/mineralui-angular/cards/card-event'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-card-event-meetups',
    imports: [MCardEvent, MText],
    template: `
        <div class="app-card-grid">
            <m-card-event
                heading="Design systems meetup"
                description="Talks on tokens, theming and docs that stay in sync."
                date="2026-10-14"
                location="Warsaw"
                duration="3 h"
                status="12 seats left"
                [price]="0"
                image="https://picsum.photos/seed/event-meetup/640/400"
                (register)="registered.set(true)"
            />
            <m-card-event
                heading="Angular workshop"
                description="A full day of hands-on signals and SSR."
                date="2026-11-03"
                location="Kraków"
                duration="8 h"
                status="Sold out"
                [price]="350"
                color="news"
                image="https://picsum.photos/seed/event-workshop/640/400"
            />
        </div>
        <p mText tone="muted" size="sm">{{ registered() ? 'Registered for the meetup.' : 'Pick an event.' }}</p>
    `,
    styles: `
        .app-card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--mineral-spacing-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardEventMeetupsExample {
    protected readonly registered = signal(false)
}
