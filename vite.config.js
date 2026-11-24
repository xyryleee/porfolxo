import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { cpSync } from 'node:fs';

export default defineConfig({
  // A custom domain serves the site at the domain root.
  base: '/',
  plugins: [react(), tailwindcss()],
  // The site's media lives in the top-level assets directory, outside Vite's
  // default public directory. Copy it into each production build.
  build: {
    copyPublicDir: true,
    rollupOptions: {
      plugins: [
        {
          name: 'copy-site-assets',
          writeBundle() {
            cpSync(fileURLToPath(new URL('./assets', import.meta.url)), fileURLToPath(new URL('./dist/assets', import.meta.url)), { recursive: true });
          },
        },
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
