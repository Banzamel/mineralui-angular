import api from '@generated/api.json'

const ENTRY_KINDS = ['component', 'directive', 'pipe', 'service', 'interface'] as const
const MEMBER_KINDS = ['input', 'model', 'output', 'property', 'method'] as const

/** One public member of a documented class or interface (see `scripts/generate-docs.mjs`). */
export interface ApiMember {
    /** Public name (the alias, when an input declares one). */
    readonly name: string
    readonly kind: (typeof MEMBER_KINDS)[number]
    readonly type: string
    readonly required: boolean
    readonly default: string | null
    readonly description: string
    /** Host directive that contributes this input (the "Shared inputs" group). */
    readonly from: string | null
}

export interface ApiSlot {
    readonly select: string
    readonly description: string
}

export interface ApiEntry {
    readonly name: string
    readonly kind: (typeof ENTRY_KINDS)[number]
    readonly selector: string | null
    /** Import path of the class, e.g. `@banzamel/mineralui-angular/icons`. */
    readonly entryPoint: string
    /** Group facade that re-exports the entry point, when there is one. */
    readonly facade: string | null
    readonly description: string
    readonly members: readonly ApiMember[]
    readonly slots: readonly ApiSlot[]
}

// JSON imports type string fields as `string`; the kinds are narrowed (and checked) once, here.
type Raw<T, K extends keyof T> = Omit<T, K> & Readonly<Record<K, string>>
type RawEntry = Raw<Omit<ApiEntry, 'members'>, 'kind'> & {readonly members: readonly Raw<ApiMember, 'kind'>[]}

const oneOf =
    <T extends string>(values: readonly T[]) =>
    (value: string): value is T =>
        values.some((candidate) => candidate === value)
const isEntryKind = oneOf(ENTRY_KINDS)
const isMemberKind = oneOf(MEMBER_KINDS)

function narrow(raw: RawEntry): ApiEntry {
    const {kind} = raw
    if (!isEntryKind(kind)) throw new Error(`[api.json] ${raw.name}: unknown kind "${kind}"`)
    const members = raw.members.map((member) => {
        const memberKind = member.kind
        if (!isMemberKind(memberKind)) throw new Error(`[api.json] ${raw.name}.${member.name}: unknown kind`)
        return {...member, kind: memberKind}
    })
    return {...raw, kind, members}
}

const raw: Readonly<Record<string, RawEntry>> = api

/** API of the library generated from the `angular-pro` sources, keyed by class / interface name. */
export const API: Readonly<Record<string, ApiEntry>> = Object.fromEntries(
    Object.entries(raw).map(([name, entry]) => [name, narrow(entry)])
)
