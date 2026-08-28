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
  /** Correo de la clienta, el mismo que declara como responsable en el aviso de privacidad. */
  email: 'Aleespinosainteriorismo@outlook.com',
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
      alt: 'Vista al patio con plantas y mesas al exterior',
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
  /**
   * Décima imagen, sólo para cuando la retícula va en dos columnas.
   *
   * Con nueve imágenes, tres columnas dan tres filas exactas, pero dos columnas
   * dejan la última fila coja. Esta rellena ese hueco sin tocar la composición de
   * escritorio, que es la que la clienta aprobó.
   */
  fillerDosColumnas: {
    image: 'lenguaje-estudio-integrado',
    alt: 'Estudio integrado con recámara, sala y cocina en un solo espacio, con carpintería de madera clara y luz oculta sobre la cabecera.',
    width: 763,
    height: 763,
    weight: 'normal',
  } satisfies Figure,
  /** Imagen de respiro a sangre completa entre bloques. */
  fullBleed: {
    image: 'lenguaje-comedor-espejo',
    alt: 'Comedor de madera para ocho con espejo circular dorado y nichos iluminados sobre muro texturizado.',
    width: 1165,
    height: 823,
    weight: 'ancha',
  } satisfies Figure,
}

export interface TransformationCase {
  id: string
  before: { figure: Figure; label: string }
  after: { figure: Figure; label: string }
}

/**
 * Casos antes/después del carrusel.
 *
 * La etiqueta del segundo panel depende de qué es la imagen, no del formato:
 * "Después" sólo cuando es fotografía de obra terminada, "Propuesta" cuando es
 * un render. Nunca se rotula un render como fotografía.
 *
 * Todas las imágenes se recortaron a la proporción 1165/1040 del caso original
 * para que el carrusel no salte de alto entre vistas.
 */
export const transformation = {
  eyebrow: 'Antes y después',
  title: 'De lo que hay a lo que puede ser',
  description: 'Cada caso muestra el estado original del espacio y el resultado del proyecto.',
  cases: [
    {
      id: 'departamento',
      before: {
        figure: {
          image: 'transformacion-antes',
          alt: 'Estado original del departamento: sala sin intervenir, cortinas antiguas, piso desgastado y mobiliario disperso.',
          width: 1165,
          height: 1040,
          weight: 'normal',
        },
        label: 'Antes',
      },
      after: {
        figure: {
          image: 'transformacion-propuesta',
          alt: 'Propuesta para el mismo departamento: sala, comedor y área de trabajo integrados, con cortinas de lino y luz natural.',
          width: 1165,
          height: 1040,
          weight: 'normal',
        },
        label: 'Después',
      },
    },
    {
      id: 'bano',
      before: {
        figure: {
          image: 'transformacion-2-antes',
          alt: 'Baño con azulejo beige, cenefa de mosaico, lavabo ovalado empotrado en cubierta de mármol claro y espejo que cubre el muro completo.',
          width: 977,
          height: 872,
          weight: 'normal',
        },
        label: 'Antes',
      },
      after: {
        figure: {
          image: 'transformacion-2-despues',
          alt: 'El mismo baño terminado: espejo de abanico retroiluminado, cubierta de granito negro, lavabo rectangular, grifería dorada y carpintería de madera veteada.',
          width: 1080,
          height: 964,
          weight: 'normal',
        },
        label: 'Después',
      },
    },
    {
      id: 'recamara',
      before: {
        figure: {
          image: 'transformacion-3-antes',
          alt: 'Habitación vacía con piso de travertino, muros blancos sin acabados y persiana enrollable sobre el ventanal.',
          width: 883,
          height: 788,
          weight: 'normal',
        },
        label: 'Antes',
      },
      after: {
        figure: {
          image: 'transformacion-3-despues',
          alt: 'La misma habitación terminada como recámara: muro de listones de madera con luz oculta, cabecera tapizada, buró flotante y piso de mármol.',
          width: 887,
          height: 792,
          weight: 'normal',
        },
        label: 'Después',
      },
    },
    {
      id: 'sala',
      before: {
        figure: {
          image: 'transformacion-4-antes',
          alt: 'Sala en obra: lonas de protección cubriendo el piso, sacos de material y herramienta frente al ventanal.',
          width: 885,
          height: 790,
          weight: 'normal',
        },
        label: 'Antes',
      },
      after: {
        figure: {
          image: 'transformacion-4-despues',
          alt: 'La misma sala terminada: piso de madera oscura, muros pintados y cortinas a los costados del ventanal que da al balcón.',
          width: 883,
          height: 788,
          weight: 'normal',
        },
        label: 'Después',
      },
    },
    {
      id: 'terraza',
      before: {
        figure: {
          image: 'transformacion-5-antes',
          alt: 'Terraza con deck de madera desgastado, muros blancos, macetas con sansevierias alineadas al muro y una serie de focos colgada.',
          width: 1080,
          height: 964,
          weight: 'normal',
        },
        label: 'Antes',
      },
      after: {
        figure: {
          image: 'transformacion-5-propuesta',
          alt: 'Propuesta para la misma terraza: pérgola de madera, iluminación cálida en muros, jardinera integrada y sala exterior con mesa baja.',
          width: 1080,
          height: 964,
          weight: 'normal',
        },
        label: 'Después',
      },
    },
  ] satisfies TransformationCase[],
}

export const studio = {
  /** Línea de rol. Va con el tratamiento de versalitas del sitio, no como párrafo. */
  role: 'Arquitecta de Interiores · Fundadora de AE Interiorismo',
  /**
   * Texto entregado por la clienta. Se corrigió gramática y se unificó en tercera
   * persona; no se agregó ni se quitó ningún hecho. La única reescritura de fondo
   * es el último párrafo, que empezaba con «Porque» como fragmento suelto.
   */
  body: [
    'Su pasión por el diseño nace de una convicción: un espacio bien resuelto cambia la manera en que se vive, se trabaja y se recibe.',
    'Estudió la licenciatura en Arquitectura de Interiores, varios diplomados en Diseño de Interiores y una Maestría en Emprendimiento e Innovación Digital. Con esa formación dirige su propio estudio.',
    'Un gran proyecto no se define por su estética, sino por el detalle y por interpretar la personalidad, las necesidades y el estilo de vida de cada cliente. Por eso cada uno empieza escuchando, no imponiendo un estilo.',
    'Acompaña el proceso completo: distribución, materiales, mobiliario, iluminación, texturas, colores y detalles finales. Para ella el verdadero lujo está en crear espacios que se sientan únicos para quien los habita.',
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
