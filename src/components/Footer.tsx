import { brand, contact, footer } from '../content/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src={brand.logo.src} alt={brand.logo.alt} width={794} height={594} loading="lazy" />
        {/* Los dos textos van agrupados para poder ponerlos al costado del
            logotipo en vez de debajo: es lo que baja la altura del pie. */}
        <div className="footer-legal">
          <p>{footer.copyright}</p>
          <p>{footer.credit}</p>
        </div>
      </div>

      <nav aria-label="Enlaces del pie">
        <ul className="footer-links">
          <li>
            <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`}>Correo</a>
          </li>
          <li>
            <a href={footer.privacyHref}>{footer.privacyLabel}</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
