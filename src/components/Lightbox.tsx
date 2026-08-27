import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Figure } from '../content/site'
import Picture from './Picture'

interface LightboxProps {
  figures: Figure[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const FOCUSABLE = 'button:not([disabled]), a[href]'

/**
 * Visor a pantalla completa. Teclado completo: Esc cierra, flechas navegan y el
 * foco queda atrapado dentro del diálogo. Al cerrar, el foco vuelve al disparador,
 * que el llamador se encarga de restaurar.
 */
export default function Lightbox({ figures, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const total = figures.length
  const figure = figures[index]

  const go = useCallback(
    (delta: number) => onNavigate((index + delta + total) % total),
    [index, onNavigate, total],
  )

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
        return
      }
      if (event.key !== 'Tab') return

      // Trampa de foco: sin esto el tabulador se escapa al contenido de atrás.
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [go, onClose])

  if (!figure) return null

  return (
    <div
      className="lightbox"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ${index + 1} de ${total}`}
    >
      <div className="lightbox-bar">
        <p aria-live="polite">
          {index + 1} / {total}
        </p>
        <div className="lightbox-nav">
          <button type="button" onClick={() => go(-1)} aria-label="Imagen anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Imagen siguiente">
            <ChevronRight aria-hidden="true" />
          </button>
          <button type="button" ref={closeRef} onClick={onClose} aria-label="Cerrar el visor">
            <X aria-hidden="true" />
          </button>
        </div>
      </div>

      <figure className="lightbox-figure">
        <Picture figure={figure} sizes="100vw" priority />
        <figcaption>{figure.alt}</figcaption>
      </figure>
    </div>
  )
}
