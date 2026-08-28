import { useEffect, useRef, useState } from 'react'
import { visualLanguage } from '../content/site'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Lightbox from './Lightbox'
import Picture from './Picture'

/**
 * Retícula uniforme de celdas cuadradas: tres columnas desde 768px, dos por
 * debajo. `Figure.weight` sigue en el contenido porque describe la imagen, pero
 * ya no altera la forma en pantalla.
 */
export default function VisualLanguage() {
  // Con tres columnas las nueve imágenes dan tres filas exactas. Con dos, la
  // última fila queda coja, así que ahí entra una décima. La lista cambia de
  // verdad en vez de ocultar un disparador con CSS: así el visor no navega a una
  // imagen que no está en pantalla.
  const tresColumnas = useMediaQuery('(min-width: 768px)')
  const figuras = tresColumnas
    ? visualLanguage.figures
    : [...visualLanguage.figures, visualLanguage.fillerDosColumnas]

  const [openAt, setOpenAt] = useState<number | null>(null)
  const triggers = useRef<Array<HTMLButtonElement | null>>([])
  const ultimaAbierta = useRef<number | null>(null)

  // Devolver el foco al disparador es parte del contrato del diálogo. Se hace en un
  // efecto sobre el cambio de estado, no en un requestAnimationFrame: el diálogo ya
  // se desmontó cuando esto corre, y el momento queda definido en vez de depender
  // de un frame que puede no llegar.
  useEffect(() => {
    if (openAt !== null) {
      ultimaAbierta.current = openAt
      return
    }
    const indice = ultimaAbierta.current
    if (indice === null) return
    ultimaAbierta.current = null
    // Vuelve a la imagen que se estaba viendo, no siempre a la primera.
    triggers.current[indice]?.focus()
  }, [openAt])

  const close = () => setOpenAt(null)

  return (
    <>
      <ul className="language-grid">
        {figuras.map((figure, index) => (
          <li
            className="language-figure"
            key={figure.image}
            data-weight={figure.weight}
          >
            <figure>
              <button
                type="button"
                ref={(node) => {
                  triggers.current[index] = node
                }}
                onClick={() => setOpenAt(index)}
                aria-label={`Ampliar imagen: ${figure.alt}`}
              >
                <Picture
                  figure={figure}
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                />
              </button>
            </figure>
          </li>
        ))}
      </ul>

      <p className="disclosure">{visualLanguage.disclosure}</p>

      {openAt !== null ? (
        <Lightbox
          figures={figuras}
          index={openAt}
          onClose={close}
          onNavigate={setOpenAt}
        />
      ) : null}
    </>
  )
}
