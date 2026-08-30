# Mobile Menu and Transformation Frame Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every before/after image share one visual frame and replace the expanded mobile navigation with an accessible hamburger panel.

**Architecture:** `Header` owns responsive navigation state while `navigation` remains the single data source. A `useMediaQuery('(max-width: 767px)')` signal closes the mobile panel on breakpoint changes and directs focus safely. CSS assigns the image frame to `picture`, leaving captions outside, and converts the existing header navigation into an absolute full-viewport-width panel only on mobile.

**Tech Stack:** React 19, TypeScript, Lucide React, CSS Grid, Vitest, Testing Library, Vite.

---

## File structure

- `src/components/Header.tsx` — hamburger state, keyboard/focus behavior and responsive navigation markup.
- `src/components/Header.test.tsx` — unit contracts for menu ARIA, focus, Escape, links and media-query transition.
- `src/styles/global.css` — transformation picture frame plus desktop/mobile header and panel styling.
- `src/App.test.tsx` — CSS structural contract for equal comparison image frames.

### Task 1: Write failing interaction and CSS contracts

**Files:**
- Create: `src/components/Header.test.tsx`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Build a controllable `matchMedia` test helper**

  In `Header.test.tsx`, create a media-query mock that exposes `emit(matches)` and
  listener registration. Use it to render mobile (`true`) and desktop (`false`)
  states without relying on JSDOM layout.

- [ ] **Step 2: Write failing menu behavior tests**

  Add tests that assert on mobile:

  ```ts
  const toggle = screen.getByRole('button', { name: 'Abrir menú de navegación' })
  expect(toggle).toHaveAttribute('aria-controls', 'mobile-navigation')
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(screen.getByRole('navigation', { name: 'Navegación principal', hidden: true })).toHaveAttribute('hidden')
  ```

  After click, assert open label/expanded state, panel no longer hidden, and
  first link receives focus. Add separate tests for Escape → closed/button focus,
  internal link click → closed/button focus, and open/mobile focus → emit desktop
  → closed/brand focus → emit mobile → still closed.

- [ ] **Step 3: Write failing desktop regression and CSS-frame tests**

  Assert desktop exposes the horizontal nav but no hamburger. Add source-CSS
  contracts requiring `.carrusel .transformation-pair figure > picture` to have
  `aspect-ratio: 1165 / 1040`, `display: block`, `width: 100%` and overflow
  clipping (without `height: 100%`), and its descendant image to have `display: block`,
  `width: 100%`, `height: 100%` and `object-fit: cover`. Add source-CSS
  assertions for the mobile panel's absolute, full-viewport positioning below
  the header (`top: 100%`, `left: 50%`, `width: 100vw`, `translateX(-50%)`), distinct
  `max-width: 767px` / `min-width: 768px` behavior, and the toggle's 44px
  square hit target.

- [ ] **Step 4: Run red tests**

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npx vitest run src/components/Header.test.tsx src/App.test.tsx
  ```

  Expected: tests fail because the current header has no menu button/panel state
  and CSS applies the ratio directly to `img`.

- [ ] **Step 5: Commit red contracts**

  ```bash
  git add src/components/Header.test.tsx src/App.test.tsx
  git commit -m "test: specify mobile menu and comparison frames"
  ```

### Task 2: Implement accessible responsive header

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Add responsive and focus refs**

  Import `Menu`, `X` and `useMediaQuery`; create refs for the hamburger, brand,
  and first link. Initialize `isMobile` with `(max-width: 767px)` and `isOpen`
  as false.

- [ ] **Step 2: Implement close/open, focus and Escape behavior**

  Implement one `closeMenu({ focus: 'toggle' | 'brand' })` helper. On open,
  render then focus the first link. On Escape and internal link click close and
  focus toggle. In an effect, when `isMobile` becomes false, close and focus the
  brand if focus was in the panel; do not leave hidden elements focused.

- [ ] **Step 3: Render one source of navigation**

  Keep the single mapped `navigation` list inside `nav#mobile-navigation`. Set
  `hidden={isMobile && !isOpen}` and `data-open`. Render the 44px toggle only
  when mobile, with `aria-controls`, dynamic expanded/name and Menu/X icons.

- [ ] **Step 4: Run header tests green**

  Run the command from Task 1. Expected: menu tests pass and existing App tests
  still pass.

- [ ] **Step 5: Commit header behavior**

  ```bash
  git add src/components/Header.tsx src/components/Header.test.tsx
  git commit -m "feat: add accessible mobile navigation"
  ```

### Task 3: Implement uniform frames and responsive panel CSS

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Move the comparison frame from `img` to `picture`**

  Replace the current image-level `aspect-ratio` rule with:

  ```css
  .carrusel .transformation-pair figure > picture {
    display: block;
    width: 100%;
    aspect-ratio: 1165 / 1040;
    overflow: hidden;
  }
  .carrusel .transformation-pair figure > picture img {
    display: block; width: 100%; height: 100%; object-fit: cover;
  }
  ```

- [ ] **Step 2: Style the compact mobile header and panel**

  At `max-width: 767px`, keep `.brand` and toggle on one header row; hide the
  desktop nav unless `data-open=true`. Define `.menu-toggle` as an explicit
  `width: 44px; height: 44px` hit target. Make opened nav absolute below the
  header with `top: 100%`, `left: 50%`, `width: 100vw`,
  `transform: translateX(-50%)`, dark surface, elevated z-index and vertically
  stacked 44px links. At `min-width: 768px`, retain existing horizontal nav and
  hide toggle.

- [ ] **Step 3: Run focused tests green**

  Run the command from Task 1. Expected: all new tests pass.

- [ ] **Step 4: Commit CSS**

  ```bash
  git add src/styles/global.css src/App.test.tsx
  git commit -m "style: unify transformation frames and mobile header"
  ```

### Task 4: Verify the integrated experience

**Files:**
- Verify only.

- [ ] **Step 1: Run full isolated suite and production build**

  ```bash
  cd /Users/sebis/Documents/ChatGPT/ae/.worktrees/codex-gallery-transformations
  npx vitest run
  npm run build
  git diff --check
  ```

- [ ] **Step 2: Visual and interaction checks in a local browser**

  At 1440 px and 768 px, confirm horizontal nav and matched comparison image
  heights. At 767 px and 390 px, confirm compact logo/toggle row, hidden panel
  is not focusable, open panel spans viewport with stacked links, Escape/link
  close works and no console/error overlay appears. Reset viewport and close the
  local server after the check.

- [ ] **Step 3: Commit the plan documentation and record final status**

  ```bash
  git add docs/superpowers/plans/2026-08-30-mobile-menu-and-transformation-frame.md
  git commit -m "docs: add mobile menu implementation plan"
  git status --short
  ```
