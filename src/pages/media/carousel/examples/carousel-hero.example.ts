import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCarousel, MCarouselSlide} from '@banzamel/mineralui-angular/media/carousel'
import {MImage} from '@banzamel/mineralui-angular/media/image'

@Component({
    selector: 'app-carousel-hero',
    imports: [MCarousel, MCarouselSlide, MImage],
    template: `
        <m-carousel class="app-carousel-hero" ariaLabel="Seasonal offers" transition="fade" autoPlay [interval]="4000">
            @for (banner of banners; track banner.seed) {
                <m-carousel-slide>
                    <m-image ratio="21:9" class="app-carousel-hero-image">
                        <img [src]="'https://picsum.photos/seed/' + banner.seed + '/1200/514'" [alt]="banner.alt" />
                    </m-image>
                </m-carousel-slide>
            }
        </m-carousel>
    `,
    styles: `
        .app-carousel-hero {
            max-width: 640px;
        }

        .app-carousel-hero-image {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselHeroExample {
    protected readonly banners = [
        {seed: 'hero-spring', alt: 'Spring collection — 20% off outdoor gear'},
        {seed: 'hero-summer', alt: 'Summer trips — book two nights, get one free'},
        {seed: 'hero-autumn', alt: 'Autumn reading list — new releases every week'},
    ]
}
