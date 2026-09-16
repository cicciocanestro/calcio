import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { CATEGORY_IDS } from './consts';

const articoli = defineCollection({
	loader: glob({ base: './src/content/articoli', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string().max(120),
		description: z.string().max(300),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.enum(CATEGORY_IDS),
		tags: z.array(z.string()).default([]),
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

export const collections = { articoli };
