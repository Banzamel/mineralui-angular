import type {ApplicationConfig} from '@angular/core'
import type {MTheme} from '@banzamel/mineralui-angular/theme'
import {provideMineralUI} from '@banzamel/mineralui-angular/theme'

const customTheme: MTheme = {
    primaryRgb: '39, 161, 122',
    primary: 'rgba(39, 161, 122, 1)',
    surface: 'rgba(20, 38, 54, 1)',
    fontColorPrimary: 'rgba(39, 161, 122, 1)',
    fontFamilySans: "'Poppins', sans-serif",
    radiusMd: '12px',
}

export const appConfig: ApplicationConfig = {
    providers: [provideMineralUI({mode: 'dark', theme: customTheme})],
}
