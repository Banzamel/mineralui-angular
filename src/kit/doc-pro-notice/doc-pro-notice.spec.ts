import {provideZonelessChangeDetection} from '@angular/core'
import {TestBed} from '@angular/core/testing'
import {provideRouter} from '@angular/router'
import {DocProNotice} from './doc-pro-notice'

describe('DocProNotice', () => {
    async function render(components: readonly string[]) {
        TestBed.configureTestingModule({providers: [provideZonelessChangeDetection(), provideRouter([])]})
        const fixture = TestBed.createComponent(DocProNotice)
        fixture.componentRef.setInput('components', components)
        fixture.componentRef.setInput('reason', 'Charts are Pro.')
        await fixture.whenStable()
        const element: HTMLElement = fixture.nativeElement
        return element
    }

    it('names the components and links to the Pro installation when one of them is Pro', async () => {
        const element = await render(['MCardBusiness', 'MQrCode'])

        const alert = element.querySelector('m-alert')!
        expect(alert.textContent).toContain('MineralUI Pro')
        expect([...alert.querySelectorAll('code')].map((code) => code.textContent)).toEqual([
            'MCardBusiness',
            'MQrCode',
            '@banzamel/mineralui-angular-pro',
        ])
        expect(alert.textContent).toContain('Charts are Pro.')
        expect(alert.querySelector('a')?.getAttribute('href')).toBe('/docs/installation#mineralui-pro')
    })

    it('renders nothing when every component is free (the library decides, as in docs-react)', async () => {
        const element = await render(['MStepper'])

        expect(element.querySelector('m-alert')).toBeNull()
    })
})
