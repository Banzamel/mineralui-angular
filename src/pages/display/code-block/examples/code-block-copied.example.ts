import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MCodeBlock} from '@banzamel/mineralui-angular/display/code-block'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'

@Component({
    selector: 'app-code-block-copied',
    imports: [MCodeBlock],
    template: `
        <!-- (copied) fires after the clipboard write succeeds — e.g. to show a toast. -->
        <m-code-block
            [code]="install"
            language="bash"
            heading="Install"
            lineNumbers
            (copied)="toast.show({title: 'Commands copied', color: 'success'})"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockCopiedExample {
    protected readonly toast = inject(MToastService)
    protected readonly install = `npm install @banzamel/mineralui-angular
npx ng build
npx ng test --watch=false`
}
