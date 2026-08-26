import { contact } from '../content/site'

const navigation = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ale Espinosa Interiorismo, inicio">
        <span className="brand-monogram" aria-hidden="true">AE</span>
        <span className="brand-name">Ale Espinosa Interiorismo</span>
      </a>

      <nav aria-label="Navegación principal">
        <ul className="site-navigation">
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
