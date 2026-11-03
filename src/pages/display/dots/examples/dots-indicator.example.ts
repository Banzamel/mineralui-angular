import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MDots} from '@banzamel/mineralui-angular/display/dots'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const DAYS = [
    {
        name: 'Monday',
        summary: '3 events',
        colors: ['var(--mineral-primary)', 'var(--mineral-success)', 'var(--mineral-warning)'],
    },
    {name: 'Tuesday', summary: '1 event', colors: ['var(--mineral-info)']},
    {name: 'Wednesday', summary: '2 events', colors: ['var(--mineral-error)', 'var(--mineral-primary)']},
]

@Component({
    selector: 'app-dots-indicator',
    imports: [MDots, MInline, MStack, MText],
    template: `
        <m-stack spacing="sm">
            @for (day of days; track day.name) {
                <m-inline justify="between">
                    <span mText size="sm">{{ day.name }}, {{ day.summary }}</span>
                    <m-dots decorative size="sm" [colors]="day.colors" />
                </m-inline>
            }
            <m-inline justify="between">
                <span mText size="sm">Onboarding, step 2 of 4</span>
                <m-dots decorative color="success" [count]="4" [active]="1" />
            </m-inline>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsIndicatorExample {
    protected readonly days = DAYS
}
