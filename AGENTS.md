# AGENTS.md
# Plaid Councillor Resources Web App
# Notes for agentic coding assistants working in this repo.

## Project snapshot
- Stack: Next.js 14 (pages router), React 18, Node scripts in `scripts/`.
- Data files live in `public/` and are imported directly by pages.
- Styling: inline JSX styles via `<style jsx>` plus small global styles in `_document.js`.

## Commands
### Install
- `npm install`

### Dev server
- `npm run dev`

### Production build / start
- `npm run build`
- `npm run start`

### Lint
- `npm run lint`

### Single-file lint (closest to single test)
- `npm run lint -- --file pages/index.js`
- `npm run lint -- --file pages/100tips.js`

### Tests
- No test runner is configured in `package.json`.
- If adding tests, document new commands here.

### Data processing scripts
- `node scripts/create-search-index.js`
- `node scripts/improved-tips-extraction.js`
- `node scripts/extract-and-categorize-tips.js`

## Repo-specific rules
- No Cursor rules found in `.cursor/rules/` or `.cursorrules`.
- No Copilot rules found in `.github/copilot-instructions.md`.

## Code style guidelines
### General
- Keep changes small and localized; avoid reformatting unrelated code.
- Prefer ASCII characters; only use Unicode when content requires it.
- Use single quotes for strings to match existing files.
- Keep line lengths reasonable for readability (soft wrap; no enforced formatter).

### JavaScript (pages)
- React components are function components with `export default function`.
- Hooks are imported from `react` and used at top-level in components.
- Use `const` by default; use `let` only when reassignment is required.
- Use inline handlers with minimal logic; factor out helpers inside component.
- JSX uses `className` and inline `style` objects where necessary.
- Use `<style jsx>` blocks for scoped component styles.
- Use descriptive state names: `currentPdf`, `searchTerm`, `expandedTip`, etc.

### JavaScript (scripts)
- Node scripts use CommonJS: `const fs = require('fs');`.
- Semicolons are used consistently in scripts; preserve that style there.
- Keep scripts synchronous for simplicity (`readFileSync`, `writeFileSync`).
- Use `path.join` for filesystem paths.

### Imports
- Group imports at top of file.
- Third-party imports first, then local modules, then local JSON.
- Keep import list minimal; remove unused imports.

### Formatting
- Pages: no semicolons, consistent with `pages/*.js`.
- Scripts: semicolons in use; do not reformat to match pages.
- Use blank lines to separate logical blocks (state, helpers, handlers, render).
- Keep JSX indentation at two spaces, as in current files.

### Types
- Codebase is JavaScript only; no TypeScript configuration.
- Avoid introducing TS unless explicitly requested.

### Naming conventions
- Components: PascalCase (`Home`, `HundredTips`).
- Hooks/state: camelCase (`searchResults`, `setSearchIndex`).
- Constants: camelCase or ALL_CAPS for true constants (rare here).
- Files: existing pages use lowercase (`index.js`, `100tips.js`).

### Error handling
- Use `try/catch` around filesystem access in scripts; log error message.
- In the UI, log errors to console and keep UI functional where possible.
- Avoid throwing on recoverable errors (e.g., missing OCR pages).

### Data handling
- JSON data files are in `public/` and imported by pages.
- Keep JSON formatting stable (2-space indentation) when regenerating.
- When updating OCR-derived data, rerun the relevant scripts and verify UI.

### UI patterns
- Maintain simple, accessible UI controls (buttons, inputs, labels).
- Use `Link` from `next/link` for internal navigation.
- Prefer lightweight state over additional dependencies.

### Performance & UX
- Avoid heavy client-side computation in render paths.
- When searching, pre-load indexes in `useEffect` and cache in state.
- Keep images responsive (`width: 100%`, `height: auto`).

### File structure
- Pages live in `pages/` (pages router, no `app/`).
- Static assets and data live in `public/`.
- Scripts live in `scripts/` and are invoked directly by Node.

## When adding new features
- Update `README.md` if new commands or workflows are introduced.
- Add new scripts to the “Data processing scripts” section above.
- Keep data updates deterministic to avoid noisy diffs.

## Quick checks before PR/commit
- Run `npm run lint` (or single-file lint when possible).
- Manually check pages render in dev: `npm run dev`.
- Ensure `public/search-index.json` and `public/100tips-categorized.json` stay in sync with scripts when changed.

## Known limitations
- No automated test suite.
- No formatter configuration; rely on existing style patterns.
- `npm audit` reports high-severity issues that require breaking upgrades (Next.js 16 / eslint-config-next 16). Do not run `npm audit fix --force` unless explicitly requested.
