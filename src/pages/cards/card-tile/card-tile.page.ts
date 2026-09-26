import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardTile} from '@banzamel/mineralui-angular/cards/card-tile'
import type {MCardMenuItem, MCardTileOverlayPosition} from '@banzamel/mineralui-angular/cards/card-tile'
import {mEditIcon, MIcon, mPaletteIcon, mShareIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {mOfficeIllustration, MIllustration} from '@banzamel/mineralui-angular/illustrations'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import cardTileLinks from '@generated/examples/cards/card-tile/card-tile-links'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const MEDIA = ['image', 'illustration', 'none'] as const
const POSITIONS: readonly MCardTileOverlayPosition[] = ['bottom', 'top', 'center']
const MENU: readonly MCardMenuItem[] = [
    {label: 'Edit', value: 'edit', icon: mEditIcon},
    {label: 'Share', value: 'share', icon: mShareIcon},
    {label: 'Delete', value: 'delete', icon: mTrashIcon, danger: true},
]

@Component({
    selector: 'doc-card-tile-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCardTile, MIcon, MIllustration],
    template: `
        <doc-article
            title="MCardTile"
            description="Tile that acts as one link, with image, video, camera or illustration media that can fill the tile under the text, and favorite / menu buttons in the corner."
        >
            <doc-section
                title="Playground"
                description="The whole tile is a link (href); the heart and the menu stay clickable above it."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-card-tile
                        class="doc-card-tile"
                        heading="Design system"
                        description="Tokens, components and usage guidelines for every product team."
                        href="#design-system"
                        [color]="color()"
                        [image]="media() === 'image' ? cover : undefined"
                        [mediaFill]="mediaFill()"
                        [overlayPosition]="overlayPosition()"
                        [favorite]="showFavorite() ? favorite() : undefined"
                        (favoriteChange)="favorite.set($event ?? false)"
                        [menuItems]="showMenu() ? menu : []"
                        (menuSelect)="chosen.set($event.label)"
                    >
                        <m-icon mStart [icon]="paletteIcon" />
                        @if (media() === 'illustration') {
                            <m-illustration mCardTileMedia [illustration]="illustration" size="lg" />
                        }
                    </m-card-tile>
                    <p class="doc-card-tile-note">
                        {{ chosen() ? 'menuSelect: ' + chosen() : 'Open the menu in the corner.' }}
                    </p>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Router links and buttons"
                description="For routerLink, put your own <a mCardTileLink> (or a <button mCardTileLink>) inside: it is stretched over the tile and its text is its accessible name."
            >
                <doc-preview [example]="examples.links" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The tile is not a link itself: one stretched link (the stretched link pattern) covers it, named by the heading (href) or by its own text (slot), so the corner buttons are separate controls instead of buttons nested in a link. A keyboard-focused link draws the focus ring around the whole tile. The favorite toggle has aria-pressed; the menu is a WAI-ARIA menu button (MDropdownMenu). Media is decorative."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="React renders the tile link with the buttons inside; here the link is stretched (ADR 0016) — href for plain links, the [mCardTileLink] slot for routerLink or a button (onClick). title is renamed heading (ADR 0004); icon and illustration are slots ([mStart], [mCardTileMedia]). favorite + onFavorite become [(favorite)] (the toggle shows when bound); menuItems are plain data with (menuSelect) (ADR 0008)."
            />

            <doc-section title="MCardTile API">
                <doc-props-table api="MCardTile" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-tile {
            max-width: 340px;
        }

        .doc-card-tile-note {
            margin: var(--mineral-spacing-sm) 0 0;
            color: var(--mineral-text-secondary);
            font-size: var(--mineral-font-size-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTilePage {
    protected readonly examples = {links: cardTileLinks}
    protected readonly cover = 'https://picsum.photos/seed/tile-cover/680/425'
    protected readonly menu = MENU
    protected readonly paletteIcon = mPaletteIcon
    protected readonly illustration = mOfficeIllustration

    protected readonly color = signal<MColor>('primary')
    protected readonly media = signal<(typeof MEDIA)[number]>('image')
    protected readonly mediaFill = signal(false)
    protected readonly overlayPosition = signal<MCardTileOverlayPosition>('bottom')
    protected readonly showFavorite = signal(true)
    protected readonly showMenu = signal(true)
    protected readonly favorite = signal(false)
    protected readonly chosen = signal('')
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        selectControl('media', this.media, MEDIA),
        booleanControl('mediaFill', this.mediaFill),
        selectControl('overlayPosition', this.overlayPosition, POSITIONS),
        booleanControl('favorite', this.showFavorite),
        booleanControl('menuItems', this.showMenu),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'heading="Design system"',
            'description="Tokens, components and usage guidelines."',
            'href="/design-system"',
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.media() === 'image' && '[image]="cover"',
            this.mediaFill() && 'mediaFill',
            this.mediaFill() && this.overlayPosition() !== 'bottom' && `overlayPosition="${this.overlayPosition()}"`,
            this.showFavorite() && '[(favorite)]="starred"',
            this.showMenu() && '[menuItems]="menu"',
            this.showMenu() && '(menuSelect)="run($event)"',
        ].filter((attr) => typeof attr === 'string')
        const slots = [
            '    <m-icon mStart [icon]="paletteIcon" />',
            this.media() === 'illustration' &&
                '    <m-illustration mCardTileMedia [illustration]="officeIllustration" size="lg" />',
        ].filter((slot) => typeof slot === 'string')
        return `<m-card-tile\n    ${attrs.join('\n    ')}\n>\n${slots.join('\n')}\n</m-card-tile>`
    })
}
