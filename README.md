# kellygorr.com

My personal portfolio site — case studies, interactive motion demos, and project write-ups. Live at [kellygorr.com](https://kellygorr.com).

## For Developers

### Installation

```sh
npm install
```

`.env` is included in the repo (just public CDN base URLs for images/thumbnails, nothing sensitive).

### Running

```sh
npm run dev   # site (Vite) + Storybook, concurrently
```

### Building

```sh
npm run build             # typecheck, site build, and sub-site builds
npm run build:storybook   # Storybook only
```

### Linting

```sh
npm run lint        # ESLint
npm run lint:copy   # Sentence-case copy convention check
```

### Tech Stack

- React 19 + TypeScript + Vite
- `styled-components`
- `motion` (Motion for React) for page/demo animation
- Storybook for interactive component demos
- Fluent UI (`@fluentui/react-components`, `@fluentui/react-motion`) in select demos recreating real design-system work

### Architecture

```
src/
├── components/   # Site chrome and shared UI (Header, Footer, Search, Home, Page)
├── data/
│   └── projects/ # One file per case study — content + layout, no JSX markup duplication
├── styles/       # Theme, global styles, breakpoints, motion palettes/tokens
└── utils/

stories/          # Storybook — interactive motion demos embedded in case studies
websites/         # Standalone playable sub-apps (e.g. Text Adventure on-rails demo)
```

Each case study lives in its own `src/data/projects/*.ts(x)` file as structured data (sections, highlights, slideshows, embedded demos) rather than hand-written page markup, so adding a new project is mostly data entry, not new components.

### Engineering highlights

- **Interactive motion demos** — many case studies embed live, interactive Storybook stories, rebuilt-for-portfolio recreations of real product motion (design system components, progress indicators, menus, typography systems), rather than static screenshots or video. These are built and shipped as part of the main site (`npm run build:storybook`), not just dev-time documentation.
- **Multi-site builds** — a few projects (like the Text Adventure demo) are independent apps with their own `package.json`, living under [`websites/`](websites/) and listed in `websites/manifest.json`. `scripts/build-websites.mjs` builds each one and nests its output under the main site's `dist/websites/<slug>/`, so they deploy as static assets within the same hosting bucket with no server-side routing.
- **Custom tooling** — `scripts/lint-copy.mjs` enforces sentence-case capitalization across every case study's copy (with an allowlist for real proper nouns like Xbox, Copilot, Fluent), so capitalization stays consistent across 29+ project files without manual review. The Storybook a11y addon runs accessibility checks alongside every interactive demo during development.

## Credits

See individual case studies on [kellygorr.com](https://kellygorr.com) for project-specific credits and collaborators.
