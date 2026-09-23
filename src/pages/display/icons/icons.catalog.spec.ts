import * as icons from '@banzamel/mineralui-angular/icons'
import {iconMap} from '@kit/icon-browser/icon-browser'
import {ICON_TABS, NEW_ICONS, PLAYGROUND_ICONS} from './icons.catalog'

describe('icons catalog', () => {
    const defined = iconMap(icons)
    const names = ICON_TABS.flatMap((tab) => tab.groups.flatMap((group) => group.items))

    it('names only existing V1 icons', () => {
        const missing = [...names, ...PLAYGROUND_ICONS, ...NEW_ICONS].filter((name) => !defined.has(name))

        expect(missing).toEqual([])
        expect(names.every((name) => defined.get(name)?.version === undefined)).toBe(true)
    })

    it('lists every V1 icon exactly once', () => {
        const v1 = [...defined].filter(([, def]) => def.version === undefined).map(([name]) => name)

        expect(new Set(names).size).toBe(names.length)
        expect(v1.filter((name) => !names.includes(name))).toEqual([])
    })
})
