# Ale Espinosa Interiorismo Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, responsive editorial portfolio landing for Ale Espinosa Interiorismo, with curated work, services, process, and contact paths for WhatsApp, email, and Instagram.

**Architecture:** Use a single-page Vite + React + TypeScript application. Keep content in one typed data module and assemble the page from small presentational sections, while the contact form owns validation and submission state. Use a Formspree endpoint supplied through an environment variable for email delivery; retain WhatsApp as a dependable fallback.

**Tech Stack:** Vite, React, TypeScript, CSS, Vitest, React Testing Library, `@testing-library/user-event`, `lucide-react`, Formspree HTTP endpoint.

---

## File structure

| File | Responsibility |
| --- | --- |
| `package.json` | App, test, and build scripts plus dependencies. |
| `vite.config.ts` | Vite and Vitest test-environment configuration. |
| `src/main.tsx` | React bootstrap. |
| `src/App.tsx` | Page composition and section anchors. |
| `src/content/site.ts` | Typed content, selected project metadata, and external URLs. |
| `src/components/Header.tsx` | Desktop/mobile navigation and jump links. |
| `src/components/Hero.tsx` | Brand introduction and primary contact actions. |
| `src/components/SectionHeading.tsx` | Reusable editorial section heading. |
| `src/components/ProjectGallery.tsx` | Responsive project gallery. |
| `src/components/Services.tsx` | Three concise service cards. |
| `src/components/Process.tsx` | Three-step project process. |
| `src/components/ContactForm.tsx` | Accessible validation, Formspree submission, success/error states. |
| `src/components/Footer.tsx` | Contact links and privacy placeholder. |
| `src/styles/global.css` | Fonts, design tokens, layout, responsive states, and subtle motion. |
| `src/test/setup.ts` | DOM matchers for component tests. |
| `src/components/ContactForm.test.tsx` | Validation, success, and error regression tests. |
| `src/App.test.tsx` | Smoke tests for sections and primary external actions. |
| `.env.example` | Documented Formspree endpoint and public contact configuration. |
| `public/images/` | Approved, compressed photos exported from Ale's Instagram. |

### Task 1: Bootstrap the accessible React application

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/global.css`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Write the failing smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the Ale Espinosa Interiorismo heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /ale espinosa interiorismo/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify the baseline fails**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the Vite project and `App` module do not exist yet.

- [ ] **Step 3: Create the Vite project files and minimal app**

Create a `package.json` with `dev`, `build`, `preview`, `test`, and `test:watch` scripts. Add React, React DOM, TypeScript, Vite, Vitest, jsdom, Testing Library, `@testing-library/user-event`, and `lucide-react`. Configure Vitest with `environment: 'jsdom'`, `setupFiles: './src/test/setup.ts'`, and CSS support.

Implement the first page shell:

```tsx
export default function App() {
  return (
    <main>
      <h1>Ale Espinosa Interiorismo</h1>
    </main>
  )
}
```

Use `src/main.tsx` to render `App` inside `React.StrictMode`. Add a CSS reset using `box-sizing: border-box`, `margin: 0`, and a readable default `line-height`.

- [ ] **Step 4: Run the smoke test**

Run: `npm test -- --run src/App.test.tsx`

Expected: PASS with one passing test.

- [ ] **Step 5: Commit the bootstrap**

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.app.json vite.config.ts src
git commit -m "feat: bootstrap Ale Espinosa landing"
```

### Task 2: Define the content contract and image inventory

**Files:**
- Create: `src/content/site.ts`
- Create: `.env.example`
- Create: `public/images/README.md`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Write a failing content-driven rendering test**

```tsx
test('exposes the three approved service names', () => {
  render(<App />)
  expect(screen.getByText('Interiorismo residencial')).toBeInTheDocument()
  expect(screen.getByText('Asesoría personalizada')).toBeInTheDocument()
  expect(screen.getByText('Ejecución y acabados')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the new test**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the service content is not displayed.

- [ ] **Step 3: Add typed content and environment documentation**

Create `src/content/site.ts` with interfaces for `Project`, `Service`, and `ProcessStep`, plus these exported values:

```ts
export const contact = {
  whatsappUrl: 'https://wa.me/52XXXXXXXXXX?text=Hola%20Ale%2C%20me%20gustar%C3%ADa%20solicitar%20una%20asesor%C3%ADa.',
  instagramUrl: 'https://www.instagram.com/alejandraespinosainteriorismo/',
  email: 'pendiente@aleespinosa.mx',
}

export const services = [
  { title: 'Interiorismo residencial', description: 'Espacios funcionales que se sienten tuyos.' },
  { title: 'Asesoría personalizada', description: 'Decisiones claras para transformar tu espacio.' },
  { title: 'Ejecución y acabados', description: 'Acompañamiento atento de la idea a los detalles.' },
]

export const hero = {
  image: '/images/hero-sala-01.webp',
  alt: 'Sala residencial de Ale Espinosa Interiorismo con madera, piedra y luz natural.',
}

export const processSteps = [
  { number: '01', title: 'Conocer', description: 'Escuchamos cómo quieres vivir tu espacio.' },
  { number: '02', title: 'Diseñar', description: 'Convertimos tus ideas en una propuesta integral.' },
  { number: '03', title: 'Habitar', description: 'Cuidamos los detalles para que disfrutes el resultado.' },
]
```

Add six project records pointing to final paths such as `/images/proyecto-sala-01.webp`, each with intentional `alt` text and a project/category label. The hero has its own record and image source, for seven rendered images total. Do not scrape or hotlink Instagram assets: export only client-approved originals to `public/images/`, crop them for the layout, and encode WebP/AVIF variants before adding them. Document the expected filenames, minimum 1600px long edge, and alt-text requirement in `public/images/README.md`.

Create `.env.example`:

```dotenv
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/REPLACE_WITH_FORM_ID
VITE_CONTACT_EMAIL=hola@aleespinosa.mx
```

- [ ] **Step 4: Make the test pass with the content in `App` temporarily**

Map `services` into semantic content in `App` until Task 5 extracts the component. Keep the imported data as the single source of truth.

- [ ] **Step 5: Run the test suite**

Run: `npm test -- --run`

Expected: PASS.

- [ ] **Step 6: Commit content foundations**

```bash
git add src/content/site.ts src/App.tsx src/App.test.tsx .env.example public/images/README.md
git commit -m "feat: add landing content contract"
```

### Task 3: Build the editorial layout primitives and navigation

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/SectionHeading.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Write failing navigation and action tests**

```tsx
test('provides navigation to projects, services and contact', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /proyectos/i })).toHaveAttribute('href', '#proyectos')
  expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute('href', '#contacto')
})

test('opens WhatsApp and Instagram in a new tab', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('target', '_blank')
})
```

- [ ] **Step 2: Run the test file**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the header and external action links do not exist.

- [ ] **Step 3: Implement `Header`, `Hero`, and `SectionHeading`**

Use a semantic `header` with logo text `AE` and the full brand name, plus anchor links for `#proyectos`, `#servicios`, `#proceso`, and `#contacto`, and a clearly labelled external Instagram link. Build `Hero` using the exported `hero` record for its `<img>`, an eyebrow (`Diseño con amor`), the sole `<h1>`, a one-sentence proposition, and two actions: WhatsApp and `Ver proyectos`.

Every external `target="_blank"` link must include `rel="noreferrer"`. Give each section an explicit `id` and use `scroll-behavior: smooth` only when `prefers-reduced-motion` does not request reduced motion.

- [ ] **Step 4: Apply the base visual system**

In `global.css`, declare tokens resembling:

```css
:root {
  --paper: #f6f0e7;
  --sand: #ded0bd;
  --ink: #292721;
  --walnut: #4b372c;
  --olive: #6f7360;
  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans: 'DM Sans', Arial, sans-serif;
}
```

Load font families through an `@import` or self-hosted font declaration, establish a 12-column desktop grid, collapse it to a single column below 720px, and keep tap targets at least 44px high.

- [ ] **Step 5: Run the test file and build**

Run: `npm test -- --run src/App.test.tsx && npm run build`

Expected: tests pass and Vite produces `dist/` without TypeScript errors.

- [ ] **Step 6: Commit the editorial foundation**

```bash
git add src/components/Header.tsx src/components/Hero.tsx src/components/SectionHeading.tsx src/App.tsx src/App.test.tsx src/styles/global.css
git commit -m "feat: add editorial shell and navigation"
```

### Task 4: Create the curated projects gallery

**Files:**
- Create: `src/components/ProjectGallery.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Write a failing gallery test**

```tsx
test('renders every selected project with an accessible image label', () => {
  render(<App />)
  expect(screen.getAllByRole('img')).toHaveLength(7)
  expect(screen.getByText('Proyectos seleccionados')).toBeInTheDocument()
})
```

The count includes the hero image and the six portfolio images.

- [ ] **Step 2: Run the gallery test**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL until `ProjectGallery` maps the approved project data.

- [ ] **Step 3: Implement the responsive gallery**

Create an ordered `<ul>` of project cards. Each card contains a native, lazily loaded image and visible project/category caption. Prioritize the hero image with `fetchPriority="high"`; all gallery photos use `loading="lazy"`, fixed `width`/`height` or CSS `aspect-ratio`, and `object-fit: cover` to avoid layout shifts.

Use intentionally varied grid spans on desktop and a single readable stream on mobile. Hover lift/fade effects must be wrapped in `@media (hover: hover)` and reduced-motion users receive no transform animation.

- [ ] **Step 4: Run tests and the production build**

Run: `npm test -- --run src/App.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 5: Commit the gallery**

```bash
git add src/components/ProjectGallery.tsx src/App.tsx src/App.test.tsx src/styles/global.css
git commit -m "feat: add selected projects gallery"
```

### Task 5: Add services, process, and brand story sections

**Files:**
- Create: `src/components/Services.tsx`
- Create: `src/components/Process.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Write the failing content tests**

```tsx
test('shows the three-step process in order', () => {
  render(<App />)
  expect(screen.getByText('01')).toBeInTheDocument()
  expect(screen.getByText('Conocer')).toBeInTheDocument()
  expect(screen.getByText('Diseñar')).toBeInTheDocument()
  expect(screen.getByText('Habitar')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the process section is absent.

- [ ] **Step 3: Implement the sections**

Create one short `Sobre Ale`/manifesto block before the gallery, including a clearly labelled external Instagram link, `Services` to map the typed service data, and `Process` to map the three exported typed steps. Use `article` elements for service cards and an ordered list for the process. Keep copy focused and avoid added business claims or testimonials not supplied by Ale.

- [ ] **Step 4: Refine visual rhythm**

Use dark walnut and olive panels sparingly for contrast, retain generous vertical spacing, and prevent text lines from exceeding approximately 65 characters. Verify that heading levels progress from `h1` to `h2` without skips.

- [ ] **Step 5: Run tests and build**

Run: `npm test -- --run && npm run build`

Expected: all tests pass and `dist/` is generated.

- [ ] **Step 6: Commit the informational sections**

```bash
git add src/components/Services.tsx src/components/Process.tsx src/App.tsx src/App.test.tsx src/styles/global.css src/content/site.ts
git commit -m "feat: add services and process sections"
```

### Task 6: Implement reliable contact and footer paths

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/ContactForm.test.tsx`
- Create: `public/aviso-de-privacidad.html`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/test/setup.ts`

- [ ] **Step 1: Write failing form validation tests**

```tsx
test('shows errors for an empty submission', async () => {
  const user = userEvent.setup()
  render(<ContactForm endpoint="https://formspree.io/f/example" />)
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))
  expect(await screen.findByText(/escribe tu nombre/i)).toBeInTheDocument()
  expect(screen.getByText(/ingresa un correo válido/i)).toBeInTheDocument()
  expect(screen.getByText(/cuéntanos sobre tu espacio/i)).toBeInTheDocument()
})

test('reports a successful submission', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
  // Fill valid fields, submit, and assert the success status text.
})
```

- [ ] **Step 2: Run the contact tests**

Run: `npm test -- --run src/components/ContactForm.test.tsx`

Expected: FAIL because `ContactForm` does not exist.

- [ ] **Step 3: Implement accessible validation and submission**

Define `ContactForm` as `ContactForm({ endpoint }: { endpoint?: string })`, resolving `endpoint ?? import.meta.env.VITE_FORMSPREE_ENDPOINT` as the submission URL. This lets tests inject a fixed endpoint while production reads its configured value. Build controlled fields for `name`, `email`, and `message`, plus a visually hidden honeypot named `_gotcha`. On submit, trim input and validate a non-empty name, standard email pattern, and non-empty message. Associate errors via `aria-describedby`; announce submit success and failure using a `role="status"` region.

Send only `{ name, email, message, _gotcha }` as JSON to the resolved submission URL. Disable the submit button while pending. On failure, preserve the input and render: `No pudimos enviar tu consulta. Intenta de nuevo o escríbenos por WhatsApp.` On success, clear the fields and render a friendly confirmation.

`Footer` must expose the same WhatsApp, email, and Instagram alternatives, plus an `Aviso de privacidad` link to `/aviso-de-privacidad.html`. Create that public placeholder file with a clear title and a short notice that its legal copy must be replaced with the client-approved version before launch. The final Formspree endpoint, real inbox, WhatsApp number, anti-spam settings, and privacy notice are configuration work to complete with Ale before deployment.

- [ ] **Step 4: Make success and failure tests pass**

Add a failed-request test that mocks `fetch` with `{ ok: false }`, asserts the error status, and verifies that entered values remain in the form.

Run: `npm test -- --run src/components/ContactForm.test.tsx`

Expected: PASS for empty, success, and network-error flows.

- [ ] **Step 5: Run all tests and the production build**

Run: `npm test -- --run && npm run build`

Expected: all tests pass and build exits 0.

- [ ] **Step 6: Commit the contact experience**

```bash
git add src/components/ContactForm.tsx src/components/ContactForm.test.tsx src/components/Footer.tsx public/aviso-de-privacidad.html src/App.tsx src/styles/global.css src/test/setup.ts
git commit -m "feat: add contact form and footer actions"
```

### Task 7: Prepare final assets and verify the complete experience

**Files:**
- Create: `public/images/*.webp`
- Modify: `src/content/site.ts`
- Modify: `README.md`

- [ ] **Step 1: Add approved photos and update image data**

Obtain Ale's explicit approval for the chosen Instagram images, export the source files at their highest available resolution, then create the final compressed files named in `public/images/README.md`. Update `site.ts` with final paths, exact alt text, and project/category names. Do not include third-party photos or unapproved faces.

- [ ] **Step 2: Write a build guard test for final image metadata**

```tsx
test('project images declare meaningful alternative text', () => {
  for (const project of projects) {
    expect(project.alt.length).toBeGreaterThan(12)
    expect(project.image).toMatch(/^\/images\/.+\.(webp|avif)$/)
  }
})
```

- [ ] **Step 3: Run all automated checks**

Run: `npm test -- --run && npm run build`

Expected: all tests pass and production bundle completes.

- [ ] **Step 4: Run visual and responsive verification**

Run: `npm run dev -- --host 127.0.0.1`

Verify manually in a browser at desktop (1440px) and mobile (390px):

1. Navigation anchors land on their intended sections.
2. Hero, project images, captions, and form remain legible with no horizontal scroll.
3. WhatsApp and Instagram URLs point to the intended destinations without replacing the landing tab.
4. The form demonstrates empty validation, successful mocked/provider delivery, and failed-delivery fallback.
5. Reduced-motion preference removes nonessential motion.
6. Browser console has no errors and images do not visibly shift the layout while loading.

- [ ] **Step 5: Measure performance**

Run Lighthouse against the production preview. Target at least 90 for Performance, Accessibility, Best Practices, and SEO on the mobile audit. If a score is below target, first optimize the largest hero/project image, remove render-blocking font work, and re-test.

- [ ] **Step 6: Document local setup and configuration**

In `README.md`, document:

```bash
npm install
cp .env.example .env
npm run dev
npm test -- --run
npm run build
```

Explain the required Formspree configuration, the `VITE_FORMSPREE_ENDPOINT` value, the real contact links that must replace placeholders, and the image approval/export process.

- [ ] **Step 7: Commit final assets and verification notes**

```bash
git add public/images src/content/site.ts README.md src
git commit -m "feat: finalize Ale Espinosa portfolio landing"
```
