import { getCollection, type CollectionEntry } from 'astro:content';

import { CATEGORY_LIST, type CategoryId } from '../consts';

export type Articolo = CollectionEntry<'articoli'>;

function perDataDecrescente(a: Articolo, b: Articolo): number {
	return b.data.pubDate.getTime() - a.data.pubDate.getTime();
}

/**
 * Tutti gli articoli pubblicati, dal più recente al più vecchio.
 * Le bozze sono escluse in produzione e visibili solo in `astro dev`.
 */
export async function getArticoli(): Promise<Articolo[]> {
	const articoli = await getCollection('articoli', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	return articoli.sort(perDataDecrescente);
}

export async function getArticoliPerCategoria(category: CategoryId): Promise<Articolo[]> {
	const articoli = await getArticoli();
	return articoli.filter((articolo) => articolo.data.category === category);
}

export async function getArticoliInEvidenza(limite = 3): Promise<Articolo[]> {
	const articoli = await getArticoli();
	const evidenza = articoli.filter((articolo) => articolo.data.featured);
	const resto = articoli.filter((articolo) => !articolo.data.featured);

	return [...evidenza, ...resto].slice(0, limite);
}

/**
 * Conteggio degli articoli per categoria, usato nella pagina delle categorie.
 */
export async function contaPerCategoria(): Promise<Record<CategoryId, number>> {
	const articoli = await getArticoli();
	const conteggi = Object.fromEntries(CATEGORY_LIST.map((c) => [c.id, 0])) as Record<
		CategoryId,
		number
	>;

	for (const articolo of articoli) {
		conteggi[articolo.data.category] += 1;
	}

	return conteggi;
}

export function formattaData(data: Date): string {
	return new Intl.DateTimeFormat('it-IT', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(data);
}

export function formattaDataBreve(data: Date): string {
	return new Intl.DateTimeFormat('it-IT', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(data);
}

export function tempoDiLettura(body: string | undefined): string {
	const parole = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
	const minuti = Math.max(1, Math.round(parole / 200));
	return `${minuti} min di lettura`;
}
