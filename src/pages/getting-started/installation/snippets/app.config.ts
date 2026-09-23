import {provideZonelessChangeDetection} from '@angular/core'
import type {ApplicationConfig} from '@angular/core'
import {provideMineralUI} from '@banzamel/mineralui-angular/theme'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        // Mode class, color-scheme and token overrides on <html>; the chosen mode is kept in localStorage.
        provideMineralUI({mode: 'system'}),
    ],
}
