import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'

/**
 * Contratos de calidad.
 *
 * Estas pruebas verifican invariantes, no literales de CSS. La versión anterior
 * afirmaba valores exactos (`grid-column: 8 / -1`, `clamp(3rem, 4.8vw, 5.25rem)`),
 * lo que rompía la suite ante cualquier ajuste visual legítimo sin detectar ni un
 * solo defecto real.
 */

const css = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')

function bloque(selector: string): string {
  const escapado = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const encontrado = css.match(new RegExp(`${escapado}\\s*\\{([^}]*)\\}`, 'g'))
  expect(encontrado, `no existe la regla ${selector}`).not.toBeNull()
  return encontrado!.join('\n')
}

function token(nombre: string): string {
  const m = css.match(new RegExp(`--${nombre}:\\s*(#[0-9a-fA-F]{3,8})`))
  expect(m, `falta el token --${nombre}`).not.toBeNull()
  return m![1]
}

function luminancia(hex: string): number {
  const h = hex.replace('#', '')
  const canales = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const lineal = canales.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * lineal[0] + 0.7152 * lineal[1] + 0.0722 * lineal[2]
}

function contraste(a: string, b: string): number {
  const [x, y] = [luminancia(a), luminancia(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

describe('contraste de la paleta', () => {
  const pares: Array<[string, string, number, string]> = [
    ['hueso', 'tinta', 4.5, 'texto de cuerpo sobre el fondo dominante'],
    ['humo', 'tinta', 4.5, 'texto secundario sobre el fondo dominante'],
    ['laton', 'tinta', 4.5, 'versalitas de acento sobre el fondo dominante'],
    ['laton-luz', 'tinta', 3, 'filete de luz sobre el fondo dominante'],
    ['hueso', 'nogal', 4.5, 'texto sobre superficie elevada'],
    ['laton', 'nogal', 3, 'filete sobre superficie elevada'],
    ['tinta', 'hueso', 4.5, 'texto de la sección invertida'],
    ['laton-hondo', 'hueso', 4.5, 'acento de la sección invertida'],
  ]

  test.each(pares)('%s sobre %s cumple %d:1 — %s', (frente, fondo, minimo) => {
    expect(contraste(token(frente), token(fondo))).toBeGreaterThanOrEqual(minimo)
  })

  test('el latón normal NO se usa como texto sobre hueso', () => {
    // Da 2.47:1. Existe --laton-hondo precisamente por esto; si alguien borra ese
    // token y reutiliza --laton en la sección clara, esta prueba lo delata.
    expect(contraste(token('laton'), token('hueso'))).toBeLessThan(4.5)
    expect(bloque('.studio-section .eyebrow')).toContain('--laton-hondo')
  })
})

describe('acción flotante de WhatsApp', () => {
  const regla = bloque('.floating-whatsapp')

  test('queda fija en la esquina inferior derecha', () => {
    expect(regla).toMatch(/position:\s*fixed/)
    expect(regla).toMatch(/right:/)
    expect(regla).toMatch(/bottom:/)
  })

  test('respeta el área segura de iOS', () => {
    expect(regla).toMatch(/env\(safe-area-inset-bottom\)/)
    expect(regla).toMatch(/env\(safe-area-inset-right\)/)
  })

  test('mide al menos 56 px por lado', () => {
    const lados = [...regla.matchAll(/(?:width|height):\s*(\d+)px/g)].map((m) => Number(m[1]))
    expect(lados.length).toBeGreaterThanOrEqual(2)
    lados.forEach((lado) => expect(lado).toBeGreaterThanOrEqual(56))
  })
})

describe('bases de accesibilidad y layout', () => {
  test('no hay scroll horizontal a 320 px', () => {
    const cuerpo = bloque('body')
    expect(cuerpo).toMatch(/min-width:\s*320px/)
    expect(cuerpo).toMatch(/overflow-x:\s*hidden/)
  })

  test('el foco es siempre visible y no se elimina sin reemplazo', () => {
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*2px solid/)
    expect(css).not.toMatch(/outline:\s*(none|0)\s*;(?![^]*outline:)/)
  })

  test('existe el enlace para saltar al contenido', () => {
    expect(bloque('.skip-link')).toMatch(/position:\s*absolute/)
    expect(css).toMatch(/\.skip-link:focus-visible/)
  })

  test('se respeta prefers-reduced-motion', () => {
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
    const reduce = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'))
    expect(reduce).toMatch(/transition-duration:\s*0\.01ms/)
    // El swash queda dibujado en vez de quedarse invisible.
    expect(reduce).toMatch(/stroke-dashoffset:\s*0/)
  })

  test('el movimiento sólo anima propiedades baratas', () => {
    const permitidas =
      /^(opacity|transform|stroke-dashoffset|color|background|border-color|visibility)$/
    const transiciones = [...css.matchAll(/transition:\s*([^;]+);/g)].map((m) => m[1])

    transiciones.forEach((declaracion) => {
      // Las comas dentro de cubic-bezier(...) no separan capas: se quitan antes.
      declaracion
        .replace(/\([^)]*\)/g, '')
        .split(',')
        .map((capa) => capa.trim().split(/\s+/)[0])
        .filter(Boolean)
        .forEach((propiedad) => expect(propiedad).toMatch(permitidas))
    })
  })
})
