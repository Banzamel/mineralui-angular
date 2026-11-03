import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MDots} from '@banzamel/mineralui-angular/display/dots'
import type {MDotsSize} from '@banzamel/mineralui-angular/display/dots'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import dotsIndicator from '@generated/examples/display/dots/dots-indicator'
import dotsOverlay from '@generated/examples/display/dots/dots-overlay'
import dotsSlides from '@generated/examples/display/dots/dots-slides'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'news']
const SIZES: readonly MDotsSize[] = ['md', 'sm']

@Component({
    selector: 'doc-dots-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MDots],
    template: `
        <doc-article
            title="MDots"
            description="A row of dots: pick the shown slide or photo, or show a small static indicator such as the event colors of a day."
        >
            <doc-section
                title="Playground"
                description="Click a dot to make it current. The default look widens the current dot into a pill; overlay brightens it instead."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <div class="doc-dots-demo" [class.doc-dots-demo-dark]="overlay()">
                        <m-dots
                            [count]="count()"
                            [(active)]="active"
                            [size]="size()"
                            [color]="color()"
                            [overlay]="overlay()"
                            [decorative]="decorative()"
                        />
                    </div>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Slide picker"
                description="Next to previous / next buttons, the dots jump straight to a slide. itemLabel names each dot, controls points them at the switched region."
            >
                <doc-preview [example]="examples.slides" />
            </doc-section>

            <doc-section
                title="On a photo"
                description="overlay gives white dots for images and other dark backgrounds — the look of the service-card gallery."
            >
                <doc-preview [example]="examples.overlay" />
            </doc-section>

            <doc-section
                title="Static indicator"
                description="decorative renders plain spans hidden from screen readers — put the same information in text next to them. colors paints each dot (the compact MScheduler month uses one dot per event)."
            >
                <doc-preview [example]="examples.indicator" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The dots are a group (role group) named by ariaLabel (default mineralui.dots.label, 'Choose item'). Every dot is a native button, so Tab reaches it and Enter / Space activate it; its name comes from itemLabel (default mineralui.dots.item, 'Item 2') and the current one has aria-current. The dots do not handle arrow keys themselves — inside MCarousel ← / → change the slide from anywhere in the carousel. Dots are 8 px (6 px with size sm): pair them with larger previous / next controls, as MCarousel does, for touch targets of 24 px or more (WCAG 2.5.8)."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="New in the Angular version — React draws the dots of MCarousel, the service-card gallery and the MScheduler month separately. MCarousel, the service cards (MCardOffer, MCardProduct, MCardEvent, MCardCourse) and MScheduler render MDots."
            />

            <doc-section title="MDots API">
                <doc-props-table api="MDots" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-dots-demo {
            display: flex;
            justify-content: center;
            padding: 24px;
            border-radius: var(--mineral-radius-md);
        }

        .doc-dots-demo-dark {
            background: linear-gradient(135deg, #1e293b, #334155);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsPage {
    protected readonly examples = {slides: dotsSlides, overlay: dotsOverlay, indicator: dotsIndicator}

    protected readonly count = signal(5)
    protected readonly active = signal<number | null>(0)
    protected readonly size = signal<MDotsSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly overlay = signal(false)
    protected readonly decorative = signal(false)
    protected readonly controls = [
        sliderControl('count', this.count, {min: 2, max: 10}),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('overlay', this.overlay),
        booleanControl('decorative', this.decorative),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.decorative() && 'decorative',
            this.overlay() && 'overlay',
            `[count]="${this.count()}"`,
            this.decorative() ? '[active]="active()"' : '[(active)]="active"',
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
        ].filter((attr) => typeof attr === 'string')
        return `<m-dots ${attrs.join(' ')} />`
    })
}
