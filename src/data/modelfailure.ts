import { type CollectionEntry, getCollection } from "astro:content";

export type DatedEntry =
	| CollectionEntry<"writings">
	| CollectionEntry<"audits">
	| CollectionEntry<"tools">
	| CollectionEntry<"paper_reviews">;

export interface LatestItem {
	collection: "writings" | "audits" | "tools" | "paper_reviews";
	date: Date;
	description: string;
	link: string;
	title: string;
}

export async function getWritings() {
	return await getCollection("writings", ({ data }) => (import.meta.env.PROD ? !data.draft : true));
}

export async function getAudits() {
	return await getCollection("audits");
}

export async function getTools() {
	return await getCollection("tools");
}

export async function getPublications() {
	return await getCollection("publications");
}

export async function getPaperReviews() {
	return await getCollection("paper_reviews");
}

export function sortByDateDesc<T extends DatedEntry>(entries: T[]) {
	return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function sortPublications(entries: CollectionEntry<"publications">[]) {
	return entries.sort((a, b) => b.data.year - a.data.year);
}

export async function getLatestFeedItems(limit: number) {
	const [writings, audits, tools, reviews] = await Promise.all([
		getWritings(),
		getAudits(),
		getTools(),
		getPaperReviews(),
	]);

	const items: LatestItem[] = [
		...writings.map((entry) => ({
			collection: "writings" as const,
			date: entry.data.date,
			description: entry.data.description,
			link: `/writings/${entry.id}/`,
			title: entry.data.title,
		})),
		...audits.map((entry) => ({
			collection: "audits" as const,
			date: entry.data.date,
			description: entry.data.scope,
			link: `/audits/${entry.id}/`,
			title: entry.data.title,
		})),
		...tools.map((entry) => ({
			collection: "tools" as const,
			date: entry.data.date,
			description: entry.data.description,
			link: `/tools/${entry.id}/`,
			title: entry.data.title,
		})),
		...reviews.map((entry) => ({
			collection: "paper_reviews" as const,
			date: entry.data.date,
			description: `${entry.data.venue} (${entry.data.year})`,
			link: `/research/reviews/${entry.id}/`,
			title: entry.data.title,
		})),
	];

	return items.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, limit);
}
