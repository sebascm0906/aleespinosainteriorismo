# Ale Espinosa Interiorismo

Landing page for Ale Espinosa Interiorismo, built with React, TypeScript and Vite.

## Local setup

Install the dependencies and create a local environment file:

```bash
npm install
cp .env.example .env
```

Set `VITE_FORMSPREE_ENDPOINT` in `.env` to the Formspree endpoint created for this site. Do not commit `.env` or a real endpoint that is not intended to be public.

The `VITE_CONTACT_EMAIL` entry is a contact configuration placeholder. The currently rendered email, WhatsApp URL and Instagram URL are defined in `src/content/site.ts`; replace every placeholder there with the client-verified production values before launch.

Run the site and its checks:

```bash
npm run dev
npm test -- --run
npm run build
```

## Formspree configuration

Before publication, create or select the intended Formspree form and complete the following in the Formspree dashboard:

- Copy its HTTPS endpoint into `VITE_FORMSPREE_ENDPOINT`.
- Enable and test the anti-spam protection appropriate for the form. The client includes a `_gotcha` honeypot field; it does not replace the provider's anti-spam configuration.
- Add and verify the production site domain in Formspree's allowed-domain/origin settings, then verify that a real submission reaches the agreed recipient inbox.
- Submit a test from the deployed domain only after the client has approved the contact destination and privacy wording.

## Photography asset handoff

The files in `public/images/` are documented temporary placeholders, not project photography. Do not scrape, download, embed or hotlink images from Instagram.

When the client supplies and approves an original, replace each required image as a paired WebP and AVIF export from the same approved crop:

1. Keep the existing base filename (for example, `proyecto-sala-01.webp` and `proyecto-sala-01.avif`).
2. Export both formats from the same client-approved photo, with the intended composition and at least 1600 px on the longest side.
3. Compress both files, replace the pair together in `public/images/`, and verify the image and its `alt` text in `src/content/site.ts` still match the final photo.
4. Run the test suite and production build after every replacement.

`public/images/README.md` lists every required pair. A client-approved photo pair is required for every listed asset; temporary placeholders must never be treated as launch-ready photography.

## Pre-launch checklist — publication blocked until complete

- [ ] Every temporary image placeholder has been replaced with its corresponding client-approved photo WebP+AVIF pair.
- [ ] The live WhatsApp number, email address, Instagram URL and Formspree recipient have been verified by the client.
- [ ] Formspree has a real endpoint, anti-spam protection, and the production domain/origin configured and tested.
- [ ] The privacy copy in `public/aviso-de-privacidad.html` has been replaced with client-approved/legal-approved text.
- [ ] `npm test -- --run` and `npm run build` complete successfully using the final assets and configuration.

This repository does not claim a deployment or live performance measurement. Those checks must be performed only after final client-approved assets and production configuration are available.
