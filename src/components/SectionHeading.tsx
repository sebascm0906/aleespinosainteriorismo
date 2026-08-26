interface SectionHeadingProps {
  id: string
  eyebrow?: string
  title: string
  description?: string
}

export default function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  )
}
