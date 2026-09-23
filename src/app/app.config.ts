import {provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core'
import type {ApplicationConfig} from '@angular/core'
import {provideClientHydration, withEventReplay} from '@angular/platform-browser'
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import {provideMineralUI} from '@banzamel/mineralui-angular/theme'
import en from '@locales/en.json'
import {routes} from '../routes/app.routes'

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        // Zoneless on purpose: the docs catch library code that relies on zone.js.
        provideZonelessChangeDetection(),
        provideRouter(
            routes,
            withComponentInputBinding(),
            withInMemoryScrolling({scrollPositionRestoration: 'top', anchorScrolling: 'enabled'})
        ),
        provideClientHydration(withEventReplay()),
        provideMineralUI({mode: 'system'}),
        provideMineralI18n({locales: {en}, defaultLocale: 'en'}),
    ],
}
