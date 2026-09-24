import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MProgressRing} from '@banzamel/mineralui-angular/feedback/progress-ring'

const FILES = 5

@Component({
    selector: 'app-progress-ring-upload',
    imports: [MButton, MProgressRing],
    template: `
        <div class="row">
            <!-- A custom label replaces the percentage; ariaLabel says the same to screen readers. -->
            <m-progress-ring
                size="lg"
                [color]="done() ? 'success' : 'primary'"
                [value]="(uploaded() / files) * 100"
                [label]="uploaded() + ' / ' + files"
                [ariaLabel]="'Uploaded ' + uploaded() + ' of ' + files + ' files'"
            />
            <m-progress-ring size="lg" color="info" [value]="(uploaded() / files) * 100" />
            <button mButton size="sm" [disabled]="running()" (click)="start()">
                {{ done() ? 'Upload again' : 'Upload 5 files' }}
            </button>
        </div>
    `,
    styles: `
        .row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 24px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressRingUploadExample {
    protected readonly files = FILES
    protected readonly uploaded = signal(0)
    protected readonly running = signal(false)
    protected readonly done = computed(() => this.uploaded() === FILES)
    private timer: ReturnType<typeof setInterval> | undefined

    constructor() {
        inject(DestroyRef).onDestroy(() => clearInterval(this.timer))
    }

    protected start(): void {
        this.uploaded.set(0)
        this.running.set(true)
        this.timer = setInterval(() => {
            this.uploaded.update((count) => count + 1)
            if (this.uploaded() === FILES) {
                clearInterval(this.timer)
                this.running.set(false)
            }
        }, 600)
    }
}
