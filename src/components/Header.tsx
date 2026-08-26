import { brand, navigation } from '../content/site'

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href={brand.homeHref} aria-label={brand.homeLabel}>
        <img className="brand-logo" src={brand.logo.src} alt={brand.logo.alt} />
      </a>

      <nav aria-label="Navegación principal">
        <ul className="site-navigation">
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} {...(item.isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
