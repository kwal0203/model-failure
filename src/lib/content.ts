import { getCollection } from 'astro:content';

function byDateDesc(a, b) {
  return +new Date(b.data.date) - +new Date(a.data.date);
}

export async function getWritings() {
  const entries = await getCollection('writings', ({ data }) => !data.draft);
  return entries.sort(byDateDesc);
}

export async function getAudits() {
  const entries = await getCollection('audits');
  return entries.sort(byDateDesc);
}

export async function getTools() {
  const entries = await getCollection('tools');
  return entries.sort(byDateDesc);
}

export async function getPublications() {
  const entries = await getCollection('publications');
  return entries.sort(
    (a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title),
  );
}

export async function getPaperReviews() {
  const entries = await getCollection('paper_reviews');
  return entries.sort(byDateDesc);
}

export async function getLatestMixed(limit = 6) {
  const [writings, audits, tools, reviews] = await Promise.all([
    getWritings(),
    getAudits(),
    getTools(),
    getPaperReviews(),
  ]);

  return [
    ...writings.map((entry) => ({
      title: entry.data.title,
      date: entry.data.date,
      href: `/writings/${entry.slug}/`,
      kind: 'writing',
    })),
    ...audits.map((entry) => ({
      title: entry.data.title,
      date: entry.data.date,
      href: `/audits/${entry.slug}/`,
      kind: 'audit',
    })),
    ...tools.map((entry) => ({
      title: entry.data.title,
      date: entry.data.date,
      href: `/tools/${entry.slug}/`,
      kind: 'tool',
    })),
    ...reviews.map((entry) => ({
      title: entry.data.title,
      date: entry.data.date,
      href: `/research/reviews/${entry.slug}/`,
      kind: 'review',
    })),
  ]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}
