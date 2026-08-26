import { projects } from '../content/site'

export default function ProjectGallery() {
  return (
    <ul className="project-gallery">
      {projects.map((project, index) => (
        <li className={`project-card project-card-${index + 1}`} key={project.title}>
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
  )
}
