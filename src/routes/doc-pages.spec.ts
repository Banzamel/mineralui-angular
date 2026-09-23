import en from '@locales/en.json'
import {DOC_PAGES} from './doc-pages'

describe('DOC_PAGES', () => {
    it('matches the navigation one to one', () => {
        // A page may be listed in several sections (layout-system: Getting Started + Layout, as in docs-react).
        const navIds = [...new Set(en.docsNavigation.flatMap((section) => section.items.map((item) => item.id)))].sort()

        expect(Object.keys(DOC_PAGES).sort()).toEqual(navIds)
    })
})
