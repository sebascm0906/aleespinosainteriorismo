import Header from './components/Header'
import Hero from './components/Hero'
import SectionHeading from './components/SectionHeading'
import { services } from './content/site'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="editorial-section projects-placeholder" id="proyectos" aria-labelledby="projects-title">
          <SectionHeading
            id="projects-title"
            eyebrow="Portafolio"
            title="Proyectos seleccionados"
            description="Una selección de espacios pensados con atención a la materia, la luz y la vida cotidiana."
          />
        </section>

        <section className="editorial-section services-section" id="servicios" aria-labelledby="services-title">
          <SectionHeading id="services-title" eyebrow="Acompañamiento" title="Servicios" />
          <ul className="services-list">
            {services.map((service) => (
              <li key={service.title}>
                <article>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="editorial-section process-placeholder" id="proceso" aria-labelledby="process-title">
          <SectionHeading id="process-title" eyebrow="El camino" title="Proceso" />
        </section>

        <section className="editorial-section contact-placeholder" id="contacto" aria-labelledby="contact-title">
          <SectionHeading id="contact-title" eyebrow="Hablemos" title="Contacto" />
        </section>
      </main>
    </>
  )
}
