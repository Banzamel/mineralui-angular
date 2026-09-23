import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MIcon, mDownloadIcon} from '@banzamel/mineralui-angular/icons'
import themeMode from '@generated/examples/getting-started/theming/theme-mode'
import themeScope from '@generated/examples/getting-started/theming/theme-scope'
import * as snippets from '@generated/snippets/getting-started/theming'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

// Token groups as listed by docs-react ThemingDoc (tokens are shared by both frameworks).
const TOKEN_GROUPS: readonly {readonly group: string; readonly tokens: string}[] = [
    {
        group: 'Color palette',
        tokens: '--mineral-primary-rgb, --mineral-primary, --mineral-neutral, --mineral-success, --mineral-error, --mineral-warning, --mineral-info, --mineral-danger-rgb',
    },
    {
        group: 'Surfaces and text',
        tokens: '--mineral-dark, --mineral-dark-light, --mineral-surface, --mineral-page-bg, --mineral-page-text, --mineral-text, --mineral-text-secondary, --mineral-text-heading',
    },
    {
        group: 'Font colors',
        tokens: '--mineral-fcolor-default, --mineral-fcolor-muted, --mineral-fcolor-heading, --mineral-fcolor-inverted, --mineral-fcolor-primary, --mineral-fcolor-neutral, --mineral-fcolor-success, --mineral-fcolor-error, --mineral-fcolor-warning, --mineral-fcolor-info',
    },
    {
        group: 'Typography',
        tokens: '--mineral-font-family-sans, --mineral-font-family-heading, --mineral-font-family-mono, --mineral-font-size-xs..2xl',
    },
    {group: 'Spacing', tokens: '--mineral-spacing-base, --mineral-spacing-xs/sm/md/lg/xl/2xl'},
    {group: 'Radius', tokens: '--mineral-radius-base, --mineral-radius-sm/md/lg/xl/full'},
    {
        group: 'Layout',
        tokens: '--mineral-navbar-height, --mineral-sidebar-width, --mineral-sidebar-collapsed-width, --mineral-content-max-width',
    },
    {group: 'Motion', tokens: '--mineral-transition-fast, --mineral-transition-base'},
    {group: 'Elevation and layers', tokens: '--mineral-shadow-*, --mineral-shell-shadow, --mineral-z-*'},
]

// Exported type aliases (api.json documents classes and interfaces, not unions).
const THEME_TYPES: readonly {readonly name: string; readonly type: string; readonly description: string}[] = [
    {name: 'MMode', type: "'dark' | 'light'", description: 'Resolved color mode.'},
    {name: 'MModePreference', type: "MMode | 'system'", description: 'Mode preference; system follows the OS.'},
    {
        name: 'MColor',
        type: "'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark' | 'news'",
        description: 'Semantic palette used by components.',
    },
    {name: 'MSize', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: 'Shared component size scale.'},
    {
        name: 'MUtilityScale',
        type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        description: 'Spacing scale of the MSpacing inputs.',
    },
    {name: 'MBreakpoint', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'", description: 'Responsive breakpoints.'},
]

@Component({
    selector: 'doc-theming-page',
    imports: [RouterLink, MIcon, MTranslatePipe, CodeBlock, DocArticle, DocSection, DocPreview, DocPropsTable],
    templateUrl: './theming.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingPage {
    protected readonly snippets = snippets
    protected readonly examples = {themeMode, themeScope}
    protected readonly download = mDownloadIcon
    protected readonly tokenGroups = TOKEN_GROUPS
    protected readonly themeTypes = THEME_TYPES
}
