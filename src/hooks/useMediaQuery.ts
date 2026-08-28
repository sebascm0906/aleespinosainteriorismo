import { useEffect, useState } from 'react'

/**
 * Sigue una media query desde React.
 *
 * Se usa para decidir contenido, no presentación: la retícula de la galería pasa
 * de tres a dos columnas y en dos columnas hace falta una imagen más para que la
 * última fila no quede coja. Ocultar la imagen extra con CSS dejaría un disparador
 * invisible en el DOM y el visor tendría un elemento más de los que se ven; así
 * la lista de figuras es la misma que se pinta.
 *
 * Devuelve `defecto` cuando `matchMedia` no existe —entornos de prueba— para que
 * el comportamiento por omisión sea el de escritorio.
 */
export function useMediaQuery(query: string, defecto = true) {
  const [coincide, setCoincide] = useState(() =>
    typeof matchMedia === 'function' ? matchMedia(query).matches : defecto,
  )

  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const lista = matchMedia(query)
    const alCambiar = (evento: MediaQueryListEvent) => setCoincide(evento.matches)

    setCoincide(lista.matches)
    lista.addEventListener('change', alCambiar)
    return () => lista.removeEventListener('change', alCambiar)
  }, [query])

  return coincide
}
