import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { contact, hero, studio, transformation, visualLanguage } from '../src/content/site'

const figuras = [hero.figure, visualLanguage.fullBleed, visualLanguage.fillerDosColumnas,
                 ...visualLanguage.figures,
                 ...transformation.cases.flatMap((c) => [c.before.figure, c.after.figure]),
                 ...(studio.portrait ? [studio.portrait] : [])]

function declarationsForSelector(css: string, target: string) {
  const declarations = new Map<string, string>()
  const rules = css.matchAll(/([^{}]+)\{([^{}]*)\}/g)

  for (const [, rawSelectors, rawDeclarations] of rules) {
    const selectors = rawSelectors
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split(',')
      .map((selector) => selector.trim())
    if (!selectors.includes(target)) continue

    for (const [, property, value] of rawDeclarations.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)) {
      declarations.set(property, value.trim())
    }
  }

  return declarations
}

function justifiedSelectors(css: string) {
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, , declarations]) => /text-align\s*:\s*justify\s*;/.test(declarations))
    .flatMap(([, rawSelectors]) => rawSelectors
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split(',')
      .map((selector) => selector.trim())
      .filter(Boolean))
}

function blockAt(css: string, start: number) {
  const openBrace = css.indexOf('{', start)
  if (start < 0 || openBrace < 0) return undefined

  let depth = 0
  for (let index = openBrace; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1
    if (css[index] === '}') depth -= 1
    if (depth === 0) return css.slice(start, index + 1)
  }

  return undefined
}

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

  test('sustituye los activos del caso sala y retira la foto de obra', () => {
    const base = resolve(process.cwd(), 'public/images')
    const nuevosActivos = ['transformacion-4-despues', 'transformacion-4-sala-terminada']
    const retirados = ['transformacion-4-antes.avif', 'transformacion-4-antes.webp',
      'transformacion-4-antes-640.avif', 'transformacion-4-antes-640.webp']

    nuevosActivos.forEach((image) => {
      for (const extension of ['avif', 'webp']) {
        expect(existsSync(resolve(base, `${image}.${extension}`)), `falta ${image}.${extension}`).toBe(true)
        expect(existsSync(resolve(base, `${image}-640.${extension}`)), `falta ${image}-640.${extension}`).toBe(true)
      }
    })
    retirados.forEach((image) => {
      expect(existsSync(resolve(base, image)), `${image} ya no debe publicarse`).toBe(false)
    })
  })

  test('no conserva el identificador retirado de sala en el código publicado', () => {
    const sourceRoot = resolve(process.cwd(), 'src')
    const sourceFiles = readdirSync(sourceRoot, { recursive: true })
      .filter((file) => /\.(ts|tsx)$/.test(file))
      .filter((file) => !file.split('/').includes('test') && !/\.test\.(ts|tsx)$/.test(file))
      .map((file) => join(sourceRoot, file))

    sourceFiles.forEach((file) => {
      expect(readFileSync(file, 'utf8'), file).not.toContain('transformacion-4-antes')
    })
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

  test('el caso sala usa el espacio vacío como Antes y la sala terminada como Después', () => {
    const sala = transformation.cases.find(({ id }) => id === 'sala')

    expect(sala).toMatchObject({
      before: {
        figure: {
          image: 'transformacion-4-despues',
          alt: 'Sala vacía con piso de madera, ventanal corrido y balcón con vista arbolada.',
        },
        label: 'Antes',
      },
      after: {
        figure: {
          image: 'transformacion-4-sala-terminada',
          alt: 'Sala y comedor terminados frente al ventanal, con panel de madera, sofá claro y mesa para seis.',
        },
        label: 'Después',
      },
    })
  })

  test('la galería declara la naturaleza de las imágenes', () => {
    // Los cinco casos dicen "Después" por decisión de la clienta, incluido el de
    // la terraza, cuya segunda imagen es un render. Con eso, el aviso de la
    // galería es lo único que distingue concepto de obra construida: si alguien
    // lo vacía, esta prueba lo detiene.
    expect(visualLanguage.disclosure).toMatch(/concepto/i)
    expect(visualLanguage.disclosure.trim().length).toBeGreaterThan(20)
  })

  test('no se afirman cifras, premios ni años de experiencia', () => {
    const fuente = readFileSync(resolve(process.cwd(), 'src/content/site.ts'), 'utf8')
    const cuerpo = fuente.slice(fuente.indexOf('export const hero'))
    expect(cuerpo).not.toMatch(/\b\d+\s*(años|proyectos|clientes|premios)\b/i)
  })
})

describe('tipografía de texto corrido', () => {
  test('justifica y parte palabras en cada selector aprobado de texto corrido', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')
    const requiredSelectors = [
      '.philosophy-body p',
      '.studio-body p:not(.studio-role)',
      '.services-list p',
      '.contact-copy p',
      '.section-heading > p:not(.eyebrow)',
      '.disclosure',
      '.field-error',
      '.contact-error-summary',
      '.contact-status',
    ]

    for (const selector of requiredSelectors) {
      const declarations = declarationsForSelector(css, selector)
      expect(declarations.get('text-align')).toBe('justify')
      expect(declarations.get('hyphens')).toBe('auto')
    }

    const forbiddenSelector = /(^|[\s>+~])(nav|h1|h2|h3|button|label|figcaption)\b|\.eyebrow\b(?!\))/
    expect(justifiedSelectors(css).filter((selector) => forbiddenSelector.test(selector))).toEqual([])
  })
})

describe('retícula de lenguaje visual', () => {
  test('usa tres columnas por defecto y dos dentro del media query móvil literal', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')
    const mobileBlock = blockAt(css, css.indexOf('@media (max-width: 767px)'))

    expect(mobileBlock).toBeDefined()
    expect(declarationsForSelector(mobileBlock!, '.language-grid').get('grid-template-columns'))
      .toBe('repeat(2, minmax(0, 1fr))')

    const cssWithoutMobileBlock = css.replace(mobileBlock!, '')
    expect(declarationsForSelector(cssWithoutMobileBlock, '.language-grid').get('grid-template-columns'))
      .toBe('repeat(3, minmax(0, 1fr))')
    expect(cssWithoutMobileBlock).not.toMatch(
      /\.language-grid\s*\{[^}]*grid-template-columns\s*:\s*repeat\(2, minmax\(0, 1fr\)\)/,
    )
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
