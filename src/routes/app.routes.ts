import type {Routes} from '@angular/router'
import en from '@locales/en.json'
import {DOC_ALIASES, DOC_PAGES} from './doc-pages'

const SITE = 'MineralUI for Angular'
const titles = new Map(en.docsNavigation.flatMap((section) => section.items.map((item) => [item.id, item.title])))

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'docs'},
    {
        path: 'docs',
        loadComponent: () => import('@layout/docs-layout/docs-layout').then((m) => m.DocsLayout),
        children: [
            {
                path: '',
                pathMatch: 'full',
                title: `Docs — ${SITE}`,
                loadComponent: () => import('@pages/overview/overview.page').then((m) => m.OverviewPage),
            },
            ...Object.entries(DOC_PAGES).map(([path, loadComponent]) => ({
                path,
                title: `${titles.get(path) ?? path} — ${SITE}`,
                loadComponent,
            })),
            ...Object.entries(DOC_ALIASES).map(([path, target]) => ({path, redirectTo: target})),
            {
                path: '**',
                title: `Not found — ${SITE}`,
                loadComponent: () => import('@pages/not-found/not-found.page').then((m) => m.NotFoundPage),
            },
        ],
    },
    {path: '**', redirectTo: 'docs'},
]
