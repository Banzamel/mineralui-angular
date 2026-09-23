import {provideZonelessChangeDetection} from '@angular/core'
import {TestBed} from '@angular/core/testing'
import {provideRouter} from '@angular/router'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import en from '@locales/en.json'
import {DocsNavigation} from './docs-navigation'

describe('DocsNavigation', () => {
    async function render() {
        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                provideRouter([]),
                provideMineralI18n({locales: {en}, persist: false}),
            ],
        })
        const fixture = TestBed.createComponent(DocsNavigation)
        await fixture.whenStable()
        const element: HTMLElement = fixture.nativeElement
        const search = async (value: string) => {
            const input = element.querySelector('input')!
            input.value = value
            input.dispatchEvent(new Event('input'))
            await fixture.whenStable()
        }
        const links = () => [...element.querySelectorAll('a')].map((link) => link.textContent?.trim())
        return {element, search, links}
    }

    it('lists every page, sorted by title within a section, under a labelled search', async () => {
        const {element, links} = await render()

        expect(links()).toEqual([
            'Installation',
            'Languages (i18n)',
            'Quick Start',
            'Theming',
            'Icons',
            'Icons v2',
            'Illustrations',
        ])
        const input = element.querySelector('input')!
        expect(element.querySelector(`label[for="${input.id}"]`)).not.toBeNull()
    })

    it('filters by title from two characters and keeps a whole section on a category match', async () => {
        const {search, links} = await render()

        await search('i')
        expect(links().length).toBe(7)

        await search('ico')
        expect(links()).toEqual(['Icons', 'Icons v2'])

        await search('display')
        expect(links()).toEqual(['Icons', 'Icons v2', 'Illustrations'])

        await search('zzz')
        expect(links()).toEqual([])
    })
})
