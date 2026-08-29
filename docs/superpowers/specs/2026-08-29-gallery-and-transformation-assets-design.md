# Galería y actualización de antes/después

## Objetivo

Incorporar la foto entregada de recámara-estudio a la retícula de «El lenguaje de
un espacio» y sustituir el primer par comparativo de transformación con las dos
imágenes aprobadas por la clienta.

## Alcance aprobado

### Retícula «El lenguaje de un espacio»

- Añadir la foto de recámara-estudio entregada el 29 de agosto únicamente como
  décima celda de la galería visible en móvil.
- Mantener nueve imágenes en escritorio, organizadas como una retícula regular
  de tres columnas por tres filas.
- Mantener diez imágenes en móvil, organizadas en dos columnas y cinco filas;
  la nueva imagen ocupa el último espacio de la quinta fila, que antes quedaba
  vacío.
- Todas las tarjetas conservan una proporción cuadrada, con `object-fit: cover`
  para que la composición sea uniforme sin deformar las fotografías.
- La nueva figura conserva los contratos actuales: texto alternativo descriptivo,
  dimensiones declaradas y variantes AVIF/WebP de ancho completo y 640 px.

### Caso «sala» de «Antes y después»

- El caso `sala` pierde la fotografía de obra con lonas que la clienta
  marcó para retirar.
- La imagen actual del espacio vacío pasa a ser el panel «Antes».
- La nueva imagen de sala y comedor terminados pasa a ser el panel «Después».
- Se conserva el carrusel, sus controles, sus etiquetas y el tamaño estable de
  los paneles. Sólo se sustituyen los activos y sus textos alternativos.

### Texto corrido

- Este alcance fue solicitado explícitamente por la clienta durante la aprobación
  final del 29 de agosto de 2026.
- Justificar en escritorio y móvil el texto corrido: párrafos editoriales,
  descripciones de secciones, servicios, formulario y aviso de la galería.
- Conservar sin justificación títulos, cejas, navegación, botones, pies de foto,
  etiquetas de formulario y enlaces cortos.
- Aplicar `hyphens: auto` con el documento en español para reducir huecos entre
  palabras, especialmente en las columnas angostas de móvil.

## Activos y textos alternativos

| Uso | Fuente | Destino | Alt final |
| --- | --- | --- | --- |
| Relleno móvil de galería | `/var/folders/15/kxryd4s52dxbzcq344ll65dr0000gn/T/codex-clipboard-2dccef7c-3cfe-4f69-b31f-e98737cb3480.png` | `lenguaje-departamento-integrado` | `Estudio compacto con dormitorio, sala y cocina integrados, separados por un volumen de carpintería de madera clara.` |
| «Antes» de `sala` | Reutilizar `transformacion-4-despues` (coincide con la foto vacía entregada) | `transformacion-4-despues` | `Sala vacía con piso de madera, ventanal corrido y balcón con vista arbolada.` |
| «Después» de `sala` | `/var/folders/15/kxryd4s52dxbzcq344ll65dr0000gn/T/codex-clipboard-b3180e78-7986-4d24-9bf5-656c5302d671.png` | `transformacion-4-sala-terminada` | `Sala y comedor terminados frente al ventanal, con panel de madera, sofá claro y mesa para seis.` |

Cada archivo nuevo se genera en AVIF y WebP, original y variante `-640`. Los
cuatro archivos `transformacion-4-antes*` se eliminan: no deben permanecer
referenciados en contenido, render, importaciones ni como activo publicado.

## Implementación

1. Preparar los dos activos nuevos de la tabla como los cuatro formatos que
   consume `Picture`: AVIF y WebP, original y variante `-640`.
2. Actualizar `visualLanguage.fillerDosColumnas` con
   `lenguaje-departamento-integrado`.
   Esa figura sólo se suma debajo de 768 px; por ello el escritorio continúa en
   3×3 y móvil queda completo en 2×5.
3. Actualizar por identificador `transformation.cases.find(({ id }) => id ===
   'sala')` el «antes» vacío y el «después» terminado. Los `alt` serán los de
   la tabla, sin afirmar información no proporcionada.
4. Extender los contratos de contenido y las pruebas de interfaz para verificar
   los conteos y orden de la galería, la nueva figura móvil y el caso `sala`
   actualizado.
5. Aplicar las reglas de justificación sólo a los selectores de texto corrido.

## Manejo de errores y regresiones conocidas

- No se modifica la estructura del carrusel ni la lógica de navegación.
- Las imágenes mantienen dimensiones explícitas para evitar saltos de layout.
- La línea base actual de `npm test -- --run` descubre también una worktree
  histórica dentro de `.worktrees/`; eso genera fallas ajenas al alcance. Las
  pruebas dirigidas de esta rama serán la evidencia primaria hasta que se excluya
  esa carpeta del descubrimiento global.
- El test existente de controles del carrusel emite un aviso porque jsdom no
  implementa `scrollTo`; no es causado por este cambio de activos.

## Criterios de aceptación

- A 1440 px la galería presenta exactamente 9 tarjetas en 3 columnas y 3 filas.
- A 768 px la galería presenta exactamente 9 tarjetas en 3 columnas y 3 filas.
- A 767 px y a 390 px la galería presenta exactamente 10 tarjetas en 2 columnas
  y 5 filas; `lenguaje-departamento-integrado` es la décima tarjeta.
- El caso con `id: 'sala'` muestra espacio vacío en «Antes» y sala terminada en
  «Después»; no existe ninguna referencia ni archivo publicado de
  `transformacion-4-antes`.
- A 1440 px y 390 px, los párrafos de texto corrido muestran bordes izquierdo y
  derecho alineados, mientras títulos, navegación y botones conservan su
  alineación original.
- Los formatos de cada activo existen en `public/images/` y las pruebas
  dirigidas, build y verificación visual de las secciones `#lenguaje` y
  `#transformacion` pasan.
