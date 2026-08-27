import type { Figure } from '../content/site'

interface PictureProps {
  figure: Figure
  /** Atributo `sizes`: describe el ancho de presentación real en cada breakpoint. */
  sizes: string
  /** Sólo la imagen del LCP. Las demás van lazy. */
  priority?: boolean
  className?: string
}

/**
 * Imagen responsiva en AVIF + WebP.
 *
 * `width` y `height` van siempre en el `<img>` y además como `aspect-ratio`, para
 * que el navegador reserve el espacio antes de descargar y el CLS quede en cero.
 */
export default function Picture({ figure, sizes, priority = false, className }: PictureProps) {
  const { image, alt, width, height } = figure
  // El export sólo genera la variante -640 cuando la imagen es más ancha que eso.
  // Anunciarla siempre haría que el navegador pidiera un archivo inexistente en
  // cualquier imagen de menos de 640 px.
  const srcSet = (ext: string) =>
    [
      width > 640 ? `/images/${image}-640.${ext} 640w` : null,
      `/images/${image}.${ext} ${width}w`,
    ]
      .filter(Boolean)
      .join(', ')

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/images/${image}.webp`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    </picture>
  )
}
