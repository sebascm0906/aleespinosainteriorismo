import { readFileSync } from 'node:fs'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { contact, hero, transformation, visualLanguage } from '../src/content/site'

const figuras = [hero.figure, visualLanguage.fullBleed, ...visualLanguage.figures,
                 transformation.before.figure, transformation.after.figure]

describe('contrato de imágenes', () => {
  test.each(figuras)('$image declara alt descriptivo y dimensiones reales', (figura) => {
    expect(figura.image).toMatch(/^[a-z0-9-]+$/)
    expect(figura.alt.trim().length).toBeGreaterThanOrEqual(60)
    // El alt describe el espacio, no el archivo.
    expect(figura.alt).not.toMatch(/imagen de|foto de|\.webp|\.avif/i)
    expect(figura.width).toBeGreaterThan(0)
    expect(figura.height).toBeGreaterThan(0)
  })

  test.each(figuras)('$image tiene los cuatro archivos del par AVIF+WebP', (figura) => {
    const base = resolve(process.cwd(), 'public/images')
    for (const nombre of [
      `${figura.image}.avif`,
      `${figura.image}.webp`,
      `${figura.image}-640.avif`,
      `${figura.image}-640.webp`,
    ]) {
      expect(existsSync(resolve(base, nombre)), `falta ${nombre}`).toBe(true)
    }
  })
})

describe('honestidad del contenido', () => {
  test('la galería declara que son imágenes conceptuales', () => {
    expect(visualLanguage.disclosure).toMatch(/conceptual/i)
  })

  test('el par no se rotula como obra terminada', () => {
    // La segunda imagen es un render, no fotografía de obra: "Después" afirmaría
    // que el proyecto se construyó.
    expect(transformation.after.label).toBe('Propuesta')
    expect(transformation.after.label).not.toMatch(/despu[eé]s/i)
  })

  test('no se afirman cifras, premios ni años de experiencia', () => {
    const fuente = readFileSync(resolve(process.cwd(), 'src/content/site.ts'), 'utf8')
    const cuerpo = fuente.slice(fuente.indexOf('export const hero'))
    expect(cuerpo).not.toMatch(/\b\d+\s*(años|proyectos|clientes|premios)\b/i)
  })
})

describe('datos de contacto', () => {
  test('el WhatsApp usa wa.me con lada 52 y mensaje precargado', () => {
    expect(contact.whatsappNumber).toMatch(/^52\d{10}$/)
    expect(contact.whatsappUrl).toMatch(
      new RegExp(`^https://wa\\.me/${contact.whatsappNumber}\\?text=.+`),
    )
    // El mensaje va urlencoded: sin espacios crudos y con al menos un escape.
    expect(contact.whatsappUrl).not.toContain(' ')
    expect(contact.whatsappUrl).toMatch(/%[0-9A-F]{2}/)
    expect(decodeURIComponent(contact.whatsappUrl.split('?text=')[1])).toBe(contact.whatsappMessage)
  })
})

describe('README', () => {
  const readme = readFileSync(resolve(process.cwd(), 'README.md'), 'utf8')

  test('documenta instalación y comandos', () => {
    for (const fragmento of ['npm install', 'cp .env.example .env', 'npm run dev',
                             'npm test -- --run', 'npm run build']) {
      expect(readme).toContain(fragmento)
    }
  })

  test('conserva los bloqueadores de lanzamiento', () => {
    expect(readme).toMatch(/Formspree/i)
    expect(readme).toMatch(/aviso de privacidad/i)
    expect(readme).toMatch(/render/i)
    expect(readme).toMatch(/vector/i)
  })
})
