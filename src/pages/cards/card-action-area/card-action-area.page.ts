import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MCardActionArea} from '@banzamel/mineralui-angular/cards/card-action-area'
import {MIcon, mArrowRightIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import type {MClickEffectMode} from '@banzamel/mineralui-angular/utils'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import cardActionAreaFooter from '@generated/examples/cards/card-action-area/card-action-area-footer'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS = ['card', 'primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news'] as const
const EFFECTS: readonly MClickEffectMode[] = ['ripple', 'none']

@Component({
    selector: 'doc-card-action-area-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCard,
        MCardHeader,
        MCardBody,
        MCardActionArea,
        MIcon,
        MInline,
        MCode,
        MHeading,
        MText,
    ],
    template: `
        <doc-article
            title="MCardActionArea"
            description="Tinted, clickable region inside a card: a button for an action or a link for navigation, while the rest of the card keeps its own buttons."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-card class="doc-card-action-area-demo" [stretch]="false">
                        <m-card-header><h3 mHeading>Customer workspace</h3></m-card-header>
                        <m-card-body>
                            @if (asLink()) {
                                <a mCardActionArea href="#details" [color]="resolvedColor()" [clickEffect]="effect()">
                                    <m-inline justify="between">
                                        <h4 mHeading>Open profile</h4>
                                        <m-icon [icon]="arrowIcon" />
                                    </m-inline>
                                    <p mText tone="muted" size="sm">A link area may hold block content.</p>
                                </a>
                            } @else {
                                <button mCardActionArea [color]="resolvedColor()" [clickEffect]="effect()">
                                    <m-inline justify="between">
                                        <span mText weight="semibold">Open profile</span>
                                        <m-icon [icon]="arrowIcon" />
                                    </m-inline>
                                </button>
                            }
                        </m-card-body>
                    </m-card>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Area with separate footer actions"
                description="Only the body is the main hit area; the footer buttons stay independent. Icons inside the area that set no color of their own take its color."
            >
                <doc-preview [example]="examples.footer" />
            </doc-section>

            <doc-section title="When to use it">
                <p mText tone="muted" size="sm">
                    If the whole card is one link, put <code mCode>mCard</code> on the anchor instead (<code mCode
                        >&lt;a mCard routerLink&gt;</code
                    >). Use the action area when only part of the card is the main target, or when the target is an
                    action rather than navigation — a card itself is never a button.
                </p>
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description="component, to and href are replaced by the host element: button[mCardActionArea] for an action, a[mCardActionArea] with your href or routerLink for navigation. interactive is gone — the area is always a button or a link. The color reaches buttons and icons inside through the M_COLOR_SCOPE token instead of cloning children, so it also covers content of your own components. A button area accepts phrasing content only (no headings or buttons inside); the area has a focus ring."
            />

            <doc-section title="MCardActionArea API">
                <doc-props-table api="MCardActionArea" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-action-area-demo {
            max-width: 26rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActionAreaPage {
    protected readonly examples = {footer: cardActionAreaFooter}
    protected readonly arrowIcon = mArrowRightIcon

    protected readonly color = signal<(typeof COLORS)[number]>('card')
    protected readonly asLink = signal(false)
    protected readonly effect = signal<MClickEffectMode>('ripple')
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        booleanControl('asLink', this.asLink),
        selectControl('clickEffect', this.effect, EFFECTS),
    ]

    protected readonly resolvedColor = computed<MColor | undefined>(() => {
        const color = this.color()
        return color === 'card' ? undefined : color
    })

    protected readonly code = computed(() => {
        const color = this.resolvedColor()
        const attrs = [
            color && `color="${color}"`,
            this.effect() !== 'ripple' && `clickEffect="${this.effect()}"`,
        ].filter((attr): attr is string => typeof attr === 'string')
        const tail = attrs.length > 0 ? ` ${attrs.join(' ')}` : ''
        const area = this.asLink()
            ? `<a mCardActionArea href="#details"${tail}>
            <h4 mHeading>Open profile</h4>
            <p mText tone="muted" size="sm">A link area may hold block content.</p>
        </a>`
            : `<button mCardActionArea${tail} (click)="openProfile()">
            <span mText weight="semibold">Open profile</span>
            <m-icon [icon]="mArrowRightIcon" />
        </button>`
        return `<m-card [stretch]="false">
    <m-card-header><h3 mHeading>Customer workspace</h3></m-card-header>
    <m-card-body>
        ${area}
    </m-card-body>
</m-card>`
    })
}
