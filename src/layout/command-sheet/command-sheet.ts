import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {Router} from '@angular/router'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {
    commandPaletteFromNavGroups,
    MCommandPalette,
    MCommandPaletteFooter,
} from '@banzamel/mineralui-angular/overlays/command-palette'
import {MKbd} from '@banzamel/mineralui-angular/typography/kbd'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DOCS_NAVIGATION, sectionIcon} from '@locales/docs-navigation'

// Counterpart of docs-react `CommandSheet`: the docs navigation as a command palette (Ctrl+K).
@Component({
    selector: 'doc-command-sheet',
    imports: [MCommandPalette, MCommandPaletteFooter, MInline, MKbd, MText, MTranslatePipe],
    template: `
        <m-command-palette
            [items]="items"
            [heading]="'ui.commandPaletteTitle' | mT"
            [description]="'ui.commandPaletteDescription' | mT"
            [placeholder]="'ui.commandPalettePlaceholder' | mT"
            [emptyLabel]="'ui.commandPaletteEmpty' | mT"
        >
            <m-inline mCommandPaletteFooter class="doc-command-hint" align="center" justify="between">
                <span mText size="sm" tone="muted">{{ 'ui.commandPaletteHint' | mT }}</span>
                <span><kbd mKbd>Ctrl</kbd> <kbd mKbd>K</kbd></span>
            </m-inline>
        </m-command-palette>
    `,
    styles: `
        .doc-command-hint {
            flex: 1;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsCommandSheet {
    private readonly router = inject(Router)

    protected readonly items = commandPaletteFromNavGroups(
        DOCS_NAVIGATION.map((section) => ({
            key: section.category,
            label: section.category,
            icon: sectionIcon(section),
            items: section.items.map((item) => ({
                key: item.id,
                label: item.title,
                description: item.description,
                to: `/docs/${item.id}`,
                icon: sectionIcon(section),
            })),
        })),
        {onSelect: (target) => void this.router.navigateByUrl(target)}
    )
}
