// Theme starter files (variables.css, variables-minimal.css, template.css). Content is copied from docs-react
// scripts/generate-theme-downloads.mjs so both sites serve the same files; only the token source differs (the
// library package here). Tokens are byte-identical in both frameworks (angular-pro scripts/sync-tokens.mjs).
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

const tokenFiles = [
    ['colors', 'colors.css'],
    ['typography', 'typography.css'],
    ['spacing', 'spacing.css'],
    ['radius', 'radius.css'],
    ['motion', 'motion.css'],
    ['elevation', 'elevation.css'],
    ['layers', 'layers.css'],
    ['layout', 'layout.css'],
]

const minimalSections = [
    {
        title: 'brand colors',
        body: `:root {
    --mineral-primary-rgb: 0, 165, 222;
    --mineral-neutral-rgb: 100, 116, 139;
    --mineral-success-rgb: 22, 163, 74;
    --mineral-error-rgb: 220, 38, 38;
    --mineral-warning-rgb: 234, 124, 0;
    --mineral-info-rgb: 59, 130, 246;
    --mineral-news-rgb: 168, 85, 247;
}`,
    },
    {
        title: 'surface and text',
        body: `:root {
    --mineral-page-bg: var(--mineral-dark);
    --mineral-page-text: var(--mineral-text);
    --mineral-surface: rgba(21, 29, 46, 1);
    --mineral-surface-contrast: rgba(10, 16, 30, 1);
    --mineral-input-bg: rgba(37, 51, 71, 1);
    --mineral-text: rgba(226, 232, 240, 1);
    --mineral-text-secondary: rgba(100, 116, 139, 1);
    --mineral-text-heading: rgba(241, 245, 249, 0.96);
    --mineral-border: rgba(255, 255, 255, 0.15);
    --mineral-border-hover: rgba(255, 255, 255, 0.25);
    --mineral-border-focus: var(--mineral-primary);
}`,
    },
    {
        title: 'dark mode overrides',
        body: `.theme-dark {
    --mineral-page-bg: var(--mineral-dark);
    --mineral-page-text: var(--mineral-text);
    --mineral-surface: rgba(21, 29, 46, 1);
    --mineral-surface-contrast: rgba(10, 16, 30, 1);
    --mineral-input-bg: rgba(37, 51, 71, 1);
    --mineral-text: rgba(226, 232, 240, 1);
    --mineral-text-secondary: rgba(100, 116, 139, 1);
    --mineral-text-heading: rgba(241, 245, 249, 0.96);
    --mineral-border: rgba(255, 255, 255, 0.15);
    --mineral-border-hover: rgba(255, 255, 255, 0.25);
    --mineral-border-focus: var(--mineral-primary);
}`,
    },
    {
        title: 'light mode overrides',
        body: `.theme-light {
    --mineral-page-bg: rgba(243, 244, 246, 1);
    --mineral-page-text: rgba(30, 41, 59, 1);
    --mineral-surface: rgba(255, 255, 255, 1);
    --mineral-surface-contrast: rgba(226, 232, 240, 1);
    --mineral-input-bg: rgba(255, 255, 255, 1);
    --mineral-text: rgba(30, 41, 59, 1);
    --mineral-text-secondary: rgba(100, 116, 139, 1);
    --mineral-text-heading: rgba(31, 41, 55, 0.84);
    --mineral-border: rgba(0, 0, 0, 0.12);
    --mineral-border-hover: rgba(0, 0, 0, 0.2);
}`,
    },
    {
        title: 'typography and sizing',
        body: `:root {
    --mineral-font-family-sans:
        'Public Sans Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    --mineral-font-family-heading: var(--mineral-font-family-sans);
    --mineral-font-family-mono: 'Cascadia MCode', 'Fira MCode', 'JetBrains Mono', monospace;
    --mineral-font-family: var(--mineral-font-family-sans);
    --mineral-font-size-xs: 0.75rem;
    --mineral-font-size-sm: 0.875rem;
    --mineral-font-size-md: 1rem;
    --mineral-font-size-lg: 1.125rem;
    --mineral-font-size-xl: 1.25rem;
    --mineral-font-size-2xl: 1.5rem;
    --mineral-spacing-base: 8px;
    --mineral-radius-base: 8px;
}`,
    },
]

const darkModeReferenceSection = `/* explicit dark mode overrides
   Dark mode is already the default in :root.
   Keep this block only if you want to toggle an explicit .theme-dark class in your app.
*/
.theme-dark {
    --mineral-dark-rgb: 15, 23, 42;
    --mineral-dark: rgba(var(--mineral-dark-rgb), 1);
    --mineral-dark-light-rgb: 30, 41, 59;
    --mineral-dark-light: rgba(var(--mineral-dark-light-rgb), 1);
    --mineral-surface-rgb: 21, 29, 46;
    --mineral-surface: rgba(var(--mineral-surface-rgb), 1);
    --mineral-surface-contrast: rgba(10, 16, 30, 1);
    --mineral-input-bg: rgba(37, 51, 71, 1);
    --mineral-page-bg: var(--mineral-dark);
    --mineral-page-text: var(--mineral-text);
    --mineral-text-rgb: 226, 232, 240;
    --mineral-text: rgba(var(--mineral-text-rgb), 1);
    --mineral-text-secondary: rgba(100, 116, 139, 1);
    --mineral-text-muted: var(--mineral-text-secondary);
    --mineral-text-heading: rgba(241, 245, 249, 0.96);
    --mineral-text-inverted: rgba(15, 23, 42, 1);
    --mineral-tooltip-text: rgba(255, 255, 255, 1);
    --mineral-tooltip-bg: rgba(15, 23, 42, 0.92);
    --mineral-border: rgba(255, 255, 255, 0.15);
    --mineral-border-hover: rgba(255, 255, 255, 0.25);
    --mineral-border-focus: var(--mineral-primary);
    --mineral-popover-bg: rgba(30, 41, 59, 0.95);
    --mineral-popover-border: rgba(255, 255, 255, 0.08);
    --mineral-option-hover-bg: rgba(255, 255, 255, 0.05);
    --mineral-option-selected-bg: rgba(var(--mineral-primary-rgb), 0.15);
    --mineral-option-active-bg: rgba(var(--mineral-primary-rgb), 0.25);
}`

function buildVariablesCss(tokensRoot) {
    const sections = tokenFiles.map(([label, fileName]) => {
        const source = readFileSync(resolve(tokensRoot, fileName), 'utf8').trim()

        return `/* ${label}.css */\n${source}`
    })

    return `/* MineralUI theme tokens
   Generated from mineralui/src/theme/tokens/*
   Copy this file into your app and override the variables you need.
   Dark mode is the default in :root. .theme-light overrides are included from the framework tokens.
*/

${sections.join('\n\n')}

${darkModeReferenceSection}
`
}

function buildMinimalVariablesCss() {
    const sections = minimalSections.map((section) => `/* ${section.title} */\n${section.body}`)

    return `/* MineralUI minimal theme tokens
   Start with this file when you only want to adjust the most visible brand, surface and typography values.
   Expand to variables.css if you need the full token surface.
*/

${sections.join('\n\n')}
`
}

function buildTemplateCss() {
    return `/* MineralUI app shell template
   Keep this file next to variables.css.
   MThemeProvider toggles the .theme-light class on body or on a wrapper scope.
*/

@import url('./variables.css');

:root {
    color-scheme: dark;
}

.theme-light {
    color-scheme: light;
}

html {
    scroll-behavior: smooth;
}

html,
body {
    min-height: 100%;
}

body {
    margin: 0;
    overflow-x: hidden;
    background: var(--mineral-page-bg);
    color: var(--mineral-page-text);
    font-family: var(--mineral-font-family-sans, var(--mineral-font-family));
    line-height: 1.5;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition:
        background-color 180ms ease,
        color 180ms ease;
}

#root {
    min-height: 100vh;
    background: var(--mineral-page-bg);
    color: var(--mineral-page-text);
}

::selection {
    background: rgba(var(--mineral-primary-rgb), 0.28);
    color: var(--mineral-primary-contrast);
}

a {
    color: var(--mineral-primary);
    text-decoration-color: rgba(var(--mineral-primary-rgb), 0.35);
    transition:
        color 150ms ease,
        text-decoration-color 150ms ease;
}

a:hover {
    text-decoration-color: currentColor;
}

body.theme-light,
.theme-light body {
    background: var(--mineral-page-bg);
    color: var(--mineral-page-text);
}

body.theme-light #root,
.theme-light #root {
    background: var(--mineral-page-bg);
    color: var(--mineral-page-text);
}
`
}

/** Returns file name → content. */
export function buildDownloads(tokensRoot) {
    return {
        'variables.css': buildVariablesCss(tokensRoot),
        'variables-minimal.css': buildMinimalVariablesCss(),
        'template.css': buildTemplateCss(),
    }
}
