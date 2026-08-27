import { Instagram, Mail } from 'lucide-react'
import { contact } from '../content/site'
import WhatsAppIcon from './WhatsAppIcon'

export default function ContactChannels() {
  return (
    <ul className="contact-channels">
      <li>
        <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>
      </li>
      <li>
        <a href={`mailto:${contact.email}`}>
          <Mail aria-hidden="true" />
          <span>{contact.email}</span>
        </a>
      </li>
      <li>
        <a href={contact.instagramUrl} target="_blank" rel="noreferrer">
          <Instagram aria-hidden="true" />
          <span>{contact.instagramHandle}</span>
        </a>
      </li>
    </ul>
  )
}
