import {ChangeDetectionStrategy, Component, input} from '@angular/core'
import {CodeBlock} from '../code-block/code-block'
import type {PlaygroundControl} from './playground-controls'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MSlider} from '@banzamel/mineralui-angular/controls/slider'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

let nextId = 0

/**
 * Interactive props playground (counterpart of docs-react `DocsPlayground`): projected live preview, controls bound
 * to the page's signals and the generated template.
 */
@Component({
    selector: 'doc-playground',
    imports: [CodeBlock, MButton, MCode, MGrid, MGridItem, MSlider, MToggle],
    templateUrl: './doc-playground.html',
    styleUrl: './doc-playground.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPlayground {
    readonly controls = input.required<readonly PlaygroundControl[]>()
    /** Template matching the current control values. */
    readonly code = input.required<string>()

    protected readonly id = `doc-playground-${nextId++}`
}
