import type {Type} from '@angular/core'

/** Language of a code sample (highlight.js grammar). */
export type DocLanguage = 'typescript' | 'html' | 'css' | 'json' | 'bash'

/**
 * A live example: a standalone component and its own source. Emitted by `scripts/generate-docs.mjs` for every
 * `pages/**\/examples/*.example.ts` into `src/generated/examples/` (ADR 0005) — never written by hand.
 */
export interface DocExample {
    readonly component: Type<unknown>
    readonly source: string
    /** File name shown above the source. */
    readonly title: string
}

/**
 * A static code sample: a real file under `pages/**\/snippets/` (TypeScript snippets are type-checked with the app),
 * emitted into `src/generated/snippets/` — never written by hand.
 */
export interface DocSnippet {
    readonly source: string
    readonly language: DocLanguage
    /** File name shown above the source. */
    readonly title: string
}
