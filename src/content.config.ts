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

const concepts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/concepts' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).optional(),
    short_description: z.string(),
    discipline: z.string(),
    tags: z.array(z.string()),
    origin: z.string(),
    rating: z.number().min(0).max(5),
    linked_notes: z.number(),
    field_note: z.string().optional(),
    notes_of_used: z.array(z.string()).optional(),
    related_concepts: z.array(z.string()).optional(),
    date_added: z.date(),
  }),
});

const quotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/quotes' }),
  schema: z.object({
    text: z.string(),
    author: z.string(),
    source: z.string().optional(),
    tags: z.array(z.string()),
    stars: z.number().min(0).max(3),
    summary: z.string().optional(),
    date_added: z.date(),
  }),
});

export const collections = { definitions, concepts, quotes };