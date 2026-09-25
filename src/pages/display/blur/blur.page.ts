import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MBlur} from '@banzamel/mineralui-angular/display/blur'
import type {MBlurTrigger} from '@banzamel/mineralui-angular/display/blur'
import {MIcon, mMailIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import blurContacts from '@generated/examples/display/blur/blur-contacts'
import blurControlled from '@generated/examples/display/blur/blur-controlled'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TRIGGERS: readonly MBlurTrigger[] = ['hover', 'click', 'focus', 'none']

@Component({
    selector: 'doc-blur-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MBlur, MIcon, MInline, MStack, MText],
    template: `
        <doc-article
            title="MBlur"
            description="Obscure inline content behind a CSS blur filter. Useful for CV pages, shared screenshots and demos where contact details or private values should stay hidden until the viewer opts in."
        >
            <doc-section title="Playground" description="Try each reveal mode and adjust blur strength.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack align="center">
                        <p mText tone="muted" size="sm">
                            Hover, click or focus the blurred value depending on the reveal mode.
                        </p>
                        <m-inline spacing="sm">
                            <m-icon [icon]="mailIcon" [size]="14" color="primary" />
                            <m-blur [reveal]="reveal()" [amount]="amount()" [(revealed)]="revealed">
                                hidden&#64;example.com
                            </m-blur>
                        </m-inline>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Use cases"
                description="Sharing a CV or portfolio screenshot without leaking contact details. Blur the value, not the label, so screen readers still announce what the field is."
            >
                <doc-preview [example]="examples.contacts" />
            </doc-section>

            <doc-section
                title="Controlled reveal"
                description="Bind [(revealed)] to manage the state yourself, e.g. when the reveal depends on authentication. With reveal=click the host is a toggle button (aria-pressed) that Enter and Space operate."
            >
                <doc-preview [example]="examples.controlled" />
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description="revealed / defaultRevealed / onToggle are one model: [(revealed)]. The inline / block modifiers are the host classes m-blur and m-blur.m-block."
            />

            <doc-section title="MBlur API">
                <doc-props-table api="MBlur" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurPage {
    protected readonly examples = {contacts: blurContacts, controlled: blurControlled}
    protected readonly mailIcon = mMailIcon

    protected readonly reveal = signal<MBlurTrigger>('hover')
    protected readonly amount = signal(6)
    protected readonly revealed = signal(false)
    protected readonly controls = [
        selectControl('reveal', this.reveal, TRIGGERS),
        sliderControl('amount', this.amount, {min: 1, max: 16}),
        booleanControl('revealed', this.revealed),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.reveal() !== 'hover' && `reveal="${this.reveal()}"`,
            this.amount() !== 6 && `[amount]="${this.amount()}"`,
            this.revealed() && '[(revealed)]="revealed"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-blur${attrs.map((attr) => ` ${attr}`).join('')}>hidden@example.com</m-blur>`
    })
}
