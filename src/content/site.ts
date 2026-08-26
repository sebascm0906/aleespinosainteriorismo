export interface Project {
  title: string
  category: string
  image: string
  alt: string
}

export interface Service {
  title: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export const contact = {
  whatsappUrl:
    'https://wa.me/52XXXXXXXXXX?text=Hola%20Ale%2C%20me%20gustar%C3%ADa%20solicitar%20una%20asesor%C3%ADa.',
  instagramUrl: 'https://www.instagram.com/alejandraespinosainteriorismo/',
  email: 'pendiente@aleespinosa.mx',
}

export const services: Service[] = [
  {
    title: 'Interiorismo residencial',
    description: 'Espacios funcionales que se sienten tuyos.',
  },
  {
    title: 'Asesoría personalizada',
    description: 'Decisiones claras para transformar tu espacio.',
  },
  {
    title: 'Ejecución y acabados',
    description: 'Acompañamiento atento de la idea a los detalles.',
  },
]

export const hero = {
  image: '/images/hero-sala-01.webp',
  alt: 'Sala residencial de Ale Espinosa Interiorismo con madera, piedra y luz natural.',
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Conocer',
    description: 'Escuchamos cómo quieres vivir tu espacio.',
  },
  {
    number: '02',
    title: 'Diseñar',
    description: 'Convertimos tus ideas en una propuesta integral.',
  },
  {
    number: '03',
    title: 'Habitar',
    description: 'Cuidamos los detalles para que disfrutes el resultado.',
  },
]

export const projects: Project[] = [
  {
    title: 'Sala de piedra',
    category: 'Residencial',
    image: '/images/proyecto-sala-01.webp',
    alt: 'Sala residencial con muro de piedra, textiles neutros y luz natural.',
  },
  {
    title: 'Comedor sereno',
    category: 'Residencial',
    image: '/images/proyecto-comedor-01.webp',
    alt: 'Comedor residencial con mesa de madera, lámpara escultórica y vegetación.',
  },
  {
    title: 'Recámara cálida',
    category: 'Recámara principal',
    image: '/images/proyecto-recamara-01.webp',
    alt: 'Recámara principal con cabecera textil, madera clara y luz suave.',
  },
  {
    title: 'Cocina habitable',
    category: 'Cocina',
    image: '/images/proyecto-cocina-01.webp',
    alt: 'Cocina contemporánea con isla de piedra, carpintería de madera y bancos.',
  },
  {
    title: 'Baño de descanso',
    category: 'Baño',
    image: '/images/proyecto-bano-01.webp',
    alt: 'Baño residencial con piedra natural, grifería metálica y luz indirecta.',
  },
  {
    title: 'Detalles con historia',
    category: 'Styling',
    image: '/images/proyecto-detalle-01.webp',
    alt: 'Detalle de interiorismo con objetos artesanales, madera y textiles mexicanos.',
  },
]
