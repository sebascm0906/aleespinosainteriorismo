import Header from './components/Header'
import Hero from './components/Hero'
import Process from './components/Process'
import ProjectGallery from './components/ProjectGallery'
import SectionHeading from './components/SectionHeading'
import Services from './components/Services'
import { brandStory, contact, sections } from './content/site'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section
          className="editorial-section projects-section"
          id={sections.projects.id}
          aria-labelledby={sections.projects.headingId}
        >
          <SectionHeading
            id={sections.projects.headingId}
            eyebrow={sections.projects.eyebrow}
            title={sections.projects.title}
            description={sections.projects.description}
          />
          <aside className="brand-story" aria-labelledby="brand-story-title">
            <h3 id="brand-story-title">{brandStory.title}</h3>
            <p>{brandStory.description}</p>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer">
              {brandStory.instagramLabel}
            </a>
          </aside>
          <ProjectGallery />
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
          <Services />
        </section>

        <section
          className="editorial-section process-section"
          id={sections.process.id}
          aria-labelledby={sections.process.headingId}
        >
          <SectionHeading
            id={sections.process.headingId}
            eyebrow={sections.process.eyebrow}
            title={sections.process.title}
          />
          <Process />
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
