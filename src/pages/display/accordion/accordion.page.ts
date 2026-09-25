import {ChangeDetectionStrategy, Component, computed, effect, signal} from '@angular/core'
import {MAccordion, MAccordionItem} from '@banzamel/mineralui-angular/display/accordion'
import {MCollapsible} from '@banzamel/mineralui-angular/display/collapsible'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import accordionFaq from '@generated/examples/display/accordion/accordion-faq'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-accordion-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MAccordion,
        MAccordionItem,
        MCollapsible,
        MText,
    ],
    template: `
        <doc-article
            title="Accordion & Collapsible"
            description="Disclosure components for expandable content. m-collapsible handles one section, m-accordion coordinates a group."
        >
            <doc-section
                title="MCollapsible playground"
                description="The standalone disclosure pattern with a single toggleable content block."
            >
                <doc-playground [controls]="collapsibleControls" [code]="collapsibleCode()">
                    <m-collapsible
                        class="doc-accordion-stage"
                        heading="What is MineralUI?"
                        [color]="collapsibleColor()"
                        [(open)]="collapsibleOpen"
                    >
                        <p mText tone="muted">
                            MineralUI is a UI framework with theme tokens, layout primitives and form controls that work
                            with Angular forms.
                        </p>
                    </m-collapsible>
                </doc-playground>
            </doc-section>

            <doc-section
                title="MAccordion playground"
                description="Toggle single versus multiple mode, the border and a disabled item."
            >
                <doc-playground [controls]="accordionControls" [code]="accordionCode()">
                    <m-accordion
                        class="doc-accordion-stage"
                        [color]="accordionColor()"
                        [multiple]="multiple()"
                        [bordered]="bordered()"
                        [(value)]="open"
                    >
                        <m-accordion-item value="setup" heading="Setup">
                            <p mText tone="muted">Install the package and add provideMineralUI() to your app config.</p>
                        </m-accordion-item>
                        <m-accordion-item value="theming" heading="Theming" [disabled]="disabledSecond()">
                            <p mText tone="muted">Customize color, spacing and typography tokens in your theme.</p>
                        </m-accordion-item>
                        <m-accordion-item value="deploy" heading="Deploy">
                            <p mText tone="muted">Build and ship a static site or an app shell anywhere.</p>
                        </m-accordion-item>
                    </m-accordion>
                </doc-playground>
            </doc-section>

            <doc-section
                title="FAQ with rich headings"
                description="Items can come from @for; [mAccordionHeading] adds markup after the heading text. Match headingLevel to the page outline — here the questions sit under an h2, so they are level 3."
            >
                <doc-preview [example]="examples.faq" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Both follow the WAI-ARIA APG Accordion pattern: a heading (role=heading with aria-level) wraps a native button with aria-expanded and aria-controls; the panel is a region labelled by the button. A closed panel is inert, so its links and fields leave the tab order."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="open / defaultOpen / onToggle is the [(open)] model, and the accordion's defaultOpen / onChange is [(value)] — always an array of item values (id → value). title is heading plus a heading slot. New: headingLevel and disabled on m-collapsible. React marks a closed panel aria-hidden but keeps its content focusable; here it is inert."
            />

            <doc-section title="API">
                <doc-props-table api="MCollapsible" />
                <doc-props-table api="MAccordion" />
                <doc-props-table api="MAccordionItem" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-accordion-stage {
            max-width: 560px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionPage {
    protected readonly examples = {faq: accordionFaq}

    protected readonly collapsibleColor = signal<MColor>('primary')
    protected readonly collapsibleOpen = signal(true)
    protected readonly collapsibleControls = [
        selectControl('color', this.collapsibleColor, COLORS),
        booleanControl('open', this.collapsibleOpen),
    ]

    protected readonly accordionColor = signal<MColor>('primary')
    protected readonly multiple = signal(false)
    protected readonly bordered = signal(false)
    protected readonly disabledSecond = signal(false)
    protected readonly open = signal<readonly string[]>(['setup'])
    protected readonly accordionControls = [
        selectControl('color', this.accordionColor, COLORS),
        booleanControl('multiple', this.multiple),
        booleanControl('bordered', this.bordered),
        booleanControl('disabledSecond', this.disabledSecond),
    ]

    constructor() {
        // Leaving multiple mode keeps only the first open item, like a fresh single accordion.
        effect(() => {
            if (!this.multiple()) this.open.update((open) => open.slice(0, 1))
        })
    }

    protected readonly collapsibleCode = computed(() => {
        const attrs = [
            'heading="What is MineralUI?"',
            this.collapsibleColor() !== 'primary' && `color="${this.collapsibleColor()}"`,
            '[(open)]="open"',
        ].filter((attr) => typeof attr === 'string')
        return [
            `<m-collapsible ${attrs.join(' ')}>`,
            '    <p mText tone="muted">MineralUI is a UI framework with theme tokens…</p>',
            '</m-collapsible>',
        ].join('\n')
    })

    protected readonly accordionCode = computed(() => {
        const attrs = [
            this.accordionColor() !== 'primary' && `color="${this.accordionColor()}"`,
            this.multiple() && 'multiple',
            this.bordered() && 'bordered',
            '[(value)]="open"',
        ].filter((attr) => typeof attr === 'string')
        return [
            `<m-accordion ${attrs.join(' ')}>`,
            '    <m-accordion-item value="setup" heading="Setup">Install the package…</m-accordion-item>',
            `    <m-accordion-item value="theming" heading="Theming"${this.disabledSecond() ? ' disabled' : ''}>Customize tokens…</m-accordion-item>`,
            '    <m-accordion-item value="deploy" heading="Deploy">Build and ship…</m-accordion-item>',
            '</m-accordion>',
        ].join('\n')
    })
}
