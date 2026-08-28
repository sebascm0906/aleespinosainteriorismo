import { contact, studio } from '../content/site'
import Picture from './Picture'

export default function Studio() {
  return (
    <>
      <div className="studio-body">
        {/* Línea de rol, no párrafo: va con el tratamiento de versalitas del sitio. */}
        <p className="eyebrow studio-role">{studio.role}</p>

        {studio.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <a className="studio-link" href={contact.instagramUrl} target="_blank" rel="noreferrer">
          {studio.instagramLabel}
        </a>
      </div>

      {/* El retrato aún no llega. La sección se compone sin él en lugar de mostrar un hueco. */}
      {studio.portrait ? (
        <figure className="studio-portrait">
          <Picture figure={studio.portrait} sizes="(max-width: 1023px) 100vw, 32vw" />
        </figure>
      ) : null}
    </>
  )
}
