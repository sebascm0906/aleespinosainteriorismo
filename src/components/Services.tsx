import { services } from '../content/site'

export default function Services() {
  return (
    <div className="services-list">
      {services.map((service) => (
        <article key={service.title}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </article>
      ))}
    </div>
  )
}
