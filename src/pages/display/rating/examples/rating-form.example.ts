import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MRating} from '@banzamel/mineralui-angular/display/rating'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-rating-form',
    imports: [MButton, MRating, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="form.markAllAsTouched()">
            <m-stack align="start">
                <span mText weight="semibold" id="app-rating-form-label">How was the workshop?</span>
                <m-rating
                    formControlName="stars"
                    aria-labelledby="app-rating-form-label"
                    [errorMessages]="{min: 'Pick at least one star'}"
                />
                <button mButton type="submit" size="sm">Send feedback</button>
                <p mText tone="muted" size="sm">Value: {{ stars() }}</p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingFormExample {
    protected readonly form = inject(FormBuilder).nonNullable.group({stars: [0, Validators.min(1)]})
    protected readonly stars = toSignal(this.form.controls.stars.valueChanges, {initialValue: 0})
}
