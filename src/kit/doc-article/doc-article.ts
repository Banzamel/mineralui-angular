import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

/**
 * Standard docs page: title, description and `<doc-section>` cards (counterpart of docs-react `DocsArticle`).
 *
 * Sections are MCard (etap 5, krok 3); MReveal (etap 6) is skipped.
 */
@Component({
    selector: 'doc-article',
    imports: [MStack, MText, MHeading],
    template: `
        <article>
            <m-stack>
                <header class="doc-stack-sm">
                    <h1 mHeading class="doc-title">{{ title() }}</h1>
                    @if (description()) {
                        <p mText tone="muted">{{ description() }}</p>
                    }
                </header>
                <ng-content />
            </m-stack>
        </article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocArticle {
    readonly title = input.required<string>()
    readonly description = input<string>()
}

/** One card of a docs page; the heading doubles as an anchor (`id`). */
@Component({
    selector: 'doc-section',
    imports: [MText, MHeading, MCard, MCardHeader, MCardBody],
    template: `
        <m-card [attr.role]="headingId() ? 'region' : null" [attr.aria-labelledby]="headingId()">
            @if (title()) {
                <m-card-header class="doc-section-header">
                    <h2 mHeading class="doc-section-title" [id]="headingId()">{{ title() }}</h2>
                    @if (description()) {
                        <p mText tone="muted" size="sm">{{ description() }}</p>
                    }
                </m-card-header>
            }
            <m-card-body>
                <ng-content />
            </m-card-body>
        </m-card>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocSection {
    readonly title = input<string>()
    readonly description = input<string>()

    protected readonly headingId = computed(() => {
        const title = this.title()
        if (!title) return null
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    })
}
