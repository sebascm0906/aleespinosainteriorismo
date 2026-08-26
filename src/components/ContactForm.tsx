import { FormEvent, useState } from 'react'

interface ContactFormProps {
  endpoint?: string
}

interface ContactErrors {
  name?: string
  email?: string
  message?: string
}

const errorMessage =
  'No pudimos enviar tu consulta. Intenta de nuevo o escríbenos por WhatsApp.'

export default function ContactForm({ endpoint }: ContactFormProps) {
  const submissionUrl = endpoint ?? import.meta.env.VITE_FORMSPREE_ENDPOINT
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [gotcha, setGotcha] = useState('')
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()
    const nextErrors: ContactErrors = {}

    if (!trimmedName) {
      nextErrors.name = 'Escribe tu nombre.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Ingresa un correo válido.'
    }

    if (!trimmedMessage) {
      nextErrors.message = 'Cuéntanos sobre tu espacio.'
    }

    setErrors(nextErrors)
    setStatus('')

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsPending(true)

    try {
      if (!submissionUrl) {
        throw new Error('Missing contact form endpoint')
      }

      const response = await fetch(submissionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _gotcha: gotcha,
        }),
      })

      if (!response.ok) {
        throw new Error('Contact form request failed')
      }

      setName('')
      setEmail('')
      setMessage('')
      setGotcha('')
      setStatus('Gracias por escribirnos. Te responderemos pronto.')
    } catch {
      setStatus(errorMessage)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form className="contact-form" aria-label="Envíanos tu consulta" noValidate onSubmit={handleSubmit}>
      <div className="contact-field">
        <label htmlFor="contact-name">Nombre</label>
        <input
          id="contact-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
        />
        {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
      </div>

      <div className="contact-field">
        <label htmlFor="contact-email">Correo electrónico</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
        />
        {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-gotcha">No completar</label>
        <input
          id="contact-gotcha"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(event) => setGotcha(event.target.value)}
        />
      </div>

      <button className="button button-primary" type="submit" disabled={isPending}>
        {isPending ? 'Enviando…' : 'Enviar consulta'}
      </button>
      {status && <p className="contact-status" role="status">{status}</p>}
    </form>
  )
}
