import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Resuelve el origen absoluto del sitio en las etiquetas de `index.html`.
 *
 * Open Graph exige URLs absolutas: con una ruta relativa, la vista previa al
 * compartir el enlace sale sin imagen. `VITE_SITE_URL` cubre producción, pero si
 * falta, Vite sólo emite una advertencia y publica el literal `%VITE_SITE_URL%`,
 * que rompe igual y encima parece un error de programación.
 *
 * Este plugin usa `VERCEL_URL` como respaldo — Vercel la inyecta en cada
 * despliegue — para que las previews tengan etiquetas correctas sin configurar
 * nada. En producción se sigue definiendo `VITE_SITE_URL` con el dominio propio,
 * porque `VERCEL_URL` apunta al host generado, no al dominio de la clienta.
 */
function origenAbsoluto(): Plugin {
  return {
    name: 'origen-absoluto-og',
    // 'post' para correr después de la sustitución de env que hace Vite: si
    // VITE_SITE_URL sí estaba definida, aquí ya no queda nada que reemplazar.
    enforce: 'post',
    transformIndexHtml(html) {
      if (!html.includes('%VITE_SITE_URL%')) return html

      const respaldo = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''
      if (!respaldo) {
        console.warn(
          '\n[og] VITE_SITE_URL no está definida y no hay VERCEL_URL de respaldo.\n' +
            '     og:url, og:image y el JSON-LD quedarán sin origen absoluto y la vista\n' +
            '     previa al compartir saldrá sin imagen. Defínela antes de publicar.\n',
        )
      }
      return html.replaceAll('%VITE_SITE_URL%', respaldo)
    },
  }
}

export default defineConfig({
  plugins: [react(), origenAbsoluto()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    globals: true,
  },
})
