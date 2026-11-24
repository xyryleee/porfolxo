# Portfolio Project Context

## Application

This is Xyryle Adrian B. Cator's single-page web developer portfolio, built with React and Vite. `index.html` loads the app, and `src/App.jsx` composes the Home, Life, About, Projects, and Contact sections.

## Source layout

- `src/components/` — reusable UI components.
- `src/hooks/` — reusable React hooks.
- `src/lib/` — helper functions.
- `src/sections/` — portfolio page sections.
- `src/styles/` — global and site-wide styles.
- `public/` — favicon and web manifest assets.
- `assets/` — portfolio imagery and media copied into production builds by Vite.

## Contact form

The Contact section sends messages through EmailJS. Configure `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` in a local `.env` for development and as GitHub Actions secrets for deployment. The EmailJS template expects `from_name`, `from_email`, `subject`, and `message`.

## Commands

- `npm run dev` starts the local development server.
- `npm run build` creates the production site in `dist/`.
- `npm run preview` serves the production build locally.
