import {ChangeDetectionStrategy, Component, input} from '@angular/core'
import {CodeBlock} from '../code-block/code-block'
import type {PlaygroundControl} from './playground-controls'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

let nextId = 0

/**
 * Interactive props playground (counterpart of docs-react `DocsPlayground`): projected live preview, controls bound
 * to the page's signals and the generated template.
 *
 * TEMP: controls replace with MButton / MSlider / MToggle (etap 3), layout with MGrid (etap 2).
 */
@Component({
    selector: 'doc-playground',
    imports: [CodeBlock, MCode],
    templateUrl: './doc-playground.html',
    styleUrl: './doc-playground.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPlayground {
    readonly controls = input.required<readonly PlaygroundControl[]>()
    /** Template matching the current control values. */
    readonly code = input.required<string>()

    protected readonly id = `doc-playground-${nextId++}`

    protected onSlider(control: PlaygroundControl, event: Event): void {
        if (control.kind === 'slider' && event.target instanceof HTMLInputElement) {
            control.set(Number(event.target.value))
        }
    }

    protected onToggle(control: PlaygroundControl, event: Event): void {
        if (control.kind === 'boolean' && event.target instanceof HTMLInputElement) {
            control.set(event.target.checked)
        }
    }
}
