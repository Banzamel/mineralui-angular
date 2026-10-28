import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MInputFile} from '@banzamel/mineralui-angular/inputs/input-file'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-input-file-accept',
    imports: [MInputFile, MStack],
    template: `
        <m-stack>
            <!-- The line under the drop zone reads "PNG, JPG, WEBP". -->
            <m-input-file label="Organisation logo" accept="image/png,image/jpeg,image/webp" fullWidth />
            <!-- image/* becomes "Images"; acceptText replaces the whole line. -->
            <m-input-file
                label="Attachments"
                accept=".pdf,image/*"
                acceptText="PDF or an image, up to 5 MB"
                multiple
                [maxSize]="5_000_000"
                fullWidth
            />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileAcceptExample {}
