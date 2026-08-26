import { brand, hero } from '../content/site'

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title">{brand.name}</h1>
        <p className="hero-proposition">{hero.proposition}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={hero.actions.whatsapp.href} target="_blank" rel="noreferrer">
            {hero.actions.whatsapp.label}
          </a>
          <a
            className="button button-secondary"
            href={hero.actions.projects.href}
            aria-label={hero.actions.projects.accessibleLabel}
          >
            {hero.actions.projects.label}
          </a>
        </div>
      </div>
      <img className="hero-image" src={hero.image} alt={hero.alt} fetchPriority="high" />
    </section>
  )
}
