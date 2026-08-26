import { MessageCircle } from 'lucide-react'
import { contact } from '../content/site'

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={contact.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversación por WhatsApp"
      title="WhatsApp"
    >
      <MessageCircle aria-hidden="true" />
    </a>
  )
}
