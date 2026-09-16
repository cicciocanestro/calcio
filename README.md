# Fuorigioco

Blog personale di calcio costruito con [Astro](https://astro.build). Sito statico: nessun
database, nessun pannello di amministrazione. Gli articoli sono file Markdown.

## Comandi

| Comando             | Cosa fa                                          |
| :------------------ | :----------------------------------------------- |
| `npm run dev`       | Avvia il dev server su `localhost:4321`          |
| `npm run build`     | Genera il sito di produzione in `./dist/`        |
| `npm run preview`   | Anteprima locale della build di produzione       |
| `npm run check`     | Controlla i tipi TypeScript e gli errori nei .astro |
| `npm run astro ...` | Comandi CLI di Astro (`astro add`, `astro sync`) |

## Struttura

```text
/
├── public/                       asset statici (favicon, immagini)
├── src/
│   ├── components/               Header, Footer, PostCard, BaseHead
│   ├── content/
│   │   └── articoli/             ← gli articoli, in Markdown
│   ├── layouts/                  BaseLayout (pagine), PostLayout (articoli)
│   ├── lib/articoli.ts           funzioni di lettura e formattazione
│   ├── pages/                     le rotte del sito
│   │   ├── index.astro            home
│   │   ├── articoli/index.astro   archivio, raggruppato per anno
│   │   ├── articoli/[id].astro    pagina del singolo articolo
│   │   ├── categorie/             indice e pagine per categoria
│   │   ├── chi-sono.astro         pagina personale (da personalizzare)
│   │   ├── 404.astro              pagina di errore
│   │   └── rss.xml.ts             feed RSS
│   ├── styles/global.css          stile globale (tema scuro, accenti verdi)
│   ├── consts.ts                  titolo, autore e categorie
│   └── content.config.ts          schema degli articoli
└── astro.config.mjs
```

## Scrivere un nuovo articolo

Crea un file `.md` in `src/content/articoli/`. Il nome del file diventa l'URL: il file
`grande-torino.md` sarà raggiungibile su `/articoli/grande-torino/`.

```markdown
---
title: 'Titolo dell''articolo'
description: 'Una riga: comparirà nell''elenco, nei risultati di ricerca e nel feed RSS.'
pubDate: 2026-09-16
category: tattica
tags: ['pressing', 'serie a']
featured: false
draft: false
---

Il testo dell'articolo comincia qui.
```

### Frontmatter

| Campo         | Obbligatorio | Descrizione                                                       |
| :------------ | :----------- | :---------------------------------------------------------------- |
| `title`       | sì           | Titolo, massimo 120 caratteri                                     |
| `description` | sì           | Sommario, massimo 300 caratteri                                   |
| `pubDate`     | sì           | Data di pubblicazione, `AAAA-MM-GG`                               |
| `category`    | sì           | Una delle categorie (vedi sotto)                                  |
| `tags`        | no           | Elenco di tag, mostrati in fondo all'articolo                     |
| `updatedDate` | no           | Se presente, appare come "Aggiornato il …"                        |
| `cover`       | no           | Percorso immagine di copertina (es. `/immagini/partita.jpg`)      |
| `coverAlt`    | no           | Testo alternativo della copertina                                 |
| `featured`    | no           | `true` mette l'articolo in evidenza in home                       |
| `draft`       | no           | `true` lo nasconde in produzione, ma lo mostra in `npm run dev`   |

### Categorie disponibili

`serie-a`, `champions-league`, `nazionali`, `tattica`, `calciomercato`, `storie`

Per aggiungerne una, modifica `CATEGORY_IDS` e `CATEGORIES` in `src/consts.ts`. La pagina della
categoria viene creata automaticamente.

## Personalizzare il sito

- **Titolo, autore, descrizione** → `src/consts.ts` (oggetto `SITE`)
- **Nome e testi della pagina "Chi sono"** → `src/pages/chi-sono.astro`
- **Colori e tipografia** → variabili CSS in cima a `src/styles/global.css`
- **Dominio** → campi `site` e `base` in `astro.config.mjs` (vedi la sezione Deploy)

## Deploy

Il sito è pubblicato su **GitHub Pages**:

**https://cicciocanestro.github.io/calcio/**

Il deploy è automatico: ogni `git push` su `main` fa partire la workflow in
`.github/workflows/deploy.yml`, che installa le dipendenze, controlla i tipi, builda il sito e lo
pubblica. Lo stato si vede nella tab **Actions** del repository.

### Perché c'è `base: '/calcio'` nella configurazione

Il repo si chiama `calcio`, quindi GitHub Pages lo serve in una **sottocartella** e non alla
radice del dominio. Il campo `base` in `astro.config.mjs` aggiunge quel prefisso a tutti i link.

Questo ha due conseguenze pratiche.

**Se aggiungi un dominio personalizzato** (es. `fuorigioco.it`), il sito passa alla radice: in
`astro.config.mjs` cambia `site` nel tuo dominio e **rimuovi la riga `base`**. Se non lo fai, i
link punterebbero a `fuorigioco.it/calcio/`.

**Quando scrivi link interni** in un componente, usa sempre la funzione `withBase()` da
`src/lib/url.ts`, mai un percorso assoluto scritto a mano:

```astro
<a href={withBase('/articoli/')}>Tutti gli articoli</a>
```

Un `href="/articoli/"` scritto a mano funziona in locale ma si rompe in produzione, perché
punta alla radice del dominio invece che alla sottocartella.

### Deploy su altre piattaforme

Il sito è completamente statico: `npm run build` produce la cartella `dist/` che si può
pubblicare ovunque (Netlify, Vercel, Cloudflare Pages). Su quelle piattaforme il sito sta alla
radice, quindi va rimossa la riga `base` da `astro.config.mjs`.
