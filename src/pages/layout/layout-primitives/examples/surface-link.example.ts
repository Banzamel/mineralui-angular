import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MSimpleGrid} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-surface-link',
    imports: [MSimpleGrid, MSurface, MText, RouterLink],
    template: `
        <m-simple-grid [columns]="3">
            <article mSurface>
                <p mText weight="semibold">Article</p>
                <p mText tone="muted" size="sm">A self-contained piece of content.</p>
            </article>
            <a mSurface tone="raised" routerLink="/docs/simple-grid">
                <p mText weight="semibold">Link card</p>
                <p mText tone="muted" size="sm">The whole tile is one link.</p>
            </a>
            <button mSurface type="button" tone="subtle">
                <span mText weight="semibold">Action</span>
            </button>
        </m-simple-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceLinkExample {}
