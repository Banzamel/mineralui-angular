import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {injectMaxWidth, MBreakpoints} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-export-actions',
    imports: [MButton],
    template: `
        <!-- hidden="md" → hiddenUpTo: a static hidden attribute would always reach the DOM. -->
        <button mButton hiddenUpTo="md">Export report</button>
        <button mButton [fullWidth]="compact()">Save</button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportActions {
    protected readonly compact = injectMaxWidth(MBreakpoints.md)
}
