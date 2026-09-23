import type {ApplicationConfig} from '@angular/core'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import {locales} from './locales'

export const appConfig: ApplicationConfig = {
    providers: [
        // persist: false keeps the locale in memory only (default: stored in localStorage as mineralui-locale).
        provideMineralI18n({locales, defaultLocale: 'en', persist: false}),
    ],
}
