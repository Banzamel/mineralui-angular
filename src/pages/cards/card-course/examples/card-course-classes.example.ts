import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import type {MCardPerson} from '@banzamel/mineralui-angular/cards/card'
import {MCardCourse} from '@banzamel/mineralui-angular/cards/card-course'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const FACE = '?w=120&h=120&fit=crop&crop=face'

@Component({
    selector: 'app-card-course-classes',
    imports: [MCardCourse, MText],
    template: `
        <div class="app-card-grid">
            <m-card-course
                heading="Angular signals in practice"
                description="Six weeks of live sessions, code reviews and a final project."
                [price]="490"
                duration="6 weeks"
                [available]="8"
                [rating]="4.9"
                [reviewCount]="42"
                [leader]="teacher"
                [participants]="students"
                [maxParticipants]="20"
                image="https://picsum.photos/seed/course-angular/640/400"
                (action)="joined.set(true)"
            />
            <m-card-course
                heading="Accessible forms"
                description="Labels, errors and keyboard flows that work for everyone."
                price="Free"
                currency=""
                duration="2 h"
                [available]="false"
                color="info"
                image="https://picsum.photos/seed/course-forms/640/400"
            />
        </div>
        <p mText tone="muted" size="sm">{{ joined() ? 'Joined the course.' : 'The second course is full.' }}</p>
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
export class CardCourseClassesExample {
    protected readonly teacher: MCardPerson = {
        name: 'Jan Nowak',
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d${FACE}`,
    }
    protected readonly students: readonly MCardPerson[] = [
        {name: 'Anna Kowalska', avatar: `https://images.unsplash.com/photo-1494790108377-be9c29b29330${FACE}`},
        {name: 'Ewa Mazur', avatar: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80${FACE}`},
        {name: 'Piotr Wojcik'},
        {name: 'Marcin Kowal'},
        {name: 'Tomasz Kaczmarek'},
        {name: 'Magdalena Zielinska'},
    ]
    protected readonly joined = signal(false)
}
