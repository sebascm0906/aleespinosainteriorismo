import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../content/site'

export default function ProjectGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]

  const move = (direction: 1 | -1) => {
    setActiveIndex((currentIndex) => (currentIndex + direction + projects.length) % projects.length)
  }

  return (
    <section className="project-carousel" aria-label="Carrusel de proyectos">
      <div className="project-carousel-viewport">
        <ul className="project-gallery" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {projects.map((project) => (
            <li className="project-card" key={project.title}>
              <article>
                <picture className="project-image-frame">
                  <source srcSet={project.image.replace(/\.webp$/, '.avif')} type="image/avif" />
                  <img className="project-image" src={project.image} alt={project.alt} loading="lazy" width="1200" />
                </picture>
                <div className="project-caption">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="project-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Proyecto anterior">
          <ChevronLeft aria-hidden="true" />
        </button>
        <p role="status" aria-live="polite">{activeIndex + 1} de {projects.length}: {activeProject.title}</p>
        <button type="button" onClick={() => move(1)} aria-label="Siguiente proyecto">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
