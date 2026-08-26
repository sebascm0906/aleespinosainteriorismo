import { services } from './content/site'

export default function App() {
  return (
    <main>
      <h1>Ale Espinosa Interiorismo</h1>
      <section aria-labelledby="services-title">
        <h2 id="services-title">Servicios</h2>
        <ul>
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
    </main>
  )
}
