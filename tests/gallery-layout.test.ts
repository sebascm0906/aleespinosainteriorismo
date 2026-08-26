import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'

test('styles project image frames as 4:3 cover crops', () => {
  const styles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')

  expect(styles).toMatch(
    /\.project-image-frame\s*\{[^}]*display:\s*block;[^}]*aspect-ratio:\s*4\s*\/\s*3;[^}]*overflow:\s*hidden;[^}]*\}/s,
  )
  expect(styles).toMatch(
    /\.project-image\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*object-fit:\s*cover;[^}]*\}/s,
  )
})

test('lays out the hero picture wrapper and lets its image fill the frame', () => {
  const styles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')

  expect(styles).toMatch(/\.hero-media\s*\{[^}]*grid-column:\s*8\s*\/\s*-1;[^}]*\}/s)
  expect(styles).toMatch(
    /\.hero-media\s+\.hero-image\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*min-height:\s*32rem;[^}]*object-fit:\s*cover;[^}]*\}/s,
  )
  expect(styles).toMatch(
    /@media\s*\(max-width:\s*719px\)\s*\{[\s\S]*?\.brand,[\s\S]*?\.hero-media,[\s\S]*?\.project-carousel\s*\{[^}]*grid-column:\s*1;[^}]*\}/,
  )
})

test('keeps the uppercase hero name within its text column', () => {
  const styles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')

  expect(styles).toMatch(
    /h1\s*\{[^}]*max-width:\s*100%;[^}]*font-size:\s*clamp\(3rem,\s*4\.8vw,\s*5\.25rem\);[^}]*overflow-wrap:\s*anywhere;[^}]*\}/s,
  )
})

test('places the floating WhatsApp action in the bottom-right corner', () => {
  const styles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')

  expect(styles).toMatch(
    /\.floating-whatsapp\s*\{[^}]*position:\s*fixed;[^}]*right:\s*1\.25rem;[^}]*bottom:\s*1\.25rem;[^}]*\}/s,
  )
})
