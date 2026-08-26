import { render, screen } from '@testing-library/react'
import App from './App'

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

test('provides navigation to projects, services and contact', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /proyectos/i })).toHaveAttribute('href', '#proyectos')
  expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute('href', '#contacto')
})

test('opens WhatsApp and Instagram in a new tab', () => {
  render(<App />)
  const whatsappLink = screen.getByRole('link', { name: /whatsapp/i })
  const instagramLink = screen.getByRole('link', { name: /instagram/i })

  expect(whatsappLink).toHaveAttribute('target', '_blank')
  expect(whatsappLink).toHaveAttribute('rel', 'noreferrer')
  expect(instagramLink).toHaveAttribute('target', '_blank')
  expect(instagramLink).toHaveAttribute('rel', 'noreferrer')
})
