import {ChangeDetectionStrategy, Component, provideZonelessChangeDetection} from '@angular/core'
import {TestBed} from '@angular/core/testing'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import en from '@locales/en.json'
import type {DocExample} from '../doc-example'
import {DocPreview} from './doc-preview'

@Component({
    selector: 'doc-sample',
    template: '<p class="sample">Live sample</p>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class Sample {}

const example: DocExample = {component: Sample, source: 'export class Sample {}', title: 'sample.example.ts'}

@Component({
    imports: [DocPreview],
    template: '<doc-preview [example]="example" />',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class Host {
    protected readonly example = example
}

describe('DocPreview', () => {
    async function render() {
        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection(), provideMineralI18n({locales: {en}, persist: false})],
        })
        const fixture = TestBed.createComponent(Host)
        await fixture.whenStable()
        const element: HTMLElement = fixture.nativeElement
        const tabs = () => [...element.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
        const panels = () => [...element.querySelectorAll<HTMLElement>('[role="tabpanel"]')]
        return {fixture, element, tabs, panels}
    }

    it('renders the example live and its source in the code panel', async () => {
        const {element, panels} = await render()

        expect(element.querySelector('.sample')?.textContent).toBe('Live sample')
        expect(panels()[1]?.textContent).toContain('export class Sample')
        expect(panels()[0]?.hidden).toBe(false)
        expect(panels()[1]?.hidden).toBe(true)
    })

    it('wires tabs and panels with ARIA and a roving tabindex', async () => {
        const {tabs, panels} = await render()
        const [preview, code] = tabs()

        expect(preview?.getAttribute('aria-selected')).toBe('true')
        expect(preview?.tabIndex).toBe(0)
        expect(code?.tabIndex).toBe(-1)
        expect(preview?.getAttribute('aria-controls')).toBe(panels()[0]?.id)
        expect(panels()[0]?.getAttribute('aria-labelledby')).toBe(preview?.id)
    })

    it('moves between tabs with arrow keys, Home and End', async () => {
        const {fixture, tabs, panels} = await render()
        const press = async (key: string) => {
            document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', {key, bubbles: true}))
            await fixture.whenStable()
        }
        tabs()[0]?.focus()

        await press('ArrowRight')
        expect(tabs()[1]?.getAttribute('aria-selected')).toBe('true')
        expect(document.activeElement).toBe(tabs()[1])
        expect(panels()[1]?.hidden).toBe(false)

        await press('ArrowRight')
        expect(document.activeElement).toBe(tabs()[0])

        await press('End')
        expect(document.activeElement).toBe(tabs()[1])

        await press('Home')
        expect(tabs()[0]?.getAttribute('aria-selected')).toBe('true')
    })
})
