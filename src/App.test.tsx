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
  expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('target', '_blank')
})
