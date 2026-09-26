import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {
    mAnalyticsIllustration,
    mCalendarIllustration,
    mChatIllustration,
    MIllustration,
} from '@banzamel/mineralui-angular/illustrations'
import {MShowcaseCarousel} from '@banzamel/mineralui-angular/media/showcase-carousel'
import {MShowcaseCarouselItem} from '@banzamel/mineralui-angular/media/showcase-carousel-item'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

@Component({
    selector: 'app-showcase-carousel-illustrations',
    imports: [MButton, MHeading, MIllustration, MShowcaseCarousel, MShowcaseCarouselItem],
    template: `
        <m-showcase-carousel ariaLabel="Product tour" [itemWidthRatio]="0.5" [initialIndex]="0">
            @for (step of steps; track step.title) {
                <m-showcase-carousel-item [mediaHeight]="200">
                    <m-illustration mShowcaseItemMedia [illustration]="step.illustration" size="lg" />
                    <h4 mHeading>{{ step.title }}</h4>
                    <button mButton mShowcaseItemFooter size="sm" variant="outlined">Learn more</button>
                </m-showcase-carousel-item>
            }
        </m-showcase-carousel>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseCarouselIllustrationsExample {
    protected readonly steps = [
        {title: 'Track your numbers', illustration: mAnalyticsIllustration},
        {title: 'Plan the week', illustration: mCalendarIllustration},
        {title: 'Talk to your team', illustration: mChatIllustration},
    ]
}
