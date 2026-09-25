import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MRating} from '@banzamel/mineralui-angular/display/rating'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-rating-reviews',
    imports: [MRating, MText],
    template: `
        <ul class="app-rating-reviews">
            @for (course of courses; track course.name) {
                <li>
                    <span mText>{{ course.name }}</span>
                    <m-rating readOnly size="sm" [value]="course.score" [ariaLabel]="course.name" />
                </li>
            }
        </ul>
    `,
    styles: `
        .app-rating-reviews {
            display: grid;
            gap: var(--mineral-spacing-sm);
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .app-rating-reviews li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--mineral-spacing-md);
            max-width: 360px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingReviewsExample {
    protected readonly courses = [
        {name: 'Angular signals', score: 5},
        {name: 'Design tokens', score: 4.5},
        {name: 'Accessible forms', score: 3},
    ]
}
