import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const titleSchema = z.string().max(120);

const writings = defineCollection({
	loader: glob({ base: "./src/content/writings", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: titleSchema,
		date: z.coerce.date(),
		description: z.string(),
		topics: z.array(z.string()),
		draft: z.boolean().optional(),
	}),
});

const audits = defineCollection({
	loader: glob({ base: "./src/content/audits", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: titleSchema,
		date: z.coerce.date(),
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
		links: z.object({
			repo: z.string().url().optional(),
			report_pdf: z.string().url().optional(),
		}),
	}),
});

const tools = defineCollection({
	loader: glob({ base: "./src/content/tools", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: titleSchema,
		date: z.coerce.date(),
		repo: z.string().url(),
		status: z.enum(["alpha", "beta", "stable"]),
		topics: z.array(z.string()),
		description: z.string(),
	}),
});

const publications = defineCollection({
	loader: glob({ base: "./src/content/publications", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: titleSchema,
		authors: z.array(z.string()),
		year: z.number().int(),
		venue: z.string(),
		type: z.enum(["conference", "journal", "workshop", "preprint"]),
		topics: z.array(z.string()),
		links: z.object({
			pdf: z.string().url().optional(),
			arxiv: z.string().url().optional(),
			doi: z.string().url().optional(),
			code: z.string().url().optional(),
			slides: z.string().url().optional(),
		}),
		featured: z.boolean().optional(),
	}),
});

const paper_reviews = defineCollection({
	loader: glob({ base: "./src/content/paper_reviews", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: titleSchema,
		date: z.coerce.date(),
		paper_authors: z.array(z.string()),
		year: z.number().int(),
		venue: z.string(),
		topics: z.array(z.string()),
		links: z.object({
			pdf: z.string().url().optional(),
			arxiv: z.string().url().optional(),
			doi: z.string().url().optional(),
		}),
		reproduced: z.boolean(),
	}),
});

export const collections = {
	writings,
	audits,
	tools,
	publications,
	paper_reviews,
};
