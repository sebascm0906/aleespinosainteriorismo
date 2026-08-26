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
