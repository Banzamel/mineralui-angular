import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MDots} from '@banzamel/mineralui-angular/display/dots'

interface Scene {
    readonly name: string
    readonly background: string
}

const SCENES: readonly [Scene, ...Scene[]] = [
    {name: 'Dawn', background: 'linear-gradient(135deg, #f97316, #db2777)'},
    {name: 'Noon', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)'},
    {name: 'Dusk', background: 'linear-gradient(135deg, #7c3aed, #1e1b4b)'},
]

@Component({
    selector: 'app-dots-overlay',
    imports: [MDots],
    template: `
        <div class="app-dots-photo" role="img" [attr.aria-label]="scene().name" [style.background]="scene().background">
            <m-dots
                class="app-dots-photo-dots"
                overlay
                ariaLabel="Choose photo"
                [count]="scenes.length"
                [itemLabel]="photoLabel"
                [(active)]="index"
            />
        </div>
    `,
    styles: `
        .app-dots-photo {
            position: relative;
            width: min(360px, 100%);
            aspect-ratio: 16 / 9;
            margin-inline: auto;
            border-radius: var(--mineral-radius-lg);
            transition: background 0.2s;
        }

        .app-dots-photo-dots {
            position: absolute;
            inset-inline: 0;
            bottom: 10px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsOverlayExample {
    protected readonly scenes = SCENES
    protected readonly index = signal<number | null>(0)
    protected readonly scene = computed(() => SCENES[this.index() ?? 0] ?? SCENES[0])
    protected readonly photoLabel = (position: number) => `Photo ${position}`
}
