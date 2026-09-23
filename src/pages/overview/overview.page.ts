import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MIcon} from '@banzamel/mineralui-angular/icons'
import {MIllustration, mShowcaseIllustration} from '@banzamel/mineralui-angular/illustrations'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DOCS_NAVIGATION, sectionIcon} from '@locales/docs-navigation'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'doc-overview-page',
    imports: [MText, RouterLink, MIcon, MIllustration, DocArticle, DocSection],
    template: `
        <doc-article
            title="MineralUI for Angular"
            description="Components, theming, i18n, icons and illustrations for dashboards, admin panels and documentation shells — the MineralUI design system with an idiomatic Angular API."
        >
            <doc-section>
                <div class="doc-overview-hero">
                    <m-illustration [illustration]="showcase" size="sm" color="primary" />
                    <p mText>
                        Standalone components, signals everywhere, zoneless-ready and SSR-safe. The same design tokens
                        as MineralUI for React, so both share one visual language and the same theme files.
                    </p>
                </div>
            </doc-section>

            @for (section of sections; track section.category) {
                <doc-section [title]="section.category">
                    <ul class="doc-overview-grid">
                        @for (item of section.items; track item.id) {
                            <li>
                                <a class="doc-overview-card" [routerLink]="['/docs', item.id]">
                                    @if (sectionIcon(section); as icon) {
                                        <m-icon [icon]="icon" color="primary" />
                                    }
                                    <span mText weight="semibold">{{ item.title }}</span>
                                    <span mText tone="muted" size="sm">{{ item.description }}</span>
                                </a>
                            </li>
                        }
                    </ul>
                </doc-section>
            }
        </doc-article>
    `,
    styles: `
        .doc-overview-hero {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: var(--mineral-spacing-lg);
        }
        .doc-overview-hero p {
            flex: 1 1 18rem;
        }
        .doc-overview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
            gap: var(--mineral-spacing-sm);
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .doc-overview-card {
            display: grid;
            gap: var(--mineral-spacing-xs);
            height: 100%;
            box-sizing: border-box;
            padding: var(--mineral-spacing-md);
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            color: inherit;
            text-decoration: none;
        }
        .doc-overview-card:hover {
            border-color: var(--mineral-primary);
        }
        .doc-overview-card:focus-visible {
            outline: 2px solid var(--mineral-border-focus);
            outline-offset: 2px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewPage {
    protected readonly sections = DOCS_NAVIGATION
    protected readonly sectionIcon = sectionIcon
    protected readonly showcase = mShowcaseIllustration
}
