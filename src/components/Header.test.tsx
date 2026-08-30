import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Header from './Header'
import { brand, navigation } from '../content/site'

type MediaController = {
  emit: (matches: boolean) => void
}

function installMediaQuery(initialMobile: boolean): MediaController {
  let matches = initialMobile
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const mediaQuery = {
    get matches() {
      return matches
    },
    media: '(max-width: 767px)',
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener)
    },
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener)
    },
    addListener: () => undefined,
    removeListener: () => undefined,
    onchange: null,
    dispatchEvent: () => true,
  } as unknown as MediaQueryList

  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

  return {
    emit(nextMatches: boolean) {
      matches = nextMatches
      listeners.forEach((listener) => listener({ matches, media: mediaQuery.media } as MediaQueryListEvent))
    },
  }
}

function mobileMenu() {
  const nav = screen.getByRole('navigation', { name: 'Navegación principal', hidden: true })
  const button = screen.getByRole('button', { name: 'Abrir menú de navegación' })
  return { nav, button }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('menú responsive del encabezado', () => {
  test('en móvil empieza cerrado y expone el botón y el panel accesibles', () => {
    installMediaQuery(true)
    render(<Header />)

    const { nav, button } = mobileMenu()
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 767px)')
    expect(button).toHaveAttribute('aria-controls', 'mobile-navigation')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(nav).toHaveAttribute('id', 'mobile-navigation')
    expect(nav).toHaveAttribute('hidden')
  })

  test('al abrir muestra el panel, cambia su estado y enfoca el primer enlace', async () => {
    const user = userEvent.setup()
    installMediaQuery(true)
    render(<Header />)

    const { nav, button } = mobileMenu()
    await user.click(button)

    expect(button).toHaveAccessibleName('Cerrar menú de navegación')
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(nav).not.toHaveAttribute('hidden')
    navigation.forEach((item) => {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.href)
    })
    expect(within(nav).getAllByRole('link')[0]).toHaveFocus()
  })

  test('Escape cierra el panel y devuelve el foco al botón', async () => {
    const user = userEvent.setup()
    installMediaQuery(true)
    render(<Header />)

    const { button } = mobileMenu()
    await user.click(button)
    await user.keyboard('{Escape}')

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
    expect(screen.getByRole('navigation', { name: 'Navegación principal', hidden: true })).toHaveAttribute(
      'hidden',
    )
  })

  test('un enlace interno cierra el panel y devuelve el foco al botón', async () => {
    const user = userEvent.setup()
    installMediaQuery(true)
    render(<Header />)

    const { nav, button } = mobileMenu()
    await user.click(button)
    await user.click(within(nav).getByRole('link', { name: navigation[0].label }))

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
    expect(nav).toHaveAttribute('hidden')
  })

  test('al pasar a escritorio cierra y enfoca el brand; al volver a móvil sigue cerrado', async () => {
    const user = userEvent.setup()
    const breakpoint = installMediaQuery(true)
    render(<Header />)

    const { button, nav } = mobileMenu()
    await user.click(button)
    await act(async () => {
      breakpoint.emit(false)
    })

    expect(screen.queryByRole('button', { name: /menú de navegación/i })).not.toBeInTheDocument()
    expect(nav).not.toHaveAttribute('hidden')
    await waitFor(() => expect(screen.getByRole('link', { name: brand.homeLabel })).toHaveFocus())

    await act(async () => {
      breakpoint.emit(true)
    })
    const mobile = screen.getByRole('navigation', { name: 'Navegación principal', hidden: true })
    expect(mobile).toHaveAttribute('hidden')
  })

  test('en escritorio muestra navegación horizontal y no muestra botón de menú', () => {
    installMediaQuery(false)
    render(<Header />)

    expect(screen.queryByRole('button', { name: /menú de navegación/i })).not.toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: 'Navegación principal' })
    expect(nav).not.toHaveAttribute('hidden')
    expect(within(nav).getAllByRole('link')).toHaveLength(navigation.length)
    expect(nav.querySelector('.site-navigation')).toBeInTheDocument()
  })
})
