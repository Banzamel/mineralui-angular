import {ChangeDetectionStrategy, Component, computed, inject, model} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption} from '@banzamel/mineralui-angular/dropdowns/select'
import {MI18nService, MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MIcon, mDownloadIcon, mMoonIcon, mSettingsIcon, mSunIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MDrawer, MDrawerBody, MDrawerFooter, MDrawerHeader} from '@banzamel/mineralui-angular/overlays/drawer'
import {MThemeService} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'

/** Width of the docs topbar container. */
export type DocsTopbarContainer = 'content' | 'full'

const THEME_FILES: readonly {readonly href: string; readonly label: string}[] = [
    {href: '/downloads/variables.css', label: 'ui.docsDownloadVariables'},
    {href: '/downloads/variables-minimal.css', label: 'ui.docsDownloadVariablesMinimal'},
    {href: '/downloads/template.css', label: 'ui.docsDownloadTemplate'},
]

// Counterpart of docs-react `SettingsDrawer`; no language select — the Angular docs are English-only.
@Component({
    selector: 'doc-settings-drawer',
    imports: [
        MButton,
        MDrawer,
        MDrawerBody,
        MDrawerFooter,
        MDrawerHeader,
        MIcon,
        MInline,
        MStack,
        MText,
        MSelect,
        MToggle,
        MTranslatePipe,
    ],
    template: `
        <m-drawer [(open)]="open" side="right" size="sm">
            <m-drawer-header>
                <m-inline align="center">
                    <m-icon [icon]="icons.settings" />
                    <span mText weight="semibold">{{ 'ui.docsSettingsTitle' | mT }}</span>
                </m-inline>
            </m-drawer-header>
            <m-drawer-body>
                <m-stack>
                    <div class="doc-stack-sm">
                        <p mText size="sm" tone="muted">{{ 'ui.docsShellLabel' | mT }}</p>
                        <m-toggle [(checked)]="showSidebar">{{ 'ui.docsShowSidebar' | mT }}</m-toggle>
                        <m-toggle [(checked)]="showTopbar">{{ 'ui.docsShowTopbar' | mT }}</m-toggle>
                        <m-select
                            size="sm"
                            fullWidth
                            [label]="'ui.docsTopbarContainer' | mT"
                            [options]="containerOptions()"
                            [disabled]="!showTopbar()"
                            [value]="topbarContainer()"
                            (valueChange)="setContainer($event)"
                        />
                    </div>

                    <div class="doc-stack-sm">
                        <p mText size="sm" tone="muted">{{ 'ui.docsAppearanceLabel' | mT }}</p>
                        <button mButton variant="outlined" (click)="theme.toggleMode()">
                            <m-icon mStart [icon]="theme.resolvedMode() === 'dark' ? icons.sun : icons.moon" />
                            {{ 'ui.toggleTheme' | mT }}
                        </button>
                    </div>

                    <div class="doc-stack-sm">
                        <p mText size="sm" tone="muted">{{ 'ui.docsThemeFilesLabel' | mT }}</p>
                        @for (file of themeFiles; track file.href) {
                            <a mButton variant="outlined" [href]="file.href" download>
                                <m-icon mStart [icon]="icons.download" />
                                {{ file.label | mT }}
                            </a>
                        }
                    </div>
                </m-stack>
            </m-drawer-body>
            <m-drawer-footer>
                <button mButton variant="ghost" (click)="open.set(false)">{{ 'ui.close' | mT }}</button>
            </m-drawer-footer>
        </m-drawer>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSettingsDrawer {
    readonly open = model(false)
    readonly showSidebar = model(true)
    readonly showTopbar = model(false)
    readonly topbarContainer = model<DocsTopbarContainer>('content')

    protected readonly theme = inject(MThemeService)
    private readonly i18n = inject(MI18nService)
    protected readonly containerOptions = computed<readonly MSelectOption<DocsTopbarContainer>[]>(() => [
        {value: 'content', label: this.i18n.t('ui.docsContainerContent')},
        {value: 'full', label: this.i18n.t('ui.docsContainerFull')},
    ])

    protected setContainer(value: DocsTopbarContainer | DocsTopbarContainer[] | null): void {
        if (value === 'content' || value === 'full') this.topbarContainer.set(value)
    }
    protected readonly themeFiles = THEME_FILES
    protected readonly icons = {settings: mSettingsIcon, download: mDownloadIcon, sun: mSunIcon, moon: mMoonIcon}
}
