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
3. El par comparativo se rotula **«Antes» / «Propuesta»**, nunca «Antes / Después». La primera imagen sí es fotografía real del estado original; la segunda es un render. «Después» afirmaría que la obra se construyó.

`tests/content-and-readme.test.ts` verifica las tres.

Si la clienta entrega fotografía de obra terminada, se puede reencuadrar la sección como portafolio — pero es una decisión de contenido, no un ajuste de estilo.

## Estado de los assets

### Imágenes

Origen: capturas entregadas por la clienta, ancho nativo 1179 px, recortadas y con máscara de enfoque. Curaduría y trazabilidad completas en `../instagram/manifest.json`.

Cada imagen vive en `public/images/` como cuatro archivos: `{nombre}.avif`, `{nombre}.webp`, `{nombre}-640.avif`, `{nombre}-640.webp`. `src/components/Picture.tsx` arma el `srcset` a partir de `width`/`height` declarados en `src/content/site.ts`.

**Provisionales por resolución insuficiente** — reemplazar cuando haya original:

| Imagen | Motivo |
| --- | --- |
| `lenguaje-bano-salvia` | La menos nítida del lote junto con la siguiente |
| `lenguaje-recamara-estudio` | Nitidez baja; se conserva por ser la única recámara |

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

### Retrato de Alejandra — falta el archivo

`studio.portrait` es `null` y la sección «El estudio» se compone sin imagen. Al recibir el retrato: exportar como `estudio-alejandra` (AVIF + WebP, anchos 640 y nativo) y llenar el objeto en `src/content/site.ts`.

## Formspree

Antes de publicar, en el panel de Formspree:

- Copiar el endpoint HTTPS a `VITE_FORMSPREE_ENDPOINT`.
- Activar y probar la protección antispam. El cliente incluye un honeypot `_gotcha`, que no sustituye la configuración del proveedor.
- Dar de alta y verificar el dominio de producción en los orígenes permitidos.
- Enviar una prueba real desde el dominio y confirmar que llega al buzón acordado.

## Bloqueadores de publicación

- [ ] Vector real del logotipo, para sustituir los PNG por SVG.
- [ ] Retrato de Alejandra para la sección «El estudio».
- [ ] Correo de contacto confirmado. Hoy es `pendiente@aleespinosa.mx`, un marcador.
- [ ] Confirmar autoría de los renders y de la fotografía del «antes» antes de publicarlos.
- [ ] Datos para el JSON-LD `ProfessionalService`: dirección y teléfono público, si la clienta quiere aparecer en búsqueda local. No se inventan.
- [ ] Aviso de privacidad con texto aprobado en `public/aviso-de-privacidad.html`.
- [ ] Formspree con endpoint real, antispam y dominio configurados.
- [ ] `npm test -- --run` y `npm run build` en verde con los assets finales.

El número de WhatsApp (`+52 55 9188 9761`) sí está confirmado por la clienta y vive en `src/content/site.ts`, no en el componente.

## WhatsApp Business Platform

El botón flotante es un enlace `wa.me` y **no requiere WABA**. Si la clienta quiere Cloud API más adelante, lo que tendría que reunir está listado en el reporte de entrega; no se configura nada de eso sin autorización.

## Variable obligatoria en build: `VITE_SITE_URL`

`index.html` usa `%VITE_SITE_URL%` en `og:url`, `og:image` y el JSON-LD. Open Graph exige URLs absolutas: con una ruta relativa, la vista previa al compartir el enlace por WhatsApp o Facebook aparece **sin imagen**.

Define `VITE_SITE_URL` con el origen del sitio publicado y sin diagonal final, por ejemplo `https://aleespinosainteriorismo.com`, tanto en `.env` local como en las variables de entorno de Vercel. Es un bloqueador de publicación, no un extra.
