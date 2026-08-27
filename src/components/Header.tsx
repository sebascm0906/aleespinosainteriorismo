import { useEffect, useState } from 'react'
import { brand, navigation } from '../content/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="site-header shell" data-desplazado={scrolled ? 'true' : 'false'}>
      <a className="brand" href={brand.homeHref} aria-label={brand.homeLabel}>
        <img src={brand.logo.monogram} alt={brand.logo.alt} width={755} height={418} />
      </a>

      <nav aria-label="Navegación principal">
        <ul className="site-navigation">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                {...(item.isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
