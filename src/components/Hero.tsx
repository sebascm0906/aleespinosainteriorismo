import { contact, hero } from '../content/site'

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Diseño con amor</p>
        <h1 id="hero-title">Ale Espinosa Interiorismo</h1>
        <p className="hero-proposition">
          Espacios serenos y personales, diseñados para vivirlos todos los días.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="button button-secondary" href="#proyectos" aria-label="Ver el portafolio">
            Ver proyectos
          </a>
        </div>
      </div>
      <img className="hero-image" src={hero.image} alt={hero.alt} fetchPriority="high" />
    </section>
  )
}
