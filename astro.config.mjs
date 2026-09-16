// @ts-check
import { defineConfig } from 'astro/config';

// Il sito è pubblicato su GitHub Pages come "project page", quindi vive in una
// sottocartella: https://cicciocanestro.github.io/calcio/
// Se un giorno usi un dominio personalizzato, rimuovi `base` e aggiorna `site`.
export default defineConfig({
	site: 'https://cicciocanestro.github.io',
	base: '/calcio',
});
