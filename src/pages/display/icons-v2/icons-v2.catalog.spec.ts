import * as icons from '@banzamel/mineralui-angular/icons'
import {iconMap} from '@kit/icon-browser/icon-browser'
import {ICON_TABS, PLAYGROUND_ICONS} from './icons-v2.catalog'

describe('icons v2 catalog', () => {
    const defined = iconMap(icons)
    const names = ICON_TABS.flatMap((tab) => tab.groups.flatMap((group) => group.items))

    it('names only existing V2 icons', () => {
        const missing = [...names, ...PLAYGROUND_ICONS].filter((name) => defined.get(name)?.version !== 2)

        expect(missing).toEqual([])
    })

    it('lists every V2 icon exactly once', () => {
        const v2 = [...defined].filter(([, def]) => def.version === 2).map(([name]) => name)

        expect(new Set(names).size).toBe(names.length)
        expect(v2.filter((name) => !names.includes(name))).toEqual([])
    })
})
