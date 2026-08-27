import { render, screen } from '@testing-library/react'
import Hero from './Hero'
import { hero } from '../content/site'

test('sirve el hero en AVIF con respaldo WebP y prioridad de carga', () => {
  render(<Hero />)

  const imagen = screen.getByRole('img', { name: hero.figure.alt })
  const picture = imagen.closest('picture')

  expect(picture?.querySelector('source[type="image/avif"]')).toHaveAttribute(
    'srcset',
    expect.stringContaining(`/images/${hero.figure.image}.avif`),
  )
  expect(picture?.querySelector('source[type="image/webp"]')).toBeTruthy()
  expect(imagen).toHaveAttribute('src', `/images/${hero.figure.image}.webp`)
  expect(imagen).toHaveAttribute('fetchpriority', 'high')
  expect(imagen).toHaveAttribute('loading', 'eager')
})

test('reserva la proporción del hero para no mover el layout', () => {
  render(<Hero />)

  const imagen = screen.getByRole('img', { name: hero.figure.alt })
  expect(imagen).toHaveAttribute('width', String(hero.figure.width))
  expect(imagen).toHaveAttribute('height', String(hero.figure.height))
  expect(imagen.style.aspectRatio).toBe(`${hero.figure.width} / ${hero.figure.height}`)
})

test('el monograma es el h1 accesible', () => {
  render(<Hero />)
  expect(screen.getByRole('heading', { level: 1, name: hero.title })).toBeInTheDocument()
})
