import {provideZonelessChangeDetection} from '@angular/core'
import type {ApplicationConfig} from '@angular/core'
import {provideMineralToast} from '@banzamel/mineralui-angular/feedback/toast'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import {provideMineralUI} from '@banzamel/mineralui-angular/theme'

const en = {app: {toggleTheme: 'Toggle theme', themeChanged: 'Theme changed'}}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        // MThemeProvider: mode class, color-scheme and token overrides on <html>; the mode is kept in localStorage.
        provideMineralUI({mode: 'system'}),
        // MI18nProvider: MI18nService and the mT pipe.
        provideMineralI18n({locales: {en}, defaultLocale: 'en'}),
        // MToastProvider is optional: the toast stack mounts itself on the first toast.
        provideMineralToast({position: 'top-right'}),
    ],
}
