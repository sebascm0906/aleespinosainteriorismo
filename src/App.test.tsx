import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, vi } from 'vitest'
import App from './App'
import globalCss from './styles/global.css?raw'
import { contact, navigation, sections, services, transformation, visualLanguage } from './content/site'

const approvedFillerAlt =
  'Estudio compacto con dormitorio, sala y cocina integrados, separados por un volumen de carpintería de madera clara.'
const approvedDesktopFigureImages = [
  'lenguaje-terraza-pergola',
  'lenguaje-cafe-banca',
  'lenguaje-sala-arena',
  'lenguaje-estar-vinos',
  'lenguaje-despacho-marmol',
  'lenguaje-cafe-fachada',
  'lenguaje-estudio-nogal',
  'lenguaje-cafe-barra',
  'lenguaje-recamara-estudio',
]

function mediaBlock(css: string, query: string) {
  const start = css.search(new RegExp(`@media\\s*\\(${query}\\)`))
  if (start < 0) return ''
  const opening = css.indexOf('{', start)
  if (opening < 0) return ''

  let depth = 0
  for (let i = opening; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1
    if (css[i] === '}') {
      depth -= 1
      if (depth === 0) return css.slice(start, i + 1)
    }
  }
  return ''
}

function renderedGalleryImages(gallery: HTMLElement) {
  return within(gallery.querySelector('.language-grid')!)
    .getAllByRole('img')
    .map((image) => image.getAttribute('src')?.replace('/images/', '').replace('.webp', ''))
}

function setGalleryBreakpoint(matchesThreeColumns: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === '(min-width: 768px)' ? matchesThreeColumns : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

test('encabeza con el nombre completo del estudio', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Alejandra Espinosa Interiorismo' }),
  ).toBeInTheDocument()
})

test('ofrece un enlace para saltar al contenido', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /saltar al contenido/i })).toHaveAttribute(
    'href',
    '#contenido',
  )
})

test('navega a cada sección de la página', () => {
  render(<App />)
  const nav = screen.getByRole('navigation', { name: /navegación principal/i })

  navigation.forEach((item) => {
    expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.href)
    // Cada destino de la navegación existe realmente en el documento.
    expect(document.querySelector(item.href)).not.toBeNull()
  })
})

test('lista los servicios aprobados', () => {
  render(<App />)
  const region = screen.getByRole('region', { name: sections.services.title })
  const items = within(region).getAllByRole('listitem')

  expect(items).toHaveLength(services.length)
  services.forEach((servicio, i) => {
    expect(within(items[i]).getByRole('heading', { name: servicio.title })).toBeInTheDocument()
    expect(within(items[i]).getByText(servicio.description)).toBeInTheDocument()
  })
})

test('presenta la galería como lenguaje visual y no como obra terminada', () => {
  render(<App />)
  const region = screen.getByRole('region', { name: sections.language.title })

  expect(within(region).getByText(visualLanguage.disclosure)).toBeInTheDocument()
  expect(within(region).queryByText(/proyectos seleccionados/i)).not.toBeInTheDocument()
})

test('la primera vista del carrusel conserva el par original', () => {
  render(<App />)
  const primera = transformation.cases[0]
  const vista = screen.getByRole('group', { name: 'Caso 1 de ' + transformation.cases.length })

  // Mismo par de imágenes y mismas etiquetas que antes de agregar el carrusel.
  expect(within(vista).getByRole('img', { name: primera.before.figure.alt })).toBeInTheDocument()
  expect(within(vista).getByRole('img', { name: primera.after.figure.alt })).toBeInTheDocument()
  expect(within(vista).getByText(primera.before.label)).toBeInTheDocument()
  expect(within(vista).getByText(primera.after.label)).toBeInTheDocument()
})

test('expone una vista por caso, con semántica de carrusel', () => {
  render(<App />)
  const carrusel = screen.getByRole('group', { name: transformation.title })
  expect(carrusel).toHaveAttribute('aria-roledescription', 'carousel')

  transformation.cases.forEach((_, i) => {
    const vista = screen.getByRole('group', {
      name: `Caso ${i + 1} de ${transformation.cases.length}`,
    })
    expect(vista).toHaveAttribute('aria-roledescription', 'slide')
  })
})

test('los controles cambian de vista y se deshabilitan en los extremos', async () => {
  const user = userEvent.setup()
  render(<App />)

  const anterior = screen.getByRole('button', { name: 'Caso anterior' })
  const siguiente = screen.getByRole('button', { name: 'Caso siguiente' })
  const punto = (i: number) =>
    screen.getByRole('button', { name: `Ir al caso ${i} de ${transformation.cases.length}` })

  expect(anterior).toBeDisabled()
  expect(punto(1)).toHaveAttribute('aria-current', 'true')

  await user.click(siguiente)
  expect(punto(2)).toHaveAttribute('aria-current', 'true')
  expect(anterior).toBeEnabled()

  await user.click(anterior)
  expect(punto(1)).toHaveAttribute('aria-current', 'true')

  // Ir directo al último por su indicador deja deshabilitado el botón de avance.
  await user.click(punto(transformation.cases.length))
  expect(siguiente).toBeDisabled()
})

test('la galería conserva su aviso de imágenes conceptuales', () => {
  render(<App />)
  const galeria = screen.getByRole('region', { name: sections.language.title })
  expect(within(galeria).getByText(visualLanguage.disclosure)).toBeInTheDocument()
})

test('en móvil completa la quinta fila con el décimo lenguaje aprobado', () => {
  setGalleryBreakpoint(false)
  render(<App />)

  const galeria = screen.getByRole('region', { name: sections.language.title })
  const tarjetas = within(galeria.querySelector('.language-grid')!).getAllByRole('listitem')

  expect(tarjetas).toHaveLength(10)
  expect(renderedGalleryImages(galeria)).toEqual([
    ...approvedDesktopFigureImages,
    'lenguaje-departamento-integrado',
  ])
  const filler = within(tarjetas[9]).getByRole('img', { name: approvedFillerAlt })
  expect(filler).toHaveAttribute('src', expect.stringContaining('lenguaje-departamento-integrado.webp'))
})

test('desde 768 px conserva nueve lenguajes y omite el relleno móvil', () => {
  setGalleryBreakpoint(true)
  render(<App />)

  const galeria = screen.getByRole('region', { name: sections.language.title })
  const tarjetas = within(galeria.querySelector('.language-grid')!).getAllByRole('listitem')

  expect(tarjetas).toHaveLength(9)
  expect(approvedDesktopFigureImages).toHaveLength(9)
  expect(renderedGalleryImages(galeria)).toEqual(approvedDesktopFigureImages)
  expect(within(galeria).queryByRole('img', { name: approvedFillerAlt })).not.toBeInTheDocument()
})

test('cada imagen de contenido reserva su espacio y difiere la carga salvo el LCP', () => {
  render(<App />)
  const imagenes = screen.getAllByRole('img')
  expect(imagenes.length).toBeGreaterThan(visualLanguage.figures.length)

  const conAncho = imagenes.filter((img) => img.hasAttribute('width'))
  conAncho.forEach((img) => {
    expect(img).toHaveAttribute('height')
    expect(Number(img.getAttribute('width'))).toBeGreaterThan(0)
  })

  const diferidas = imagenes.filter((img) => img.getAttribute('loading') === 'lazy')
  expect(diferidas.length).toBeGreaterThan(0)
  expect(imagenes.filter((img) => img.getAttribute('fetchpriority') === 'high').length).toBeLessThanOrEqual(2)
})

test('sirve cada imagen como AVIF con respaldo WebP', () => {
  render(<App />)

  visualLanguage.figures.forEach((figura) => {
    const img = screen.getByRole('img', { name: figura.alt })
    const picture = img.closest('picture')
    const avif = picture?.querySelector('source[type="image/avif"]')
    const webp = picture?.querySelector('source[type="image/webp"]')

    expect(avif?.getAttribute('srcset')).toContain(`/images/${figura.image}.avif`)
    expect(avif?.getAttribute('srcset')).toContain(`/images/${figura.image}-640.avif`)
    expect(webp?.getAttribute('srcset')).toContain(`/images/${figura.image}.webp`)
    expect(avif).toHaveAttribute('sizes')
  })
})

test('mantiene el contrato visual de los marcos de comparación y del panel móvil', () => {
  const css = globalCss
  const mobileCss = mediaBlock(css, 'max-width:\\s*767px')
  const desktopCss = mediaBlock(css, 'min-width:\\s*768px')

  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture[^{}]*\{[^}]*aspect-ratio:\s*1165 \/ 1040/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture[^{}]*\{[^}]*display:\s*block/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture[^{}]*\{[^}]*width:\s*100%/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture[^{}]*\{[^}]*height:\s*100%/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture[^{}]*\{[^}]*overflow:\s*hidden/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture img[^{}]*\{[^}]*display:\s*block/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture img[^{}]*\{[^}]*width:\s*100%/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture img[^{}]*\{[^}]*height:\s*100%/)
  expect(css).toMatch(/\.carrusel \.transformation-pair figure > picture img[^{}]*\{[^}]*object-fit:\s*cover/)
  expect(mobileCss).toMatch(/\.mobile-navigation[^{}]*\{[^}]*position:\s*absolute[^}]*top:\s*100%[^}]*left:\s*50%[^}]*width:\s*100vw[^}]*transform:\s*translateX\(-50%\)/)
  expect(desktopCss).toMatch(/\.mobile-navigation[^{}]*\{[^}]*position:\s*(?:static|relative|initial|unset)/)
  expect(css).toMatch(/\.menu-toggle[^{}]*\{[^}]*width:\s*44px[^}]*height:\s*44px/)
})

test('abre y cierra el visor con teclado y devuelve el foco al disparador', async () => {
  const user = userEvent.setup()
  render(<App />)

  const [primera, segunda] = visualLanguage.figures
  const disparador = screen.getByRole('button', { name: `Ampliar imagen: ${primera.alt}` })

  await user.click(disparador)
  const dialogo = screen.getByRole('dialog')
  expect(dialogo).toHaveAttribute('aria-modal', 'true')
  expect(within(dialogo).getByRole('button', { name: /cerrar el visor/i })).toHaveFocus()

  await user.keyboard('{ArrowRight}')
  expect(screen.getByRole('dialog')).toHaveAccessibleName(
    `Imagen 2 de ${visualLanguage.figures.length}`,
  )

  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

  // El foco vuelve a la imagen que se estaba viendo, no a la que abrió el visor.
  // Si navegaste hasta la segunda, quedarte en la primera te haría perder el lugar
  // en la retícula. Es lo que hace cualquier visor de fotos.
  expect(screen.getByRole('button', { name: `Ampliar imagen: ${segunda.alt}` })).toHaveFocus()
})

test('el botón flotante de WhatsApp lleva etiqueta explícita y mensaje precargado', () => {
  render(<App />)
  const boton = screen.getByRole('link', { name: contact.whatsappLabel })

  expect(boton).toHaveClass('floating-whatsapp')
  expect(boton).toHaveAttribute('href', contact.whatsappUrl)
  expect(boton).toHaveAttribute('target', '_blank')
})

test('abre WhatsApp e Instagram en pestaña nueva', () => {
  render(<App />)

  const externos = [
    ...screen.getAllByRole('link', { name: /whatsapp/i }),
    ...screen.getAllByRole('link', { name: /instagram|proceso en instagram/i }),
  ]
  externos.forEach((enlace) => {
    expect(enlace).toHaveAttribute('target', '_blank')
    expect(enlace).toHaveAttribute('rel', 'noreferrer')
  })
})

test('ofrece formulario y alternativas en el pie', () => {
  render(<App />)

  expect(screen.getByRole('form', { name: /envíanos tu consulta/i })).toBeInTheDocument()

  const pie = screen.getByRole('contentinfo')
  expect(within(pie).getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
    'href',
    contact.whatsappUrl,
  )
  expect(within(pie).getByRole('link', { name: /correo/i })).toHaveAttribute(
    'href',
    `mailto:${contact.email}`,
  )
  expect(within(pie).getByRole('link', { name: /aviso de privacidad/i })).toHaveAttribute(
    'href',
    '/aviso-de-privacidad.html',
  )
})
