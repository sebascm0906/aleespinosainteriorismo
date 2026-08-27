import { transformation } from '../content/site'
import Picture from './Picture'

/**
 * Antes y propuesta. El rótulo dice "Propuesta", no "Después": la segunda imagen
 * es un render del estudio, no fotografía de obra terminada.
 */
export default function Transformation() {
  return (
    <div className="transformation-pair">
      {[transformation.before, transformation.after].map((panel) => (
        <figure key={panel.figure.image}>
          <Picture
            figure={panel.figure}
            sizes="(max-width: 1023px) 100vw, 44vw"
          />
          <figcaption>{panel.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
