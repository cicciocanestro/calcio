import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { SITE } from '../consts';
import { getArticoli } from '../lib/articoli';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
	const articoli = await getArticoli();

	// Il sito vive in una sottocartella: il feed deve contenere URL assoluti
	// completi di base path, altrimenti i lettori RSS puntano alla radice del dominio.
	const origine = context.site ?? new URL('https://cicciocanestro.github.io');
	const assoluto = (path: string) => new URL(withBase(path), origine).href;

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: assoluto('/'),
		items: articoli.map((articolo) => ({
			title: articolo.data.title,
			description: articolo.data.description,
			pubDate: articolo.data.pubDate,
			link: assoluto(`/articoli/${articolo.id}/`),
			categories: [articolo.data.category, ...articolo.data.tags],
		})),
		customData: '<language>it-IT</language>',
	});
}
