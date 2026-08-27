import { useEffect, useRef, useState } from 'react'
import { visualLanguage } from '../content/site'
import Lightbox from './Lightbox'
import Picture from './Picture'

/**
 * Retícula editorial con pesos alternados. Las celdas `ancha` ocupan cuatro
 * columnas de seis y las `alta` ocupan dos filas: eso produce el ritmo irregular
 * en vez de una cuadrícula uniforme.
 */
export default function VisualLanguage() {
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
        {visualLanguage.figures.map((figure, index) => (
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
          figures={visualLanguage.figures}
          index={openAt}
          onClose={close}
          onNavigate={setOpenAt}
        />
      ) : null}
    </>
  )
}
