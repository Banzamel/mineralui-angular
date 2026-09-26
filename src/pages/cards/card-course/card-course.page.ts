import {ChangeDetectionStrategy, Component} from '@angular/core'
import cardCourseClasses from '@generated/examples/cards/card-course/card-course-classes'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-card-course-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MCardCourse"
            description="Course card with the teacher, participant avatars and the seat count, duration and availability, price and a join action."
        >
            <doc-section
                title="Courses"
                description="The first four participants are shown with the seat count; an unavailable course disables its action."
            >
                <doc-preview [example]="examples.main" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The heading is an h3; images are decorative (the heading names the card). The rating is one image named "Rated 4.8 of 5, 126 reviews" (mineralui.serviceCard.rating). Gallery dots are buttons named "Image 2" with aria-current; autoplay stops under reduced motion. The favorite toggle has aria-pressed; the menu is a WAI-ARIA menu button. The seat count is named "6 of 20 participants" (mineralui.serviceCard.participants).'
            />

            <doc-section
                title="Differences from MineralUI for React"
                description='onAction becomes the (action) output. title is renamed heading (ADR 0004); icon is the [mStart] slot. favorite + onFavorite become [(favorite)] (the heart shows when bound) and menuItems are plain data with (menuSelect) (ADR 0008). The action shows by default and hides with actionLabel set to null (React: only with a handler). Gallery images use an empty alt instead of repeating the title. The shared inputs come from MServiceCardBase (listed with "from").'
            />

            <doc-section title="MCardCourse API">
                <doc-props-table api="MCardCourse" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCoursePage {
    protected readonly examples = {main: cardCourseClasses}
}
