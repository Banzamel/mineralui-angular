import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MAccordion, MAccordionItem} from '@banzamel/mineralui-angular/display/accordion'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Question {
    readonly id: string
    readonly question: string
    readonly answer: string
    readonly isNew?: boolean
}

@Component({
    selector: 'app-accordion-faq',
    imports: [MAccordion, MAccordionItem, MBadge, MHeading, MText],
    template: `
        <h2 mHeading class="app-accordion-faq-title">Frequently asked questions</h2>
        <m-accordion bordered multiple [(value)]="open">
            @for (item of questions; track item.id) {
                <m-accordion-item [value]="item.id" [heading]="item.question">
                    @if (item.isNew) {
                        <m-badge mAccordionHeading size="sm" color="success">New</m-badge>
                    }
                    <p mText tone="muted">{{ item.answer }}</p>
                </m-accordion-item>
            }
        </m-accordion>
    `,
    styles: `
        .app-accordion-faq-title {
            margin-bottom: var(--mineral-spacing-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionFaqExample {
    protected readonly open = signal<readonly string[]>([])
    protected readonly questions: readonly Question[] = [
        {id: 'license', question: 'Can I use it in commercial projects?', answer: 'Yes, both editions allow it.'},
        {
            id: 'ssr',
            question: 'Does it work with server-side rendering?',
            answer: 'Every component is SSR-safe and works zoneless.',
            isNew: true,
        },
        {
            id: 'forms',
            question: 'Do the inputs support reactive forms?',
            answer: 'Yes, they are ControlValueAccessors.',
        },
    ]
}
