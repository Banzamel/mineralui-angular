# MineralUI for Angular — docs

Documentation site for `@banzamel/mineralui-angular`: Angular 22, zoneless, prerendered (SSG).

The library comes from `../angular-pro` through a `file:` dependency on its **built** `dist` — the docs test exactly
what goes to npm. Build the library first:

```bash
cd ../angular-pro && npm ci && npm run build   # or `npm run watch` while working on both
cd ../docs-angular && npm ci
```

## Commands

```bash
npm run dev          # generator in watch mode + ng serve (SSR dev server)
npm run build        # generate + prerender every route to dist/docs-angular/browser
npm test             # generate + Vitest (ng test)
npm run lint
npm run format:check
npm run generate     # only src/generated/, public/downloads/ and the theme script in src/index.html
```

Always go through the npm scripts (`scripts/ng.mjs`): the linked library needs `--preserve-symlinks`, otherwise Node
loads a second copy of Angular (ADR 0006 in the project knowledge base).

## Structure

```
src/
├── app/         app.ts, app.config.ts (+ .server)
├── routes/      app.routes.ts, doc-pages.ts (docId → lazy page)
├── layout/      temporary docs shell (header, navigation) — TEMP until the library components exist
├── kit/         doc-article, doc-preview, doc-playground, doc-props-table, code-block, icon-browser
├── pages/<category>/<topic>/   <topic>.page.ts|html + examples/*.example.ts + snippets/*
├── locales/     en.json (navigation + UI texts), docs-navigation.ts
└── generated/   api.json, examples/, snippets/ (gitignored, scripts/generate-docs.mjs)
```

- **Examples** (`examples/*.example.ts`) are standalone components rendered live; the "Code" tab shows their source.
- **Snippets** (`snippets/*`) are real files; TypeScript snippets are type-checked with the app.
- **API tables** come from the library sources (`<doc-props-table api="MIcon" />`); public inputs need JSDoc.
- Imports: `kit/` → library only; `pages/` → library + `kit/`; pages never import pages (enforced by ESLint).
