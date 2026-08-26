import Header from './components/Header'
import Hero from './components/Hero'
import SectionHeading from './components/SectionHeading'
import { sections, services } from './content/site'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section
          className="editorial-section projects-placeholder"
          id={sections.projects.id}
          aria-labelledby={sections.projects.headingId}
        >
          <SectionHeading
            id={sections.projects.headingId}
            eyebrow={sections.projects.eyebrow}
            title={sections.projects.title}
            description={sections.projects.description}
          />
        </section>

        <section
          className="editorial-section services-section"
          id={sections.services.id}
          aria-labelledby={sections.services.headingId}
        >
          <SectionHeading
            id={sections.services.headingId}
            eyebrow={sections.services.eyebrow}
            title={sections.services.title}
          />
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

        <section
          className="editorial-section process-placeholder"
          id={sections.process.id}
          aria-labelledby={sections.process.headingId}
        >
          <SectionHeading
            id={sections.process.headingId}
            eyebrow={sections.process.eyebrow}
            title={sections.process.title}
          />
        </section>

        <section
          className="editorial-section contact-placeholder"
          id={sections.contact.id}
          aria-labelledby={sections.contact.headingId}
        >
          <SectionHeading
            id={sections.contact.headingId}
            eyebrow={sections.contact.eyebrow}
            title={sections.contact.title}
          />
        </section>
      </main>
    </>
  )
}
