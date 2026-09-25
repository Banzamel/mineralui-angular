import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MStep, MStepper} from '@banzamel/mineralui-angular/display/stepper'
import type {MStepperVariant} from '@banzamel/mineralui-angular/display/stepper'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import stepperStates from '@generated/examples/display/stepper/stepper-states'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MStepperVariant[] = ['horizontal', 'vertical']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const STEPS = 4

@Component({
    selector: 'doc-stepper-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MInline,
        MStack,
        MStep,
        MStepper,
    ],
    template: `
        <doc-article
            title="MStepper"
            description="Multi-step progress indicator for wizards, onboarding flows and checkout processes."
        >
            <doc-section
                title="Playground"
                description="Move through the steps with the buttons; with clickable, the step headings select the step too."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack class="doc-stepper-stage">
                        <ol
                            mStepper
                            aria-label="Sign-up"
                            [(activeStep)]="active"
                            [variant]="variant()"
                            [size]="size()"
                            [color]="color()"
                            [clickable]="clickable()"
                        >
                            <li mStep heading="Account" description="Create your account"></li>
                            <li mStep heading="Profile" description="Fill in your details" optional></li>
                            <li mStep heading="Review" description="Confirm your data"></li>
                            <li mStep heading="Done" description="All set!"></li>
                        </ol>
                        <m-inline justify="center">
                            <button
                                mButton
                                size="sm"
                                variant="outlined"
                                [color]="color()"
                                [disabled]="active() === 0"
                                (click)="active.set(active() - 1)"
                            >
                                Back
                            </button>
                            <button
                                mButton
                                size="sm"
                                [color]="color()"
                                [disabled]="active() === steps"
                                (click)="next()"
                            >
                                {{ active() === steps - 1 ? 'Finish' : 'Next' }}
                            </button>
                        </m-inline>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="States and icons"
                description="error replaces the indicator with !, disabled dims a step (and disables its heading button), an icon in [mStart] replaces the number and the check mark."
            >
                <doc-preview [example]="examples.states" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The stepper is an ordered list and the current step is aria-current="step". Completed and failed steps are announced after the heading (mineralui.stepper.completed / .error), because the check mark and ! are decorative. With clickable, headings are native buttons — reachable with Tab and operated with Enter or Space; give the list an aria-label.'
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="MStepper goes on your own <ol> with li[mStep] items (React: divs with role=list). activeStep + onChange is the [(activeStep)] model. With clickable, the heading is the button (React makes the indicator a div with role=button). title is heading, the icon is the [mStart] slot, and the Optional label is translatable."
            />

            <doc-section title="API">
                <doc-props-table api="MStepper" />
                <doc-props-table api="MStep" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-stepper-stage {
            width: 100%;
            max-width: 720px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperPage {
    protected readonly examples = {states: stepperStates}
    protected readonly steps = STEPS

    protected readonly active = signal(1)
    protected readonly variant = signal<MStepperVariant>('horizontal')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly clickable = signal(false)
    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('clickable', this.clickable),
    ]

    protected next(): void {
        this.active.update((step) => Math.min(STEPS, step + 1))
    }

    protected readonly code = computed(() => {
        const attrs = [
            'aria-label="Sign-up"',
            '[(activeStep)]="step"',
            this.variant() !== 'horizontal' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.clickable() && 'clickable',
        ].filter((attr) => typeof attr === 'string')
        return [
            `<ol mStepper ${attrs.join(' ')}>`,
            '    <li mStep heading="Account" description="Create your account"></li>',
            '    <li mStep heading="Profile" description="Fill in your details" optional></li>',
            '    <li mStep heading="Review" description="Confirm your data"></li>',
            '    <li mStep heading="Done" description="All set!"></li>',
            '</ol>',
        ].join('\n')
    })
}
