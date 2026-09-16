export const SITE = {
	title: 'Fuorigioco',
	tagline: 'Appunti, analisi e storie dalla mia grande passione: il calcio.',
	description:
		'Un blog personale di calcio: tattica, Serie A, coppe europee, calciomercato e storie che vale la pena raccontare.',
	author: 'Il tuo nome',
	lang: 'it',
} as const;

export const CATEGORY_IDS = [
	'serie-a',
	'champions-league',
	'nazionali',
	'tattica',
	'calciomercato',
	'storie',
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Category {
	id: CategoryId;
	label: string;
	description: string;
	emoji: string;
}

export const CATEGORIES: Record<CategoryId, Category> = {
	'serie-a': {
		id: 'serie-a',
		label: 'Serie A',
		description: 'Il campionato italiano: partite, squadre, momenti e polemiche.',
		emoji: '🇮🇹',
	},
	'champions-league': {
		id: 'champions-league',
		label: 'Coppe Europee',
		description: 'Champions League, Europa League e le notti che restano.',
		emoji: '🏆',
	},
	nazionali: {
		id: 'nazionali',
		label: 'Nazionali',
		description: 'Italia, Mondiali, Europei e il calcio delle rappresentative.',
		emoji: '🌍',
	},
	tattica: {
		id: 'tattica',
		label: 'Tattica',
		description: 'Moduli, principi di gioco e come si legge una partita.',
		emoji: '📋',
	},
	calciomercato: {
		id: 'calciomercato',
		label: 'Calciomercato',
		description: 'Trattative, prestiti, parametri zero e come funziona il mercato.',
		emoji: '💼',
	},
	storie: {
		id: 'storie',
		label: 'Storie',
		description: 'Squadre, uomini e partite che hanno scritto la storia del calcio.',
		emoji: '📖',
	},
};

export const CATEGORY_LIST: Category[] = CATEGORY_IDS.map((id) => CATEGORIES[id]);

export function categoryOf(id: CategoryId): Category {
	return CATEGORIES[id];
}

export const NAV_LINKS = [
	{ href: '/', label: 'Home' },
	{ href: '/articoli/', label: 'Articoli' },
	{ href: '/categorie/', label: 'Categorie' },
	{ href: '/chi-sono/', label: 'Chi sono' },
] as const;
