import { brand, hero } from '../content/site'
import Picture from './Picture'
import Swash from './Swash'

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media">
        <Picture figure={hero.figure} sizes="100vw" priority />
      </div>

      <div className="hero-copy">
        <h1 id="hero-title">
          <img
            className="hero-monograma"
            src={brand.logo.src}
            alt={hero.title}
            width={794}
            height={594}
            fetchPriority="high"
          />
        </h1>
        <p className="hero-proposition">{hero.proposition}</p>

        <div className="hero-actions">
          <a className="button button-primary" href={hero.actions.primary.href}>
            {hero.actions.primary.label}
          </a>
          <a className="button button-secondary" href={hero.actions.secondary.href}>
            {hero.actions.secondary.label}
          </a>
        </div>
      </div>

      {/* El swash a ancho completo es la línea de horizonte que entrega el hero al contenido. */}
      <div className="hero-horizonte">
        <Swash />
      </div>
    </section>
  )
}
