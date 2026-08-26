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
