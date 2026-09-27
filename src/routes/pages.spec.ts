import {provideZonelessChangeDetection} from '@angular/core'
import {TestBed} from '@angular/core/testing'
import {provideRouter} from '@angular/router'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import {provideMineralUI} from '@banzamel/mineralui-angular/theme'
import {DOCS_NAVIGATION, DOCS_PRO_COMPONENTS, isProDoc} from '@locales/docs-navigation'
import en from '@locales/en.json'
import {DOC_PAGES} from './doc-pages'

describe('Pro pages', () => {
    it('are pages of the navigation, each documenting a Pro component', () => {
        const ids = DOCS_NAVIGATION.flatMap((section) => section.items.map((item) => item.id))
        for (const docId of Object.keys(DOCS_PRO_COMPONENTS)) {
            expect(ids).toContain(docId)
            expect(isProDoc(docId)).toBe(true)
        }
    })
})

// Smoke test: every page renders zoneless with the app providers (the prerender checks the server side).
describe('docs pages', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                provideRouter([]),
                provideMineralUI({persist: false}),
                provideMineralI18n({locales: {en}, defaultLocale: 'en', persist: false}),
            ],
        })
    })

    for (const [docId, load] of Object.entries(DOC_PAGES)) {
        it(`renders ${docId}`, async () => {
            const fixture = TestBed.createComponent(await load())
            await fixture.whenStable()
            const element: HTMLElement = fixture.nativeElement

            expect(element.querySelector('h1')?.textContent?.trim().length).toBeGreaterThan(0)
            expect(element.querySelectorAll('doc-section').length).toBeGreaterThan(0)
            // The Pro notice shows exactly where the sidebar has the Pro badge.
            expect(element.querySelector('doc-pro-notice m-alert') !== null).toBe(isProDoc(docId))
        })
    }
})
