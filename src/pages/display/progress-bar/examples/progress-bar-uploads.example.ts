import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MProgressBar} from '@banzamel/mineralui-angular/display/progress-bar'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-progress-bar-uploads',
    imports: [MButton, MProgressBar, MStack],
    template: `
        <m-stack class="app-progress-bar-uploads">
            <m-progress-bar [value]="photos()" label="photos.zip" showValue />
            <m-progress-bar [value]="videos()" label="videos.zip" color="info" showValue striped animated />
            <m-progress-bar [value]="3" [max]="5" size="sm" color="success" ariaLabel="Step 3 of 5" />
            <m-stack align="start">
                <button mButton variant="outlined" size="sm" (click)="advance()">Upload more</button>
            </m-stack>
        </m-stack>
    `,
    styles: `
        .app-progress-bar-uploads {
            max-width: 480px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarUploadsExample {
    protected readonly photos = signal(40)
    protected readonly videos = signal(15)

    protected advance(): void {
        this.photos.update((value) => (value >= 100 ? 0 : Math.min(100, value + 20)))
        this.videos.update((value) => (value >= 100 ? 0 : Math.min(100, value + 35)))
    }
}
