import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MIllustrationColor, MIllustrationDef} from '@banzamel/mineralui-angular/illustrations'
import * as scenes from '@banzamel/mineralui-angular/illustrations'
import {MIllustration} from '@banzamel/mineralui-angular/illustrations'
import illustrationCard from '@generated/examples/display/illustrations/illustration-card'
import illustrationColors from '@generated/examples/display/illustrations/illustration-colors'
import illustrationCustom from '@generated/examples/display/illustrations/illustration-custom'
import illustrationSizes from '@generated/examples/display/illustrations/illustration-sizes'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import type {GalleryScene} from './illustration-gallery'
import {IllustrationGallery} from './illustration-gallery'
import {SCENES} from './illustrations.catalog'

const isSceneDef = (value: unknown): value is MIllustrationDef =>
    typeof value === 'object' && value !== null && 'name' in value && 'svg' in value

/** Export name → scene, from the illustrations entry point. */
export const SCENE_DEFS: ReadonlyMap<string, MIllustrationDef> = new Map(
    Object.entries(scenes).flatMap(([name, value]) => (isSceneDef(value) ? [[name, value]] : []))
)

const COLORS: readonly MIllustrationColor[] = [
    'primary',
    'neutral',
    'success',
    'error',
    'warning',
    'info',
    'light',
    'dark',
    'news',
]
const PLAYGROUND_SCENES = [
    'mDashboardIllustration',
    'mEmptyStateIllustration',
    'mSuccessIllustration',
    'mNotFoundIllustration',
    'mSecurityIllustration',
    'mTeamIllustration',
] as const

@Component({
    selector: 'doc-illustrations-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, IllustrationGallery, MIllustration],
    templateUrl: './illustrations.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustrationsPage {
    protected readonly scenes: readonly GalleryScene[] = SCENES.flatMap((scene) => {
        const illustration = SCENE_DEFS.get(scene.name)
        return illustration ? [{...scene, illustration}] : []
    })
    protected readonly examples = {illustrationSizes, illustrationCard, illustrationCustom, illustrationColors}

    protected readonly sceneName = signal<(typeof PLAYGROUND_SCENES)[number]>('mDashboardIllustration')
    protected readonly color = signal<MIllustrationColor>('primary')
    protected readonly size = signal(200)
    protected readonly animate = signal(true)
    protected readonly controls = [
        selectControl('illustration', this.sceneName, PLAYGROUND_SCENES),
        selectControl('color', this.color, COLORS),
        sliderControl('size', this.size, {min: 80, max: 400, step: 10}),
        booleanControl('animate', this.animate),
    ]
    protected readonly selected = computed(() => SCENE_DEFS.get(this.sceneName()))
    protected readonly code = computed(
        () =>
            `<m-illustration [illustration]="${this.sceneName()}" color="${this.color()}" [size]="${this.size()}"` +
            `${this.animate() ? '' : ' [animate]="false"'} />`
    )
}
