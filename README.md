# Alejandra Espinosa Interiorismo

Sitio del estudio, en React + TypeScript + Vite.

## Puesta en marcha

```bash
npm install
cp .env.example .env
```

Coloca en `VITE_FORMSPREE_ENDPOINT` el endpoint de Formspree creado para este sitio. No subas `.env` ni un endpoint real que no esté pensado para ser público.

```bash
npm run dev
npm test -- --run
npm run build
```

## Naturaleza de las imágenes — léelo antes de escribir copy

**Las imágenes de la galería son renders conceptuales que expresan el estilo del estudio, no fotografía de obra ejecutada.** La clienta lo confirmó explícitamente.

De ahí salen tres reglas que el código ya aplica y que no deben revertirse:

1. La sección se llama **«El lenguaje de un espacio»**, no «Portafolio» ni «Proyectos seleccionados».
2. La galería muestra siempre el aviso `visualLanguage.disclosure`.
3. El par comparativo se rotula **«Antes» / «Después»**, por decisión expresa de la clienta. La primera imagen sí es fotografía real del estado original; la segunda es un render. Se propuso «Propuesta» para no afirmar que la obra se construyó, y la clienta eligió «Después»: quien sostiene la distinción es el aviso de la galería, que por eso no es opcional.

`tests/content-and-readme.test.ts` verifica las tres.

## Acento del enfoque

`enfoque-obra` es el único elemento del sitio con esquinas redondeadas (20 px) y
ocupa la columna que quedaba vacía a la izquierda del cuerpo. Justo porque la
retícula es toda cuadrada, el redondeo se lee como acento y no como estilo general.

Se eligió entre dos imágenes que propuso la clienta. Ganó por el dorado de las hojas,
lo único de ambas que enlaza con el latón del logotipo; la otra, una terraza, tenía una
persiana clara ocupando media toma que sobre fondo tinta quedaba como un bloque en
blanco. El recorte corta en la junta de concreto antes del respaldo del sofá para dejar
fuera el cojín de cuadros blanco y negro, que era lo que peleaba con la paleta.

## Retícula de la galería

Nueve imágenes en filas de tres, todas cuadradas y del mismo tamaño, por decisión
expresa de la clienta. Se probó una retícula editorial de pesos alternados y arcos en
las verticales; se descartó por falta de uniformidad. `Figure.weight` sigue en el
contenido porque describe la imagen, pero ya no altera la forma en pantalla.

El número de imágenes debe ser múltiplo de tres o la última fila queda coja. En móvil
la retícula baja a dos columnas y ahí sí queda una celda sola: a 375 px, tres columnas
darían miniaturas de ~101 px, demasiado chicas para fotografía de interiores.

Si la clienta entrega fotografía de obra terminada, se puede reencuadrar la sección como portafolio — pero es una decisión de contenido, no un ajuste de estilo.

## Estado de los assets

### Imágenes

Origen: capturas entregadas por la clienta, ancho nativo 1179 px, recortadas y con máscara de enfoque. Curaduría y trazabilidad completas en `../instagram/manifest.json`.

Cada imagen vive en `public/images/` como cuatro archivos: `{nombre}.avif`, `{nombre}.webp`, `{nombre}-640.avif`, `{nombre}-640.webp`. `src/components/Picture.tsx` arma el `srcset` a partir de `width`/`height` declarados en `src/content/site.ts`.

**Provisional por resolución insuficiente** — reemplazar cuando haya original:

| Imagen | Motivo |
| --- | --- |
| `lenguaje-recamara-estudio` | Nitidez baja; se conserva por ser la única recámara |

`lenguaje-bano-salvia` sale de la galería: era la otra de nitidez baja y la retícula
uniforme pide un múltiplo de tres. Sus cuatro archivos siguen en `public/images/` por
si se recupera un original mejor. Están en `../instagram/seleccion/13-detalle-vertical.jpg`.

El resto es utilizable a los tamaños de presentación actuales, pero ninguna supera 1165 px de ancho: el hero va justo en pantallas de 1440 px o más. Pedir originales a la clienta para el hero.

### Logotipo — falta el vector

`logo 1 para impresiones.pdf` **no es vectorial**: contiene un PNG de 794×596 sobre un rectángulo blanco. No hay curvas que extraer.

Las variantes en `public/images/brand/` se derivaron de ese PNG separando tinta y latón por saturación:

| Archivo | Uso |
| --- | --- |
| `logo-ae-claro.png` | Principal, sobre fondo tinta |
| `logo-ae-completo.png` | Sobre fondo claro |
| `logo-ae-negro.png` / `logo-ae-blanco.png` | Monocromo |
| `monograma-ae-claro.png` | Encabezado fijo |
| `monograma-ae-letras.png` | Favicon: sin swash, que a 16 px se vuelve ruido |

**Pendiente:** pedir a la clienta el vector real (`.ai`, `.eps`, `.svg` o PDF con curvas) y sustituir estos PNG por SVG. No se autotrazó el PNG a propósito: un trazado automático deforma los remates finos de una Didone y es la marca de la clienta.

El swash del sitio (`src/components/Swash.tsx`) **no** es una copia del vector de la marca: es un trazo original que repite el gesto, dibujable con `stroke-dashoffset`.

### Retrato de Alejandra

Entregado por la clienta. El original es horizontal (1080×854); se recortó a 1:1 centrado, que conserva el monograma del muro y la deja a ella en el eje, y se exportó como `estudio-alejandra`.

Mide 854 px de lado, así que `.studio-portrait` lleva `max-width: 30rem`: sin ese tope, en tablet y móvil la sección lo estira a todo el ancho y lo escala hacia arriba. Si llega un original de mayor resolución, se puede levantar el tope.

## Formspree

Antes de publicar, en el panel de Formspree:

- Copiar el endpoint HTTPS a `VITE_FORMSPREE_ENDPOINT`.
- Activar y probar la protección antispam. El cliente incluye un honeypot `_gotcha`, que no sustituye la configuración del proveedor.
- Dar de alta y verificar el dominio de producción en los orígenes permitidos.
- Enviar una prueba real desde el dominio y confirmar que llega al buzón acordado.

## Bloqueadores de publicación

- [ ] Vector real del logotipo, para sustituir los PNG por SVG.
- [ ] Confirmar autoría de los renders y de la fotografía del «antes» antes de publicarlos.
- [ ] Datos para el JSON-LD `ProfessionalService`: dirección y teléfono público, si la clienta quiere aparecer en búsqueda local. No se inventan.
- [ ] Formspree con endpoint real, antispam y dominio configurados.
- [ ] `npm test -- --run` y `npm run build` en verde con los assets finales.

Ya confirmados por la clienta y en `src/content/site.ts`, no en los componentes: el número de WhatsApp (`+52 55 9188 9761`) y el correo (`Aleespinosainteriorismo@outlook.com`).

El aviso de privacidad ya trae el texto legal que entregó la clienta. Sólo se maquetó; no se redactó ni se completó nada.

**Dato disponible pero no usado:** el aviso declara el domicilio Av. Coyoacán 1919, Col. Acacias, Benito Juárez, CDMX. No se agregó al JSON-LD `ProfessionalService` porque un domicilio fiscal en un aviso legal no es lo mismo que una dirección de atención al público. Si la clienta quiere aparecer en búsqueda local, se agrega cuando lo confirme.

## WhatsApp Business Platform

El botón flotante es un enlace `wa.me` y **no requiere WABA**. Si la clienta quiere Cloud API más adelante, lo que tendría que reunir está listado en el reporte de entrega; no se configura nada de eso sin autorización.

## Variable obligatoria en build: `VITE_SITE_URL`

`index.html` usa `%VITE_SITE_URL%` en `og:url`, `og:image` y el JSON-LD. Open Graph exige URLs absolutas: con una ruta relativa, la vista previa al compartir el enlace por WhatsApp o Facebook aparece **sin imagen**.

Define `VITE_SITE_URL` con el origen del sitio publicado y sin diagonal final, por ejemplo `https://aleespinosainteriorismo.com`, tanto en `.env` local como en las variables de entorno de Vercel.

**En previews de Vercel no hace falta configurarla.** Si `VITE_SITE_URL` no existe, el plugin `origen-absoluto-og` de `vite.config.ts` usa `VERCEL_URL`, que Vercel inyecta en cada despliegue, y las etiquetas salen absolutas igual. En producción sí hay que definirla, porque `VERCEL_URL` apunta al host generado y no al dominio de la clienta.

Sin ninguna de las dos, el build no falla pero avisa en consola y las etiquetas quedan relativas. Vite por su cuenta sólo advertía y publicaba el literal `%VITE_SITE_URL%`, que rompe igual y encima parece un error de programación: por eso existe el plugin.
