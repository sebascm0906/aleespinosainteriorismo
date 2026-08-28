import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { transformation } from '../content/site'
import Picture from './Picture'

/**
 * Carrusel de casos antes/después.
 *
 * Desplazamiento nativo con scroll-snap: el swipe táctil y la rueda funcionan sin
 * JavaScript, y los botones sólo llaman a `scrollTo`. Nada de librerías.
 *
 * El rótulo del segundo panel viene del contenido, no del componente: «Después»
 * cuando es fotografía de obra terminada y «Propuesta» cuando es un render.
 */
export default function Transformation() {
  const casos = transformation.cases
  const total = casos.length
  const pistaRef = useRef<HTMLDivElement | null>(null)
  const [actual, setActual] = useState(0)

  // El índice sale de lo que realmente está en pantalla, no de un contador propio:
  // así el swipe y los botones no se desincronizan.
  useEffect(() => {
    const pista = pistaRef.current
    if (!pista || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const i = Number((visible.target as HTMLElement).dataset.indice)
        if (!Number.isNaN(i)) setActual(i)
      },
      { root: pista, threshold: 0.6 },
    )

    pista.querySelectorAll('[data-indice]').forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  const irA = useCallback((indice: number) => {
    const destino = Math.max(0, Math.min(total - 1, indice))
    // Se marca de inmediato en vez de esperar a que el observador vea el scroll:
    // el control responde al instante y no depende de IntersectionObserver, que
    // no existe en todos los entornos. El observador corrige si el usuario desliza.
    setActual(destino)

    const pista = pistaRef.current
    if (!pista) return
    const vista = pista.querySelector<HTMLElement>(`[data-indice="${destino}"]`)
    if (!vista) return
    // Bajo prefers-reduced-motion el cambio es instantáneo, pero sigue funcionando.
    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    pista.scrollTo({ left: vista.offsetLeft - pista.offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }, [total])

  const onKeyDown = (evento: React.KeyboardEvent) => {
    if (evento.key === 'ArrowRight') {
      evento.preventDefault()
      irA(actual + 1)
    } else if (evento.key === 'ArrowLeft') {
      evento.preventDefault()
      irA(actual - 1)
    }
  }

  return (
    <div
      className="carrusel"
      role="group"
      aria-roledescription="carousel"
      aria-label={transformation.title}
      onKeyDown={onKeyDown}
    >
      <div className="carrusel-pista" ref={pistaRef}>
        {casos.map((caso, i) => (
          <div
            className="carrusel-vista"
            key={caso.id}
            data-indice={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`Caso ${i + 1} de ${total}`}
          >
            <div className="transformation-pair">
              {[caso.before, caso.after].map((panel) => (
                <figure key={panel.figure.image}>
                  <Picture
                    figure={panel.figure}
                    sizes="(max-width: 1023px) 100vw, 44vw"
                    eager={i === 0}
                  />
                  <figcaption>{panel.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="carrusel-controles">
        <button
          type="button"
          onClick={() => irA(actual - 1)}
          disabled={actual === 0}
          aria-label="Caso anterior"
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <ul className="carrusel-puntos">
          {casos.map((caso, i) => (
            <li key={caso.id}>
              <button
                type="button"
                onClick={() => irA(i)}
                aria-label={`Ir al caso ${i + 1} de ${total}`}
                aria-current={i === actual ? 'true' : undefined}
                data-activo={i === actual ? 'true' : 'false'}
              >
                <span className="visually-hidden">{i + 1}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Sustituye a los indicadores en pantallas angostas: cinco objetivos de
            44px no caben a 320px y el flex los comprimía a 14px. Va aria-hidden
            porque la región aria-live de abajo ya anuncia el cambio. */}
        <p className="carrusel-conteo" aria-hidden="true">
          {actual + 1} / {total}
        </p>

        <button
          type="button"
          onClick={() => irA(actual + 1)}
          disabled={actual === total - 1}
          aria-label="Caso siguiente"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <p className="visually-hidden" aria-live="polite">
        Caso {actual + 1} de {total}
      </p>
    </div>
  )
}
