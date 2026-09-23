import {SCENES} from './illustrations.catalog'
import {SCENE_DEFS} from './illustrations.page'

describe('illustrations catalog', () => {
    it('lists every scene of the library exactly once', () => {
        const listed = SCENES.map((scene) => scene.name)

        expect(listed.filter((name) => !SCENE_DEFS.has(name))).toEqual([])
        expect([...SCENE_DEFS.keys()].filter((name) => !listed.includes(name))).toEqual([])
        expect(new Set(listed).size).toBe(listed.length)
    })
})
