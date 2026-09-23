import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core'

/**
 * Standard docs page: title, description and `<doc-section>` cards (counterpart of docs-react `DocsArticle`).
 *
 * TEMP: headings and cards replace with MHeading / MText (etap 2) and MCard (etap 6); MReveal (etap 6) is skipped.
 */
@Component({
    selector: 'doc-article',
    template: `
        <article class="doc-stack">
            <header class="doc-stack-sm">
                <h1 class="doc-h1">{{ title() }}</h1>
                @if (description()) {
                    <p class="doc-muted">{{ description() }}</p>
                }
            </header>
            <ng-content />
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
    template: `
        <section class="doc-card" [attr.aria-labelledby]="headingId()">
            @if (title()) {
                <header class="doc-card-header">
                    <h2 class="doc-h2" [id]="headingId()">{{ title() }}</h2>
                    @if (description()) {
                        <p class="doc-muted doc-small">{{ description() }}</p>
                    }
                </header>
            }
            <div class="doc-card-body">
                <ng-content />
            </div>
        </section>
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
