import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ContactForm from './ContactForm'

const endpoint = 'https://formspree.io/f/example'

test('shows errors for an empty submission', async () => {
  const user = userEvent.setup()
  render(<ContactForm endpoint={endpoint} />)

  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))

  expect(await screen.findByText(/escribe tu nombre/i)).toBeInTheDocument()
  expect(screen.getByText(/ingresa un correo válido/i)).toBeInTheDocument()
  expect(screen.getByText(/cuéntanos sobre tu espacio/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/nombre/i)).toHaveAttribute('aria-describedby', 'name-error')
  expect(screen.getByLabelText(/correo/i)).toHaveAttribute('aria-describedby', 'email-error')
  expect(screen.getByLabelText(/mensaje/i)).toHaveAttribute('aria-describedby', 'message-error')
})

test('submits valid details and clears the form after success', async () => {
  const user = userEvent.setup()
  const fetchMock = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', fetchMock)
  render(<ContactForm endpoint={endpoint} />)

  await user.type(screen.getByLabelText(/nombre/i), ' Ale Espinosa ')
  await user.type(screen.getByLabelText(/correo/i), 'ale@example.com')
  await user.type(screen.getByLabelText(/mensaje/i), ' Quiero renovar mi sala. ')
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))

  expect(await screen.findByRole('status')).toHaveTextContent(/gracias por escribirnos/i)
  expect(fetchMock).toHaveBeenCalledWith(
    endpoint,
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ale Espinosa',
        email: 'ale@example.com',
        message: 'Quiero renovar mi sala.',
        _gotcha: '',
      }),
    }),
  )
  expect(screen.getByLabelText(/nombre/i)).toHaveValue('')
  expect(screen.getByLabelText(/correo/i)).toHaveValue('')
  expect(screen.getByLabelText(/mensaje/i)).toHaveValue('')
})

test('preserves entered details when the request fails', async () => {
  const user = userEvent.setup()
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
  render(<ContactForm endpoint={endpoint} />)

  await user.type(screen.getByLabelText(/nombre/i), 'Ale Espinosa')
  await user.type(screen.getByLabelText(/correo/i), 'ale@example.com')
  await user.type(screen.getByLabelText(/mensaje/i), 'Quiero renovar mi sala.')
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))

  expect(await screen.findByRole('status')).toHaveTextContent(
    'No pudimos enviar tu consulta. Intenta de nuevo o escríbenos por WhatsApp.',
  )
  expect(screen.getByLabelText(/nombre/i)).toHaveValue('Ale Espinosa')
  expect(screen.getByLabelText(/correo/i)).toHaveValue('ale@example.com')
  expect(screen.getByLabelText(/mensaje/i)).toHaveValue('Quiero renovar mi sala.')
})
