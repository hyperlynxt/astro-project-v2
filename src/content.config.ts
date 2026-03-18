import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const definitions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/definitions' }),
  schema: z.object({
    title: z.string(),
    part_of_speech: z.string(),
    pronunciation: z.string().optional(),
    definition: z.string(),
    discipline: z.string().optional(),
    tags: z.array(z.string()),
    etymology: z.string().optional(),
    personal_note: z.string().optional(),
    rating: z.number().min(0).max(3),
    date_added: z.date(),
  }),
});

export const collections = { definitions };