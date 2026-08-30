import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { brand, navigation } from '../content/site'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)', false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const brandRef = useRef<HTMLAnchorElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const wasMobileRef = useRef(isMobile)
  const menuHasFocusRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const changingToDesktop = wasMobileRef.current && !isMobile
    const shouldFocusBrand = changingToDesktop && (isOpen || menuHasFocusRef.current)

    if (changingToDesktop) {
      setIsOpen(false)
      if (shouldFocusBrand) brandRef.current?.focus()
    }

    wasMobileRef.current = isMobile
  }, [isMobile, isOpen])

  useEffect(() => {
    if (isMobile && isOpen) firstLinkRef.current?.focus()
  }, [isMobile, isOpen])

  const closeMenu = (focusToggle = false, afterNavigation = false) => {
    setIsOpen(false)
    if (!focusToggle) return
    if (afterNavigation) {
      requestAnimationFrame(() => toggleRef.current?.focus())
      return
    }
    toggleRef.current?.focus()
  }

  return (
    <header
      className="site-header shell"
      data-desplazado={scrolled ? 'true' : 'false'}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isMobile && isOpen) {
          event.preventDefault()
          closeMenu(true)
        }
      }}
    >
      <a ref={brandRef} className="brand" href={brand.homeHref} aria-label={brand.homeLabel}>
        <img src={brand.logo.monogram} alt={brand.logo.alt} width={755} height={418} />
      </a>
      {isMobile ? (
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setIsOpen((open) => !open)}
          onFocus={() => {
            menuHasFocusRef.current = true
          }}
          onBlur={() => {
            menuHasFocusRef.current = false
          }}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      ) : null}

      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Navegación principal"
        hidden={isMobile && !isOpen}
        onFocusCapture={() => {
          menuHasFocusRef.current = true
        }}
        onBlurCapture={() => {
          menuHasFocusRef.current = false
        }}
      >
        <ul className="site-navigation">
          {navigation.map((item, index) => (
            <li key={item.href}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                {...(item.isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                onClick={() => {
                  if (!item.isExternal && isMobile) closeMenu(true, true)
                }}
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
