import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MAlert} from '@banzamel/mineralui-angular/feedback/alert'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import alertColors from '@generated/examples/feedback/alert/alert-colors'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['info', 'success', 'warning', 'error', 'primary', 'neutral', 'light', 'dark', 'news']

@Component({
    selector: 'doc-alert-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MAlert],
    template: `
        <doc-article
            title="MAlert"
            description="Inline messaging component for status, validation, and contextual feedback."
        >
            <doc-section title="Playground" description="Toggle inputs to preview alert combinations.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-alert [color]="color()" [icon]="icon()" [heading]="heading() ? 'Operation complete' : undefined">
                        Your changes have been saved successfully.
                    </m-alert>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Colors"
                description='The icon follows the color. Pass your own icon constant to [icon], or [icon]="false" for none.'
            >
                <doc-preview [example]="examples.alertColors" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The alert is a polite live status, so text that appears later is read out. For an urgent error that must interrupt, put role="alert" on the host. MineralUI for React calls the heading title — in Angular that name would clash with the global HTML attribute.'
            />

            <doc-section title="API">
                <doc-props-table api="MAlert" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPage {
    protected readonly examples = {alertColors}

    protected readonly color = signal<MColor>('info')
    protected readonly icon = signal(true)
    protected readonly heading = signal(true)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        booleanControl('icon', this.icon),
        booleanControl('heading', this.heading),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.color() !== 'info' ? ` color="${this.color()}"` : '',
            this.icon() ? '' : ' [icon]="false"',
            this.heading() ? ' heading="Operation complete"' : '',
        ].join('')
        return `<m-alert${attrs}>\n    Your changes have been saved successfully.\n</m-alert>`
    })
}
