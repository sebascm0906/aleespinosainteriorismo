import { brand, contact } from '../content/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-brand">{brand.name}</p>
      <nav aria-label="Alternativas de contacto">
        <ul className="footer-links">
          <li>
            <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`}>Correo</a>
          </li>
          <li>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          </li>
          <li>
            <a href="/aviso-de-privacidad.html">Aviso de privacidad</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
