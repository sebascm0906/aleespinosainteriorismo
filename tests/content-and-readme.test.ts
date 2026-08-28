import { readFileSync } from 'node:fs'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { contact, hero, studio, transformation, visualLanguage } from '../src/content/site'

const figuras = [hero.figure, visualLanguage.fullBleed, ...visualLanguage.figures,
                 ...transformation.cases.flatMap((c) => [c.before.figure, c.after.figure]),
                 ...(studio.portrait ? [studio.portrait] : [])]

describe('contrato de imágenes', () => {
  test.each(figuras)('$image declara alt descriptivo y dimensiones reales', (figura) => {
    expect(figura.image).toMatch(/^[a-z0-9-]+$/)
    // El umbral era 60, pero la clienta pidió un pie más corto para la cafetería
    // y ese string se muestra en pantalla además de servir como alt. 40 sigue
    // descartando alts vacíos o de una palabra.
    expect(figura.alt.trim().length).toBeGreaterThanOrEqual(40)
    // El alt describe el espacio, no el archivo.
    expect(figura.alt).not.toMatch(/imagen de|foto de|\.webp|\.avif/i)
    expect(figura.width).toBeGreaterThan(0)
    expect(figura.height).toBeGreaterThan(0)
  })

  test.each(figuras)('$image tiene en disco cada archivo que anuncia su srcset', (figura) => {
    const base = resolve(process.cwd(), 'public/images')
    // La variante -640 sólo se genera, y sólo se anuncia, si la imagen es más
    // ancha que 640. Exigirla siempre haría fallar a las que ya nacen pequeñas.
    const esperados = [`${figura.image}.avif`, `${figura.image}.webp`]
    if (figura.width > 640) {
      esperados.push(`${figura.image}-640.avif`, `${figura.image}-640.webp`)
    }
    for (const nombre of esperados) {
      expect(existsSync(resolve(base, nombre)), `falta ${nombre}`).toBe(true)
    }
  })
})

describe('honestidad del contenido', () => {
  test('la galería declara que son conceptos, no obra ejecutada', () => {
    expect(visualLanguage.disclosure).toMatch(/concepto/i)
  })

  test('cada caso abre con Antes y cierra con un rótulo válido', () => {
    transformation.cases.forEach((caso) => {
      expect(caso.before.label).toBe('Antes')
      // "Después" sólo si es obra terminada; "Propuesta" si es render. Cualquier
      // otro rótulo se escapó de la revisión de contenido.
      expect(['Después', 'Propuesta']).toContain(caso.after.label)
    })
    expect(visualLanguage.disclosure.trim().length).toBeGreaterThan(0)
  })

  test('el caso de la terraza se rotula como propuesta, no como obra', () => {
    // Su segunda imagen es un render. Rotularla "Después" afirmaría que se construyó.
    const terraza = transformation.cases.find((c) => c.id === 'terraza')
    expect(terraza?.after.label).toBe('Propuesta')
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
