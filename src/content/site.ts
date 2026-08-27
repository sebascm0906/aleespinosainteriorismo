/**
 * Contenido del sitio. Todo el texto visible vive aquí.
 *
 * Estructura pensada para sumar inglés después: este archivo es el contenido `es-MX`
 * y su forma es la que replicaría un `site.en.ts`. Los identificadores, rutas de
 * imagen y datos de contacto son compartidos y no se traducen.
 *
 * IMPORTANTE — las imágenes de `visualLanguage` son renders conceptuales que expresan
 * el estilo del estudio, no fotografía de obra ejecutada. La sección no se llama
 * portafolio y `visualLanguage.disclosure` siempre se muestra: ese aviso es lo que
 * sostiene la distinción, sobre todo desde que el par comparativo dice "Después".
 */

export const locale = 'es-MX'

export interface Figure {
  /** Nombre base en /images, sin extensión ni sufijo de ancho. */
  image: string
  alt: string
  /** Dimensiones reales del archivo nativo: reservan el espacio y arman el srcset. */
  width: number
  height: number
  /** Peso en la retícula editorial. */
  weight: 'ancha' | 'alta' | 'normal'
}

export interface Service {
  title: string
  description: string
}

export interface NavigationItem {
  href: string
  label: string
  isExternal?: boolean
}

export interface SectionContent {
  id: string
  headingId: string
  eyebrow: string
  title: string
  description?: string
}

export const brand = {
  name: 'Alejandra Espinosa',
  discipline: 'Interiorismo',
  fullName: 'Alejandra Espinosa Interiorismo',
  logo: {
    /** Versión clara: el sitio es de fondo tinta. */
    src: '/images/brand/logo-ae-claro.png',
    monogram: '/images/brand/monograma-ae-claro.png',
    alt: 'Alejandra Espinosa Interiorismo',
  },
  homeHref: '#inicio',
  homeLabel: 'Alejandra Espinosa Interiorismo, ir al inicio',
}

const whatsappNumber = '525591889761'
const whatsappMessage = 'Hola, me interesa un proyecto de interiorismo.'

export const contact = {
  whatsappNumber,
  whatsappMessage,
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  whatsappLabel: 'Escribir por WhatsApp',
  instagramUrl: 'https://www.instagram.com/alejandraespinosainteriorismo/',
  instagramHandle: '@alejandraespinosainteriorismo',
  /** PENDIENTE: correo por confirmar con la clienta antes de publicar. */
  email: 'pendiente@aleespinosa.mx',
}

export const navigation: NavigationItem[] = [
  { href: '#enfoque', label: 'Enfoque' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#lenguaje', label: 'Lenguaje' },
  { href: '#estudio', label: 'Estudio' },
  { href: '#contacto', label: 'Contacto' },
]

export const hero = {
  eyebrow: 'Interiorismo',
  /** El h1 accesible; en pantalla se ve el monograma. */
  title: 'Alejandra Espinosa Interiorismo',
  proposition: 'Más que interiores, creamos espacios que representan una forma de vivir.',
  figure: {
    image: 'hero-sala-listones',
    alt: 'Sala de estar con muro de listones de madera, iluminación lineal cálida oculta y textiles en verde olivo.',
    width: 1165,
    height: 826,
    weight: 'ancha',
  } satisfies Figure,
  actions: {
    primary: { href: '#lenguaje', label: 'Ver el lenguaje' },
    secondary: { href: '#contacto', label: 'Hablemos de tu espacio' },
  },
}

export const philosophy = {
  /**
   * Acento de la columna izquierda. Se eligió entre dos opciones de la clienta:
   * el dorado de las hojas es lo único de ambas que enlaza con el latón del
   * logotipo. El recorte corta en la junta de concreto, antes del respaldo del
   * sofá, para dejar fuera el cojín de cuadros, que es lo que peleaba con la paleta.
   */
  figure: {
    image: 'enfoque-obra',
    alt: 'Dos obras enmarcadas de hojas de palma en verde y dorado sobre un muro de concreto aparente, con luz dirigida desde el techo.',
    width: 680,
    height: 612,
    weight: 'normal',
  } satisfies Figure,
  body: [
    'No trabajamos con fórmulas repetidas. Cada proyecto parte de cómo vives, cómo trabajas o cómo quieres que te reciban.',
    'De ahí salen decisiones concretas: la temperatura de la luz, la veta de una madera, el punto exacto donde termina un muro.',
    'Acompañamos el proceso completo, del concepto a los acabados. El resultado busca ser atemporal, no la tendencia de este año.',
  ],
}

export const sections: Record<
  'philosophy' | 'services' | 'language' | 'studio' | 'contact',
  SectionContent
> = {
  philosophy: {
    id: 'enfoque',
    headingId: 'philosophy-title',
    eyebrow: 'Enfoque',
    title: 'Cada espacio empieza por una pregunta distinta',
  },
  services: {
    id: 'servicios',
    headingId: 'services-title',
    eyebrow: 'Servicios',
    title: 'En qué acompañamos',
  },
  language: {
    id: 'lenguaje',
    headingId: 'language-title',
    eyebrow: 'Dirección visual',
    title: 'El lenguaje de un espacio',
    description:
      'Materiales cálidos, luz oculta y una paleta que no compite con quien habita el lugar.',
  },
  studio: {
    id: 'estudio',
    headingId: 'studio-title',
    eyebrow: 'El estudio',
    title: 'Alejandra Espinosa',
  },
  contact: {
    id: 'contacto',
    headingId: 'contact-title',
    eyebrow: 'Contacto',
    title: 'Cuéntanos de tu espacio',
  },
}

export const services: Service[] = [
  {
    title: 'Interiorismo residencial',
    description:
      'Casas y departamentos pensados desde la rutina de quien los habita, no desde un catálogo.',
  },
  {
    title: 'Comercial y corporativo',
    description:
      'Locales, cafeterías y oficinas donde el espacio trabaja a favor de la marca y de quien la opera.',
  },
  {
    title: 'Proyecto integral',
    description:
      'Del concepto a los acabados: distribución, materiales, iluminación, mobiliario y seguimiento en obra.',
  },
]

export const visualLanguage = {
  /**
   * Aviso visible en la galería. La clienta pidió esta redacción; conserva la
   * palabra "Conceptos", que es lo que sostiene que no son fotos de obra.
   */
  disclosure: 'Conceptos y Diseños que expresan el lenguaje del estudio',
  figures: [
    {
      image: 'lenguaje-terraza-pergola',
      alt: 'Terraza cubierta con pérgola de madera, jardineras iluminadas y sala exterior al anochecer.',
      width: 1005,
      height: 1264,
      weight: 'alta',
    },
    {
      image: 'lenguaje-cafe-banca',
      alt: 'Interior de cafetería con banca tapizada en verde olivo, mesas de mármol y patio ajardinado al fondo.',
      width: 1165,
      height: 881,
      weight: 'ancha',
    },
    {
      image: 'lenguaje-sala-arena',
      alt: 'Sala en tonos arena con panel de nogal, olivo en maceta de barro y mesa de centro de madera maciza.',
      width: 1165,
      height: 1150,
      weight: 'normal',
    },
    {
      image: 'lenguaje-estar-vinos',
      alt: 'Rincón de estar con dos sillones negros de estructura metálica y muro de vinos retroiluminado.',
      width: 967,
      height: 1264,
      weight: 'alta',
    },
    {
      image: 'lenguaje-despacho-marmol',
      alt: 'Despacho privado con muro de mármol veteado, libreros iluminados y escritorio de nogal.',
      width: 1165,
      height: 852,
      weight: 'ancha',
    },
    {
      image: 'lenguaje-cafe-fachada',
      alt: 'Fachada nocturna de cafetería con letrero retroiluminado y barra de madera ranurada tras el cristal.',
      width: 954,
      height: 1195,
      weight: 'alta',
    },
    {
      image: 'lenguaje-estudio-nogal',
      alt: 'Estudio en casa con escritorio en L de nogal, repisas flotantes con iluminación oculta y silla de piel.',
      width: 1165,
      height: 802,
      weight: 'ancha',
    },
    {
      image: 'lenguaje-cafe-barra',
      alt: 'Barra de cafetería en madera clara con vitrina de repostería, luminarias colgantes y área de mesas.',
      width: 1165,
      height: 851,
      weight: 'ancha',
    },
    {
      image: 'lenguaje-recamara-estudio',
      alt: 'Recámara tipo estudio con cabecera de madera, comedor integrado y luz cálida empotrada.',
      width: 1165,
      height: 1157,
      weight: 'normal',
    },
  ] satisfies Figure[],
  /** Imagen de respiro a sangre completa entre bloques. */
  fullBleed: {
    image: 'lenguaje-comedor-espejo',
    alt: 'Comedor de madera para ocho con espejo circular dorado y nichos iluminados sobre muro texturizado.',
    width: 1165,
    height: 823,
    weight: 'ancha',
  } satisfies Figure,
}

export const transformation = {
  eyebrow: 'Antes y después',
  title: 'De lo que hay a lo que puede ser',
  description:
    'La imagen de la izquierda es la fotografía del estado original del departamento. La de la derecha es la propuesta del estudio para ese mismo espacio.',
  before: {
    figure: {
      image: 'transformacion-antes',
      alt: 'Estado original del departamento: sala sin intervenir, cortinas antiguas, piso desgastado y mobiliario disperso.',
      width: 1165,
      height: 1040,
      weight: 'normal',
    } satisfies Figure,
    label: 'Antes',
  },
  after: {
    figure: {
      image: 'transformacion-propuesta',
      alt: 'Propuesta para el mismo departamento: sala, comedor y área de trabajo integrados, con cortinas de lino y luz natural.',
      width: 1165,
      height: 1040,
      weight: 'normal',
    } satisfies Figure,
    label: 'Después',
  },
}

export const studio = {
  body: [
    'Alejandra Espinosa dirige el estudio y acompaña cada proyecto de principio a fin.',
    'Su trabajo parte de escuchar: cómo se usa el espacio hoy, qué estorba y qué vale la pena conservar. A partir de ahí traduce esas rutinas en luz, materiales y proporciones.',
    'Trabaja proyectos residenciales, comerciales y corporativos, con el mismo criterio en todos: que el espacio se sienta propio y siga funcionando dentro de diez años.',
  ],
  /**
   * Retrato entregado por la clienta. El original es horizontal (1080x854); se
   * recortó a 1:1 centrado, que conserva el monograma del muro y la deja a ella
   * en el eje.
   */
  portrait: {
    image: 'estudio-alejandra',
    alt: 'Alejandra Espinosa en su escritorio, revisando un plano, bajo el monograma AE del muro del estudio.',
    width: 854,
    height: 854,
    weight: 'normal',
  } as Figure | null,
  instagramLabel: 'Ver el proceso en Instagram',
}

export const contactCopy = {
  intro: 'Escríbenos por WhatsApp o déjanos tus datos. Respondemos el mismo día hábil.',
  formTitle: 'Formulario de contacto',
}

export const footer = {
  privacyHref: '/aviso-de-privacidad.html',
  privacyLabel: 'Aviso de privacidad',
  copyright: `© ${new Date().getFullYear()} Alejandra Espinosa Interiorismo`,
  credit: 'Imágenes conceptuales propiedad del estudio.',
}

export const seo = {
  title: 'Alejandra Espinosa Interiorismo | Diseño de interiores residencial y comercial',
  description:
    'Estudio de interiorismo residencial, comercial y corporativo. Proyectos únicos y atemporales, del concepto a los acabados.',
  ogImage: '/og-image.png',
}
