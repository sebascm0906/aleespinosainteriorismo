import { render, screen } from '@testing-library/react'
import Hero from './Hero'
import { hero } from '../content/site'

test('offers the hero AVIF beside its WebP fallback', () => {
  render(<Hero />)

  const image = screen.getByRole('img', { name: hero.alt })
  const media = image.closest('picture')
  const avifSource = media?.querySelector('source[type="image/avif"]')

  expect(media).toHaveClass('hero-media')
  expect(avifSource).toHaveAttribute('srcSet', hero.image.replace(/\.webp$/, '.avif'))
  expect(image).toHaveAttribute('src', hero.image)
  expect(image).toHaveAttribute('alt', hero.alt)
  expect(image).toHaveAttribute('fetchpriority', 'high')
})
