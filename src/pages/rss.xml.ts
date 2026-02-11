import rss from "@astrojs/rss";
import { getAudits, getPaperReviews, getTools, getWritings } from "@/data/modelfailure";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const [writings, audits, tools, reviews] = await Promise.all([
		getWritings(),
		getAudits(),
		getTools(),
		getPaperReviews(),
	]);

	const items = [
		...writings.map((entry) => ({
			title: entry.data.title,
			description: entry.data.description,
			pubDate: entry.data.date,
			link: `/writings/${entry.id}/`,
		})),
		...audits.map((entry) => ({
			title: entry.data.title,
			description: entry.data.scope,
			pubDate: entry.data.date,
			link: `/audits/${entry.id}/`,
		})),
		...tools.map((entry) => ({
			title: entry.data.title,
			description: entry.data.description,
			pubDate: entry.data.date,
			link: `/tools/${entry.id}/`,
		})),
		...reviews.map((entry) => ({
			title: entry.data.title,
			description: `${entry.data.venue} (${entry.data.year})`,
			pubDate: entry.data.date,
			link: `/research/reviews/${entry.id}/`,
		})),
	].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items,
	});
};
