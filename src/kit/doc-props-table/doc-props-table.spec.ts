import {ChangeDetectionStrategy, Component, provideZonelessChangeDetection} from '@angular/core'
import {TestBed} from '@angular/core/testing'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import en from '@locales/en.json'
import {API} from './api'
import {DocPropsTable} from './doc-props-table'

@Component({
    imports: [DocPropsTable],
    template: '<doc-props-table api="MIcon" />',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class Host {}

describe('DocPropsTable', () => {
    it('renders the generated API: import path, selector and one row per input', async () => {
        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection(), provideMineralI18n({locales: {en}, persist: false})],
        })
        const fixture = TestBed.createComponent(Host)
        await fixture.whenStable()
        const element: HTMLElement = fixture.nativeElement
        const inputs = element.querySelector('table')!
        const rows = [...inputs.querySelectorAll('tbody tr')].map((row) => row.querySelector('th code')?.textContent)

        expect(element.textContent).toContain("import {MIcon} from '@banzamel/mineralui-angular/icons'")
        expect(element.textContent).toContain('m-icon')
        expect(rows).toEqual(API['MIcon']?.members.map((member) => member.name))
        expect(element.querySelectorAll('caption').length).toBeGreaterThan(0)
    })

    it('documents content slots from @slot tags', () => {
        expect(API['MIcon']?.slots.map((slot) => slot.select)).toEqual(['default'])
    })
})
