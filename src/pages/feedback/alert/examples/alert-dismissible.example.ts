import {ChangeDetectionStrategy, Component, ElementRef, viewChild} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MAlert} from '@banzamel/mineralui-angular/feedback/alert'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-alert-dismissible',
    imports: [MAlert, MButton, MStack],
    template: `
        <m-stack>
            <m-alert #tip color="info" heading="Tip" dismissible (dismissed)="focusRestore()">
                Drag the cards to change the order of the matches.
            </m-alert>
            <!-- The alert hides itself; focus goes to a sensible place (here: the button that brings it back). -->
            <div>
                <button #restore mButton variant="outlined" size="sm" (click)="tip.show()">Show the tip again</button>
            </div>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDismissibleExample {
    private readonly restore = viewChild.required('restore', {read: ElementRef<HTMLButtonElement>})

    protected focusRestore(): void {
        this.restore().nativeElement.focus()
    }
}
