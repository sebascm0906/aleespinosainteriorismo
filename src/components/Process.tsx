import { processSteps } from '../content/site'

export default function Process() {
  return (
    <ol className="process-list">
      {processSteps.map((step) => (
        <li key={step.number}>
          <article>
            <p className="process-number">{step.number}</p>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        </li>
      ))}
    </ol>
  )
}
