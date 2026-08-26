import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { projects } from '../src/content/site'

describe('published content contracts', () => {
  test('each project declares a descriptive WebP image path', () => {
    projects.forEach((project) => {
      expect(project.image).toMatch(/^\/images\/[a-z0-9-]+\.webp$/)
      expect(project.alt.trim().length).toBeGreaterThanOrEqual(60)
    })
  })

  test('README documents required local setup and launch blockers', () => {
    const readme = readFileSync(resolve(process.cwd(), 'README.md'), 'utf8')

    expect(readme).toContain('npm install')
    expect(readme).toContain('cp .env.example .env')
    expect(readme).toContain('npm run dev')
    expect(readme).toContain('npm test -- --run')
    expect(readme).toContain('npm run build')
    expect(readme).toMatch(/Formspree/i)
    expect(readme).toMatch(/client-approved photo/i)
    expect(readme).toMatch(/privacy copy/i)
  })
})
