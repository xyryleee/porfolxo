# Xyryle Portfolio

Personal web developer portfolio built with React and Vite as a single-page site.

## Development

```sh
npm install
npm run dev
```

Create a local `.env` from `.env.example` and set the EmailJS values before testing contact form delivery. The deployment workflow reads `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` from GitHub Actions secrets.

## Build and deploy

```sh
npm run build
npm run preview
```

GitHub Actions builds and deploys the `dist/` output to GitHub Pages. The site uses `index.html` as its entry point, with app code in `src/`, static icons in `public/`, and portfolio media in `assets/`.
