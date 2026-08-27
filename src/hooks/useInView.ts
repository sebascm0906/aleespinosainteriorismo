import { useEffect, useRef, useState } from 'react'

/**
 * Marca un elemento como visible la primera vez que entra al viewport.
 * No se desmarca al salir: el revelado ocurre una sola vez.
 *
 * Devuelve `true` de inmediato si el navegador no soporta IntersectionObserver,
 * para que el contenido nunca quede invisible por falta de API.
 */
export function useInView<T extends HTMLElement | SVGElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, visible }
}
