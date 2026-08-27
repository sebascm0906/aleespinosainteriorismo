import { useEffect, useId, useRef } from 'react'
import { useInView } from '../hooks/useInView'

interface SwashProps {
  /** Dibuja el trazo al entrar en viewport. Bajo prefers-reduced-motion el CSS lo deja dibujado. */
  animate?: boolean
  /** Muestra el rombo del logotipo en el cruce de la curva. */
  rhombus?: boolean
  className?: string
}

/**
 * El motivo del sitio: una curva larga y afilada que repite el gesto del swash del
 * logotipo — y, de paso, la línea de luz oculta que aparece en todas las imágenes
 * del estudio (cove lighting, repisas retroiluminadas, nichos).
 *
 * Se usa en tres escalas: horizonte del hero, divisor de sección y subrayado de
 * navegación (esta última, en CSS).
 *
 * Es un trazo dibujado, no una copia del vector de la marca: un contorno relleno no
 * se puede animar con stroke-dashoffset, y el degradado del trazo da el afilado de
 * las puntas sin necesidad de grosor variable.
 */
export default function Swash({ animate = true, rhombus = true, className }: SwashProps) {
  const gradientId = useId()
  const pathRef = useRef<SVGPathElement | null>(null)
  const { ref, visible } = useInView<SVGSVGElement>()

  useEffect(() => {
    const path = pathRef.current
    // getTotalLength no existe en jsdom ni en motores SVG parciales. Sin él, el CSS
    // usa el valor por defecto de --largo y el trazo se dibuja igual.
    if (!path || !animate || typeof path.getTotalLength !== 'function') return
    // La longitud real del trazo alimenta el dash; así el dibujado no depende de
    // una constante que se desincronice si la curva cambia.
    const length = Math.ceil(path.getTotalLength())
    path.ownerSVGElement?.style.setProperty('--largo', String(length))
  }, [animate])

  return (
    <svg
      ref={ref}
      className={['swash', className].filter(Boolean).join(' ')}
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      role="presentation"
      data-anima={animate ? 'true' : 'false'}
      data-visible={visible ? 'true' : 'false'}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--laton)" stopOpacity="0" />
          <stop offset="22%" stopColor="var(--laton)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--laton-luz)" stopOpacity="1" />
          <stop offset="78%" stopColor="var(--laton)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--laton)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        className="swash-trazo"
        style={{ stroke: `url(#${gradientId})` }}
        d="M0 46 C 180 46 300 14 520 26 C 700 36 780 62 960 50 C 1080 42 1140 34 1200 36"
        vectorEffect="non-scaling-stroke"
      />

      {rhombus ? (
        <path className="swash-rombo" d="M600 24 L 606 34 L 600 44 L 594 34 Z" />
      ) : null}
    </svg>
  )
}
