# Inventario de imágenes aprobadas

No se deben descargar, incrustar ni hotlinkear imágenes desde Instagram. Antes de añadir una fotografía, Ale debe aprobar el original y este debe exportarse localmente a esta carpeta.

Archivos base esperados (WebP):

- `hero-sala-01.webp`
- `proyecto-sala-01.webp`
- `proyecto-comedor-01.webp`
- `proyecto-recamara-01.webp`
- `proyecto-cocina-01.webp`
- `proyecto-bano-01.webp`
- `proyecto-detalle-01.webp`

Cada archivo WebP de la lista requiere un activo AVIF hermano con el mismo nombre base; por ejemplo, `hero-sala-01.webp` requiere `hero-sala-01.avif`. Ambos derivados deben generarse a partir del mismo recorte del original aprobado por la clienta, tener al menos 1600 px en su lado más largo y estar comprimidos. Los recortes deben respetar la composición prevista para cada sección.

Todo registro de imagen en `src/content/site.ts` debe llevar texto alternativo intencional que describa el espacio, sus materiales o la luz; no usar nombres de archivo, texto genérico ni texto alternativo vacío para imágenes de contenido.
