import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const [writings, audits, tools, reviews] = await Promise.all([
    getCollection('writings', ({ data }) => !data.draft),
    getCollection('audits'),
    getCollection('tools'),
    getCollection('paper_reviews'),
  ]);

  const items = [
    ...writings.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: new Date(entry.data.date),
      link: `/writings/${entry.slug}/`,
    })),
    ...audits.map((entry) => ({
      title: entry.data.title,
      description: `${entry.data.target_name} (${entry.data.target_version})`,
      pubDate: new Date(entry.data.date),
      link: `/audits/${entry.slug}/`,
    })),
    ...tools.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: new Date(entry.data.date),
      link: `/tools/${entry.slug}/`,
    })),
    ...reviews.map((entry) => ({
      title: entry.data.title,
      description: `${entry.data.venue} (${entry.data.year})`,
      pubDate: new Date(entry.data.date),
      link: `/research/reviews/${entry.slug}/`,
    })),
  ].sort((a, b) => +b.pubDate - +a.pubDate);

  return rss({
    title: 'Model Failure',
    description: 'AI security writings, audits, tools, and research reviews.',
    site: context.site,
    items,
  });
}
