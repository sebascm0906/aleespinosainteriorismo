import { render, screen, within } from '@testing-library/react'
import App from './App'
import { contact, processSteps, projects, services } from './content/site'

test('renders the Ale Espinosa Interiorismo heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /ale espinosa interiorismo/i })).toBeInTheDocument()
})

test('renders the approved services as a semantic collection of cards', () => {
  render(<App />)
  const servicesSection = screen.getByRole('region', { name: 'Servicios' })
  const serviceList = within(servicesSection).getByRole('list')
  const serviceItems = within(serviceList).getAllByRole('listitem')

  expect(serviceList.tagName).toBe('UL')
  expect(serviceItems).toHaveLength(services.length)

  services.forEach((service, index) => {
    const card = within(serviceItems[index]).getByRole('article')

    expect(within(card).getByRole('heading', { name: service.title })).toBeInTheDocument()
    expect(within(card).getByText(service.description)).toBeInTheDocument()
  })
})

test('renders the exported process steps in order as an ordered list', () => {
  render(<App />)
  const processSection = screen.getByRole('region', { name: 'Proceso' })
  const processList = within(processSection).getByRole('list')
  const processItems = within(processList).getAllByRole('listitem')

  expect(processList.tagName).toBe('OL')
  expect(processItems).toHaveLength(processSteps.length)

  processSteps.forEach((step, index) => {
    const processItem = within(processItems[index])

    expect(processItem.getByText(step.number)).toBeInTheDocument()
    expect(processItem.getByRole('heading', { name: step.title })).toBeInTheDocument()
    expect(processItem.getByText(step.description)).toBeInTheDocument()
  })
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
  const whatsappLinks = screen.getAllByRole('link', { name: /whatsapp/i })
  const instagramLinks = screen.getAllByRole('link', { name: /instagram/i })

  whatsappLinks.forEach((whatsappLink) => {
    expect(whatsappLink).toHaveAttribute('target', '_blank')
    expect(whatsappLink).toHaveAttribute('rel', 'noreferrer')
  })
  instagramLinks.forEach((instagramLink) => {
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noreferrer')
  })
})

test('provides a contact form and footer alternatives', () => {
  render(<App />)

  expect(screen.getByRole('form', { name: /envíanos tu consulta/i })).toBeInTheDocument()

  const footer = screen.getByRole('contentinfo')
  expect(within(footer).getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
    'href',
    contact.whatsappUrl,
  )
  expect(within(footer).getByRole('link', { name: /correo/i })).toHaveAttribute(
    'href',
    `mailto:${contact.email}`,
  )
  expect(within(footer).getByRole('link', { name: /instagram/i })).toHaveAttribute(
    'href',
    contact.instagramUrl,
  )
  expect(within(footer).getByRole('link', { name: /aviso de privacidad/i })).toHaveAttribute(
    'href',
    '/aviso-de-privacidad.html',
  )
})
