import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MCardTile} from '@banzamel/mineralui-angular/cards/card-tile'
import {mChartIcon, mFolderIcon, MIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-card-tile-links',
    imports: [MCardTile, MIcon, RouterLink],
    template: `
        <div class="app-card-tile-grid">
            <m-card-tile
                heading="Card docs"
                description="Routed with routerLink through the slot."
                color="info"
                image="https://picsum.photos/seed/tile-docs/680/425"
                mediaFill
            >
                <a mCardTileLink routerLink="/docs/card">Open the card docs</a>
            </m-card-tile>
            <m-card-tile heading="Reports" description="A button instead of a link." color="success">
                <m-icon mStart [icon]="chartIcon" />
                <button mCardTileLink type="button" (click)="opened.set(opened() + 1)">Open reports</button>
            </m-card-tile>
            <m-card-tile heading="Archive" description="Static tile — no link, no lift." color="neutral">
                <m-icon mStart [icon]="folderIcon" />
            </m-card-tile>
        </div>
        <p class="app-card-tile-note">Reports opened {{ opened() }} times.</p>
    `,
    styles: `
        .app-card-tile-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--mineral-spacing-md);
        }

        .app-card-tile-note {
            margin: var(--mineral-spacing-sm) 0 0;
            color: var(--mineral-text-secondary);
            font-size: var(--mineral-font-size-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTileLinksExample {
    protected readonly chartIcon = mChartIcon
    protected readonly folderIcon = mFolderIcon
    protected readonly opened = signal(0)
}
