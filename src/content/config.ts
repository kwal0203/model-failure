import { defineCollection, z } from 'astro:content';

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    topics: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

const audits = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    target_name: z.string(),
    target_link: z.string().url(),
    target_version: z.string(),
    scope: z.string(),
    severity_summary: z.object({
      critical: z.number().int().nonnegative(),
      high: z.number().int().nonnegative(),
      medium: z.number().int().nonnegative(),
      low: z.number().int().nonnegative(),
    }),
    topics: z.array(z.string()),
    links: z
      .object({
        repo: z.string().url().optional(),
        report_pdf: z.string().url().optional(),
      })
      .optional(),
  }),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    repo: z.string().url(),
    status: z.enum(['alpha', 'beta', 'stable']),
    topics: z.array(z.string()),
    description: z.string(),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number().int(),
    venue: z.string(),
    type: z.enum(['conference', 'journal', 'workshop', 'preprint']),
    topics: z.array(z.string()),
    links: z.object({
      pdf: z.string().url().optional(),
      arxiv: z.string().url().optional(),
      doi: z.string().optional(),
      code: z.string().url().optional(),
      slides: z.string().url().optional(),
    }),
    featured: z.boolean().optional(),
  }),
});

const paperReviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    paper_authors: z.array(z.string()),
    year: z.number().int(),
    venue: z.string(),
    topics: z.array(z.string()),
    links: z.object({
      pdf: z.string().url().optional(),
      arxiv: z.string().url().optional(),
      doi: z.string().optional(),
    }),
    reproduced: z.boolean(),
  }),
});

export const collections = {
  writings,
  audits,
  tools,
  publications,
  paper_reviews: paperReviews,
};
