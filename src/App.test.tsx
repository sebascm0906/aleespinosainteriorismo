import { render, screen, within } from '@testing-library/react'
import App from './App'
import { projects } from './content/site'

test('renders the Ale Espinosa Interiorismo heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /ale espinosa interiorismo/i })).toBeInTheDocument()
})

test('exposes the three approved service names', () => {
  render(<App />)
  expect(screen.getByText('Interiorismo residencial')).toBeInTheDocument()
  expect(screen.getByText('Asesoría personalizada')).toBeInTheDocument()
  expect(screen.getByText('Ejecución y acabados')).toBeInTheDocument()
})

test('shows the three-step process in order', () => {
  render(<App />)
  expect(screen.getByText('01')).toBeInTheDocument()
  expect(screen.getByText('Conocer')).toBeInTheDocument()
  expect(screen.getByText('Diseñar')).toBeInTheDocument()
  expect(screen.getByText('Habitar')).toBeInTheDocument()
})

test('provides navigation to projects, services and contact', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /proyectos/i })).toHaveAttribute('href', '#proyectos')
  expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute('href', '#contacto')
})

test('renders every selected project with its responsive, accessible image', () => {
  render(<App />)
  expect(screen.getAllByRole('img')).toHaveLength(7)
  expect(screen.getByText('Proyectos seleccionados')).toBeInTheDocument()

  const projectsSection = screen.getByRole('region', { name: 'Proyectos seleccionados' })
  expect(within(projectsSection).getAllByRole('listitem')).toHaveLength(projects.length)

  projects.forEach((project) => {
    const image = screen.getByRole('img', { name: project.alt })

    expect(image).toHaveAttribute('src', project.image)
    expect(image).toHaveAttribute('alt', project.alt)
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image.closest('picture')?.querySelector('source[type="image/avif"]')).toHaveAttribute(
      'srcset',
      project.image.replace(/\.webp$/, '.avif'),
    )
  })
})

test('opens WhatsApp and Instagram in a new tab', () => {
  render(<App />)
  const whatsappLink = screen.getByRole('link', { name: /whatsapp/i })
  const instagramLinks = screen.getAllByRole('link', { name: /instagram/i })

  expect(whatsappLink).toHaveAttribute('target', '_blank')
  expect(whatsappLink).toHaveAttribute('rel', 'noreferrer')
  instagramLinks.forEach((instagramLink) => {
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noreferrer')
  })
})
