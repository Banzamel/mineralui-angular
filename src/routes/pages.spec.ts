import {provideZonelessChangeDetection} from '@angular/core'
import {TestBed} from '@angular/core/testing'
import {provideRouter} from '@angular/router'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import {provideMineralUI} from '@banzamel/mineralui-angular/theme'
import en from '@locales/en.json'
import {DOC_PAGES} from './doc-pages'

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
        })
    }
})
