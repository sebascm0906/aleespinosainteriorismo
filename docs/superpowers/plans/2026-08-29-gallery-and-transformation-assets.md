# Gallery and Transformation Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the mobile visual-language grid, replace the approved `sala` before/after pair, and justify editorial text across desktop and mobile without altering short UI text.

**Architecture:** Content in `src/content/site.ts` remains the single source of truth for image identity, dimensions, alt text, and the `sala` transformation pair. `VisualLanguage` already selects a tenth content item below 768 px; only the filler asset changes. CSS retains the existing fixed grids and narrows text justification to body-copy selectors. `Picture` continues to generate all responsive AVIF/WebP URLs from each content figure.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS Grid, AVIF/WebP responsive images.

---

## File structure

- `public/images/lenguaje-departamento-integrado{,-640}.{avif,webp}` — new mobile-only gallery filler, generated from the approved room image.
- `public/images/transformacion-4-sala-terminada{,-640}.{avif,webp}` — new finished-state image for the `sala` transformation.
- `public/images/transformacion-4-antes{,-640}.{avif,webp}` — deleted obsolete construction-state asset.
- `src/content/site.ts` — names, dimensions, accessible text, and the data of the two affected figures.
- `src/components/VisualLanguage.tsx` — only adjust if the test proves its mobile selection order needs an explicit contract.
- `src/styles/global.css` — scoped body-copy justification and existing 3/2-column layouts.
- `src/test/setup.ts` — jsdom scroll mock used by the pre-existing carousel controls test.
- `src/App.test.tsx` — UI-level tests for mobile filler selection, gallery order, and the `sala` pair.
- `tests/content-and-readme.test.ts` — file existence and absence contracts for the new/removed image assets.

### Task 1: Stabilize the existing carousel test environment

**Files:**
- Modify: `src/test/setup.ts`

- [ ] **Step 1: Reproduce the current jsdom failure**

  From this worktree, run:

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npx vitest run src/App.test.tsx
  ```

  Expected before the test-environment change: exit 1 with `TypeError: pista.scrollTo is not a function` from `Transformation.tsx`.

- [ ] **Step 2: Add the minimal jsdom browser API stub**

  In `src/test/setup.ts`, preserve the existing cleanup and add a single setup
  stub so all rendered elements expose a callable scroll method:

  ```ts
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  })
  ```

  Do not change production carousel code; native browsers already implement this
  method.

- [ ] **Step 3: Re-run the existing carousel test**

  Run the command from Step 1. Expected: `src/App.test.tsx` passes without
  unhandled `scrollTo` errors.

- [ ] **Step 4: Commit the test-environment correction**

  ```bash
  git add src/test/setup.ts
  git commit -m "test: provide scrollTo in jsdom"
  ```

### Task 2: Write failing content and layout contracts

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `tests/content-and-readme.test.ts`

- [ ] **Step 1: Add a failing mobile gallery-selection test**

  Stub `matchMedia` as mobile, render `VisualLanguage` through `App`, and assert 10 `language-figure` list items. Assert the tenth button has the accessible name built from `visualLanguage.fillerDosColumnas.alt` and its image identifier is `lenguaje-departamento-integrado`.

- [ ] **Step 2: Add a failing desktop and breakpoint-selection test**

  Stub desktop media at 768 px, render the app, and assert 9 gallery items and absence of the filler’s accessible button. Read `src/styles/global.css` and assert:

  ```ts
  expect(styles).toMatch(/\.language-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/s)
  expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*\.language-grid\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)/)
  ```

- [ ] **Step 3: Add a failing `sala` content-pair test**

  Locate `transformation.cases.find(({ id }) => id === 'sala')` and assert exactly:

  ```ts
  expect(sala.before).toMatchObject({
    label: 'Antes',
    figure: { image: 'transformacion-4-despues', alt: 'Sala vacía con piso de madera, ventanal corrido y balcón con vista arbolada.' },
  })
  expect(sala.after).toMatchObject({
    label: 'Después',
    figure: { image: 'transformacion-4-sala-terminada', alt: 'Sala y comedor terminados frente al ventanal, con panel de madera, sofá claro y mesa para seis.' },
  })
  ```

- [ ] **Step 4: Add failing asset-presence and removal contracts**

  Add a separate `describe('asset swap')` in `tests/content-and-readme.test.ts`,
  independent of the `figuras` inventory, with a test named
  `nuevos activos existen y la obra retirada no se publica`. Assert all four
  expected files exist for both new image bases and every
  `transformacion-4-antes` AVIF/WebP original and `-640` variant is absent.
  This proves the old photograph cannot ship indirectly before the content data
  starts referencing the new assets.

  Add a published-source guard that reads `src/content/site.ts`, `src/components`,
  and `src/App.tsx` and fails if any contains `transformacion-4-antes`. Exclude
  `docs/` deliberately: historical documentation may name the retired asset,
  but the shipped app must not.

- [ ] **Step 5: Add a failing text-justification scope test**

  Read `src/styles/global.css`; assert this exact body-copy group uses
  `text-align: justify` and `hyphens: auto`:

  ```css
  .philosophy-body p,
  .studio-body p:not(.studio-role),
  .services-list p,
  .contact-copy p,
  .section-heading > p:not(.eyebrow),
  .disclosure,
  .field-error,
  .contact-error-summary,
  .contact-status
  ```

  Assert `.site-navigation`, `h1`, `h2`, `h3`, `.eyebrow`, form `label`,
  `.lightbox-figure figcaption`, and button rules do not receive
  `text-align: justify`.

- [ ] **Step 6: Run the focused tests and confirm red**

  Run:

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npx vitest run src/App.test.tsx tests/content-and-readme.test.ts
  ```

  Expected: failures for old `sala` data and missing new asset names; the layout and justification assertions only fail if their required contracts do not yet exist.

- [ ] **Step 7: Commit the red tests**

  ```bash
  git add src/App.test.tsx tests/content-and-readme.test.ts
  git commit -m "test: specify gallery and sala asset updates"
  ```

### Task 3: Prepare and remove image assets

**Files:**
- Create: `public/images/lenguaje-departamento-integrado.avif`
- Create: `public/images/lenguaje-departamento-integrado.webp`
- Create: `public/images/lenguaje-departamento-integrado-640.avif`
- Create: `public/images/lenguaje-departamento-integrado-640.webp`
- Create: `public/images/transformacion-4-sala-terminada.avif`
- Create: `public/images/transformacion-4-sala-terminada.webp`
- Create: `public/images/transformacion-4-sala-terminada-640.avif`
- Create: `public/images/transformacion-4-sala-terminada-640.webp`
- Delete: `public/images/transformacion-4-antes.avif`
- Delete: `public/images/transformacion-4-antes.webp`
- Delete: `public/images/transformacion-4-antes-640.avif`
- Delete: `public/images/transformacion-4-antes-640.webp`

- [ ] **Step 1: Inspect the approved sources and choose crop-safe dimensions**

  Inspect these exact supplied sources, record their native dimensions, and choose
  output dimensions that preserve the intended interior subject:

  ```text
  /var/folders/15/kxryd4s52dxbzcq344ll65dr0000gn/T/codex-clipboard-2dccef7c-3cfe-4f69-b31f-e98737cb3480.png
    -> lenguaje-departamento-integrado
  /var/folders/15/kxryd4s52dxbzcq344ll65dr0000gn/T/codex-clipboard-b3180e78-7986-4d24-9bf5-656c5302d671.png
    -> transformacion-4-sala-terminada
  ```

  Do not crop away the bed/wood divider in the gallery filler or the window,
  seating, and dining table in the finished `sala` state.

- [ ] **Step 2: Generate the responsive WebP and AVIF pairs**

  Use the project’s available image conversion utility to create the original and 640-px wide variants. Verify each file with `file` and confirm the declared content dimensions match the original exports.

- [ ] **Step 3: Delete the obsolete construction image variants**

  Remove only the four explicitly listed `transformacion-4-antes*` files. Do not delete `transformacion-4-despues*`; it becomes the approved `Antes` state.

- [ ] **Step 4: Run the content asset test and confirm it passes**

  Run:

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npx vitest run tests/content-and-readme.test.ts -t "sustituye los activos del caso sala y retira la foto de obra"
  ```

  Expected: the direct asset-swap contract passes. The broader content guard is
  intentionally left for Task 4, after `site.ts` no longer names the retired
  asset.

- [ ] **Step 5: Commit the asset swap**

  ```bash
  git add public/images
  git commit -m "feat: update gallery and sala images"
  ```

### Task 4: Update content and scoped typography rules

**Files:**
- Modify: `src/content/site.ts:255-262`
- Modify: `src/content/site.ts:356-384`
- Modify: `src/styles/global.css:765-785`

- [ ] **Step 1: Replace the mobile filler figure**

  Set `visualLanguage.fillerDosColumnas` to the `lenguaje-departamento-integrado` base, actual generated dimensions, and the exact approved alt. Retain its `normal` weight so current CSS has no special-case behavior.

- [ ] **Step 2: Replace the `sala` transformation pair by ID**

  In the data object whose `id` is `sala`, retain the existing `transformacion-4-despues` figure as `before`, update its label/alt/dimensions, and set `after` to `transformacion-4-sala-terminada`, the actual generated dimensions, approved alt, and label `Después`. Do not change the other four cases.

- [ ] **Step 3: Scope the text justification**

  Expand the existing body-copy selector group rather than applying a global rule.
  Preserve `text-align: justify; hyphens: auto;` for `.philosophy-body p`,
  `.studio-body p:not(.studio-role)`, `.services-list p`, `.contact-copy p`,
  `.section-heading > p:not(.eyebrow)`, `.disclosure`, `.field-error`,
  `.contact-error-summary`, and `.contact-status`. Exclude headings,
  navigation, buttons, form labels, captions, eyebrows, and short links.

- [ ] **Step 4: Run focused tests and confirm green**

  Run:

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npx vitest run src/App.test.tsx tests/content-and-readme.test.ts
  ```

  Expected: all tests pass without changing the transformation carousel or `Picture` API.

- [ ] **Step 5: Commit content and typography changes**

  ```bash
  git add src/content/site.ts src/styles/global.css src/App.test.tsx tests/content-and-readme.test.ts
  git commit -m "feat: complete mobile gallery and sala transformation"
  ```

### Task 5: Verify visual behavior and production build

**Files:**
- Verify only; no production source changes expected.

- [ ] **Step 1: Run clean test discovery from the feature worktree**

  Run from the feature worktree, not the repository root where sibling worktrees
  are discovered:

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npx vitest run
  ```

  Expected: the suite only discovers this worktree’s tests. Record the known
  root-level sibling-worktree failures separately; do not attribute them to this
  branch.

- [ ] **Step 2: Build the production bundle**

  Run:

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npm run build
  ```

  Expected: TypeScript and Vite build exit 0.

- [ ] **Step 3: Check desktop and mobile visual states**

  Start the local app. At 1440 px confirm `#lenguaje` is a 3×3 grid and the new filler is not rendered. At 768 px confirm the same. At 767 px and 390 px confirm a 2×5 grid with `lenguaje-departamento-integrado` as the tenth item. At 1440 px and 390 px inspect the `#transformacion` `sala` slide for the new before/after pair and verify text blocks are justified while headings/nav/buttons are not.

- [ ] **Step 4: Check the diff and commit if verification requires only test configuration metadata**

  Run:

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  git diff --check
  git status --short
  ```

  Expected: no whitespace errors and only intended tracked changes.
