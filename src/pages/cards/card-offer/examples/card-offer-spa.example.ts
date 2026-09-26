import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCardOffer} from '@banzamel/mineralui-angular/cards/card-offer'
import type {MCardMenuItem} from '@banzamel/mineralui-angular/cards/card-tile'
import {mShareIcon} from '@banzamel/mineralui-angular/icons'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-card-offer-spa',
    imports: [MCardOffer, MText],
    template: `
        <div class="app-card-grid">
            <m-card-offer
                heading="Deep tissue massage"
                description="A slow, firm full-body session for tight shoulders and a stiff back."
                [price]="180"
                duration="60 min"
                [available]="true"
                [rating]="4.8"
                [reviewCount]="126"
                [leader]="{name: 'Ewa Mazur'}"
                [gallery]="gallery"
                [(favorite)]="saved"
                [menuItems]="menu"
                (menuSelect)="log.set($event.label)"
                (action)="log.set('Booked the massage')"
            />
            <m-card-offer
                heading="Evening yoga"
                description="Gentle flow for beginners, mats provided."
                [price]="60"
                duration="75 min"
                [available]="3"
                [rating]="4.6"
                [reviewCount]="58"
                color="success"
                image="https://picsum.photos/seed/offer-yoga/640/400"
                actionLabel="Reserve a spot"
                (action)="log.set('Reserved yoga')"
            />
        </div>
        <p mText tone="muted" size="sm">{{ log() || 'Book, save or open the menu.' }}</p>
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
export class CardOfferSpaExample {
    protected readonly gallery = [1, 2, 3].map((index) => `https://picsum.photos/seed/offer-spa-${index}/640/400`)
    protected readonly menu: readonly MCardMenuItem[] = [{label: 'Share offer', icon: mShareIcon}]
    protected readonly saved = signal(false)
    protected readonly log = signal('')
}
