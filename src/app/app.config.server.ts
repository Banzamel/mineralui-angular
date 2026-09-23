import {mergeApplicationConfig} from '@angular/core'
import type {ApplicationConfig} from '@angular/core'
import {provideServerRendering, RenderMode, withRoutes} from '@angular/ssr'
import type {ServerRoute} from '@angular/ssr'
import {appConfig} from './app.config'

// Every route is static: the docs are prerendered (SSG) at build time, which also proves the library is SSR-safe.
const serverRoutes: ServerRoute[] = [{path: '**', renderMode: RenderMode.Prerender}]

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, {
    providers: [provideServerRendering(withRoutes(serverRoutes))],
})
