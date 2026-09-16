/**
 * Il sito può essere pubblicato in una sottocartella (es. GitHub Pages,
 * https://utente.github.io/calcio/). `import.meta.env.BASE_URL` contiene quel
 * prefisso — "/calcio/" — oppure "/" se il sito sta alla radice.
 *
 * Ogni link interno deve passare da qui, altrimenti in produzione punterebbe
 * alla radice del dominio invece che alla sottocartella.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path = '/'): string {
	// Link esterni, ancore e protocolli speciali passano invariati.
	if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) {
		return path;
	}

	return `${BASE}/${path.replace(/^\/+/, '')}`;
}

/**
 * Verifica se l'URL corrente corrisponde a una voce di navigazione.
 * Serve al menu per evidenziare la pagina attiva.
 */
export function isCurrent(pathname: string, href: string): boolean {
	const target = withBase(href);
	if (target === withBase('/')) {
		return pathname === target;
	}
	return pathname === target || pathname.startsWith(target);
}
