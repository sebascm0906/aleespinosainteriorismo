import { Instagram, Mail, MessageCircle } from 'lucide-react'
import { contact } from '../content/site'

export default function ContactChannels() {
  return (
    <nav aria-label="Canales de contacto" className="contact-channels">
      <a className="contact-icon-link" href={contact.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
        <MessageCircle aria-hidden="true" />
      </a>
      <a className="contact-icon-link" href={`mailto:${contact.email}`} aria-label="Correo electrónico" title="Correo electrónico">
        <Mail aria-hidden="true" />
      </a>
      <a className="contact-icon-link" href={contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
        <Instagram aria-hidden="true" />
      </a>
    </nav>
  )
}
