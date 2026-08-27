import ContactChannels from './components/ContactChannels'
import ContactForm from './components/ContactForm'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Picture from './components/Picture'
import SectionHeading from './components/SectionHeading'
import Services from './components/Services'
import Studio from './components/Studio'
import Swash from './components/Swash'
import Transformation from './components/Transformation'
import VisualLanguage from './components/VisualLanguage'
import { contactCopy, philosophy, sections, transformation, visualLanguage } from './content/site'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Hero />

        <section
          className="editorial-section shell"
          id={sections.philosophy.id}
          aria-labelledby={sections.philosophy.headingId}
        >
          <SectionHeading
            id={sections.philosophy.headingId}
            eyebrow={sections.philosophy.eyebrow}
            title={sections.philosophy.title}
          />
          <div className="philosophy-body">
            {philosophy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <div className="divisor">
          <Swash />
        </div>

        <section
          className="editorial-section shell"
          id={sections.services.id}
          aria-labelledby={sections.services.headingId}
        >
          <SectionHeading
            id={sections.services.headingId}
            eyebrow={sections.services.eyebrow}
            title={sections.services.title}
          />
          <Services />
        </section>

        <figure className="full-bleed">
          <Picture figure={visualLanguage.fullBleed} sizes="100vw" />
        </figure>

        <section
          className="editorial-section shell"
          id={sections.language.id}
          aria-labelledby={sections.language.headingId}
        >
          <SectionHeading
            id={sections.language.headingId}
            eyebrow={sections.language.eyebrow}
            title={sections.language.title}
            description={sections.language.description}
          />
          <VisualLanguage />
        </section>

        <section
          className="editorial-section shell"
          id="transformacion"
          aria-labelledby="transformation-title"
        >
          <SectionHeading
            id="transformation-title"
            eyebrow={transformation.eyebrow}
            title={transformation.title}
            description={transformation.description}
          />
          <Transformation />
        </section>

        <section
          className="editorial-section studio-section shell"
          id={sections.studio.id}
          aria-labelledby={sections.studio.headingId}
        >
          <SectionHeading
            id={sections.studio.headingId}
            eyebrow={sections.studio.eyebrow}
            title={sections.studio.title}
          />
          <Studio />
        </section>

        <section
          className="editorial-section shell"
          id={sections.contact.id}
          aria-labelledby={sections.contact.headingId}
        >
          <SectionHeading
            id={sections.contact.headingId}
            eyebrow={sections.contact.eyebrow}
            title={sections.contact.title}
          />
          <div className="contact-copy">
            <p>{contactCopy.intro}</p>
            <ContactChannels />
          </div>
          <ContactForm />
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
