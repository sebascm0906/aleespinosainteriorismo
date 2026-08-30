# Altura uniforme y menú móvil

## Objetivo

Dar al par «Antes / Después» el mismo alto visual y sustituir la navegación
expandida de móvil por un menú hamburguesa compacto y accesible.

## Par comparativo

- Cada `figure > picture` del par comparativo será el marco con la proporción
  estable `1165 / 1040`, igual a la utilizada por los casos originales. El
  `figcaption` queda fuera del marco y debajo de él.
- El marco `picture` usa `display: block`, `width: 100%`, `height: 100%` y
  `overflow: hidden`; su `img` llena esas dos dimensiones con `display: block`
  y `object-fit: cover`. El recorte nunca deforma la imagen.
- El cambio aplica en escritorio y móvil. En móvil los paneles se apilan, pero
  cada uno conserva el mismo encuadre estable.
- Los pies «Antes» y «Después» permanecen debajo de su respectiva imagen.

## Menú hamburguesa

- Desde 767 px hacia abajo el encabezado conserva únicamente el monograma y un
  botón de 44×44 px a la derecha.
- El botón usa los iconos `Menu` y `X` de Lucide, una etiqueta accesible que
  alterna entre «Abrir menú de navegación» y «Cerrar menú de navegación», y
  `aria-expanded` con su valor real. Lleva `aria-controls="mobile-navigation"`.
- Al abrirse, la navegación aparece como un panel oscuro de ancho completo bajo
  el encabezado, con los enlaces apilados y amplios para tocar. El `nav` lleva
  el id estable `mobile-navigation` y, cerrado en móvil, usa `hidden` para
  retirarse tanto de la vista como del orden de tabulación.
- El panel se posiciona `absolute` bajo el encabezado sticky, a `left: 50%`,
  `width: 100vw` y con `transform: translateX(-50%)`; así cubre el ancho del
  viewport, no sólo el ancho de la retícula `.shell`, y queda sobre el contenido.
- Al abrir, el foco pasa al primer enlace. Al elegir un enlace interno, el panel
  se cierra, el foco vuelve al botón y la navegación nativa lleva a la sección.
- La tecla Escape cierra el panel y devuelve el foco al botón hamburguesa.
- A partir de 768 px el menú horizontal existente se conserva, el botón no se
  muestra y el panel nunca queda abierto. Un efecto responde al cambio de
  `matchMedia`: si se cruza a escritorio mientras el panel o uno de sus enlaces
  tiene foco, cierra el panel y devuelve el foco a la marca, que sigue visible.
  Al volver a móvil permanece cerrado.

## Implementación y pruebas

- `Header.tsx` controla el estado abierto, Escape, foco, `matchMedia` y el cierre
  al elegir enlace; no duplica la fuente de navegación, que permanece en
  `content/site.ts`.
- `global.css` define el marco compartido del par y los estados responsive del
  encabezado, sin alterar estilos de escritorio.
- Las pruebas de componente verifican estado/etiquetas del botón, asociación
  `aria-controls`, `hidden`, foco al abrir, cierre por Escape y enlace (incluido
  el retorno del foco al botón), y el reseteo abierto 767 px → cerrado 768 px →
  cerrado al volver a 767 px. Durante ese cruce, con foco dentro del panel, la
  prueba exige que el foco termine en la marca visible.
- Los contratos CSS verifican el marco `picture`/`img`, el panel de ancho de
  viewport y la división 767/768 px. La comprobación en navegador confirma
  geometría real: 1440 y 768 px para alturas iguales/navegación horizontal; 767
  y 390 px para cabecera compacta, panel completo y enlaces apilados.
