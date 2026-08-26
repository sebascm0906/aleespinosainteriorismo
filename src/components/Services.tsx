import { services } from '../content/site'

export default function Services() {
  return (
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
  )
}
