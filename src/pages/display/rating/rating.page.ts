import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MRating} from '@banzamel/mineralui-angular/display/rating'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import ratingForm from '@generated/examples/display/rating/rating-form'
import ratingReviews from '@generated/examples/display/rating/rating-reviews'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-rating-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MRating],
    template: `
        <doc-article title="MRating" description="Interactive star rating for reviews, feedback forms and scoring UIs.">
            <doc-section
                title="Playground"
                description="Click a star, or focus the group and use the arrow keys, Home and End."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-rating
                        [(value)]="value"
                        [max]="max()"
                        [color]="color()"
                        [size]="size()"
                        [readOnly]="readOnly()"
                        ariaLabel="Rate this component"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="In a form"
                description="MRating is a ControlValueAccessor: bind formControlName, validate with Validators.min(1) for a required rating, and the error shows under the stars once the control is touched."
            >
                <doc-preview [example]="examples.form" />
            </doc-section>

            <doc-section
                title="Read-only scores"
                description='readOnly turns the stars into one image named "4.5 of 5 stars"; fractional values fill the whole stars below them.'
            >
                <doc-preview [example]="examples.reviews" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Interactive, the host is a radiogroup of star radios (aria-checked) with a single tab stop on the checked star: arrows change the rating (clamped at the ends, not wrapping), Home / End jump to 1 and max. Star names come from mineralui.rating.star / .stars, the group name from ariaLabel or mineralui.rating.label."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description='React renders every star as a focusable button inside a radiogroup named "MRating"; here the stars are radios with a roving tab stop, and read-only mode is a single image. value + onChange is the [(value)] model, and the component works with Angular forms (disabled, touched, validation error).'
            />

            <doc-section title="MRating API">
                <doc-props-table api="MRating" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPage {
    protected readonly examples = {form: ratingForm, reviews: ratingReviews}

    protected readonly value = signal(3)
    protected readonly max = signal(5)
    protected readonly color = signal<MColor>('warning')
    protected readonly size = signal<MSize>('md')
    protected readonly readOnly = signal(false)
    protected readonly controls = [
        sliderControl('value', this.value, {min: 0, max: 8}),
        sliderControl('max', this.max, {min: 3, max: 8}),
        selectControl('color', this.color, COLORS),
        selectControl('size', this.size, SIZES),
        booleanControl('readOnly', this.readOnly),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.readOnly() ? `[value]="${this.value()}"` : '[(value)]="rating"',
            this.max() !== 5 && `[max]="${this.max()}"`,
            this.color() !== 'warning' && `color="${this.color()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.readOnly() && 'readOnly',
            'ariaLabel="Rate this component"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-rating ${attrs.join(' ')} />`
    })
}
