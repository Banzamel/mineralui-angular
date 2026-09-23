import type {WritableSignal} from '@angular/core'

/**
 * Playground controls bind straight to the page's own signals, so the preview keeps precise types
 * (`WritableSignal<MIconColor>`), while the playground renders them through this erased shape.
 */
export type PlaygroundControl =
    | {
          readonly kind: 'select'
          readonly name: string
          readonly options: readonly string[]
          readonly value: () => string
          readonly select: (index: number) => void
      }
    | {
          readonly kind: 'slider'
          readonly name: string
          readonly min: number
          readonly max: number
          readonly step: number
          readonly value: () => number
          readonly set: (value: number) => void
      }
    | {
          readonly kind: 'boolean'
          readonly name: string
          readonly value: () => boolean
          readonly set: (value: boolean) => void
      }

export function selectControl<T extends string>(
    name: string,
    state: WritableSignal<T>,
    options: readonly T[]
): PlaygroundControl {
    return {
        kind: 'select',
        name,
        options,
        value: state,
        select: (index) => {
            const option = options[index]
            if (option !== undefined) state.set(option)
        },
    }
}

export function sliderControl(
    name: string,
    state: WritableSignal<number>,
    range: {readonly min: number; readonly max: number; readonly step?: number}
): PlaygroundControl {
    return {
        kind: 'slider',
        name,
        min: range.min,
        max: range.max,
        step: range.step ?? 1,
        value: state,
        set: (value) => state.set(value),
    }
}

export function booleanControl(name: string, state: WritableSignal<boolean>): PlaygroundControl {
    return {kind: 'boolean', name, value: state, set: (value) => state.set(value)}
}
