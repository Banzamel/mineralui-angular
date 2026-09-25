import {ChangeDetectionStrategy, Component, computed, inject, Injectable, input} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MReveal} from '@banzamel/mineralui-angular/display/reveal'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

/** Hands each `<doc-section>` of an article its position, for the staggered reveal. */
@Injectable()
class DocSectionOrder {
    private next = 0

    take(): number {
        return this.next++
    }
}

/**
 * Standard docs page: title, description and `<doc-section>` cards (counterpart of docs-react `DocsArticle`).
 *
 * The header and every section slide in with `[mReveal]`, sections staggered by their order (like docs-react).
 */
@Component({
    selector: 'doc-article',
    imports: [MStack, MText, MHeading, MReveal],
    providers: [DocSectionOrder],
    template: `
        <article>
            <m-stack>
                <header class="doc-stack-sm" mReveal>
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
    imports: [MText, MHeading, MCard, MCardHeader, MCardBody, MReveal],
    template: `
        <m-card
            mReveal
            [revealDelay]="revealDelay"
            [attr.role]="headingId() ? 'region' : null"
            [attr.aria-labelledby]="headingId()"
        >
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

    // docs-react: min(index × 0.04 s, 0.2 s).
    protected readonly revealDelay = Math.min((inject(DocSectionOrder, {optional: true})?.take() ?? 0) * 0.04, 0.2)

    protected readonly headingId = computed(() => {
        const title = this.title()
        if (!title) return null
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    })
}
