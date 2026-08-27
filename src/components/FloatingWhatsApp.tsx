import { useEffect, useState } from 'react'
import { contact } from '../content/site'
import WhatsAppIcon from './WhatsAppIcon'

/**
 * Acción flotante de WhatsApp.
 *
 * Aparece tras el primer scroll para no competir con el hero. Lo único animado es
 * el fundido: bajo `prefers-reduced-motion` el botón sigue apareciendo y sigue
 * funcionando, sólo que sin transición. La animación nunca condiciona la función.
 *
 * Mientras está oculto, el CSS usa `visibility: hidden`, que ya lo saca del orden
 * de tabulación y del árbol de accesibilidad. No hace falta `aria-hidden` ni
 * `tabIndex={-1}`: duplicarlo sólo agrega estado que se puede desincronizar.
 */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className="floating-whatsapp"
      href={contact.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={contact.whatsappLabel}
      data-visible={visible ? 'true' : 'false'}
    >
      <WhatsAppIcon />
    </a>
  )
}
