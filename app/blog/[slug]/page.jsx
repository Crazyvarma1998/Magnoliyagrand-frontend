import { notFound } from "next/navigation";
import BlogArticlePage from "../../components/BlogArticlePage";
import { blogArticles } from "../../site-data";
import { getCmsBlogCollection, getCmsBlogPost } from "../../cms-client";

const BLOG_SEO_TITLES = {
  "choosing-northern-virginia-wedding-venue": "Northern Virginia Wedding Venue Guide | Magnoliya Grand",
  "planning-conference-near-dulles-airport": "Conference Planning Near Dulles | Magnoliya Grand",
  "ballroom-layouts-galas-fundraisers": "Gala Ballroom Layout Guide | Magnoliya Grand",
  "indoor-outdoor-wedding-flow": "Indoor & Outdoor Wedding Planning | Magnoliya Grand",
  "event-venue-checklist": "Event Venue Checklist | Magnoliya Grand",
  "multicultural-celebration": "Multicultural Celebration Guide | Magnoliya Grand",
};

export function generateStaticParams() {
  return Object.keys(blogArticles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getCmsBlogPost(slug, blogArticles[slug]);
  if (!article) return {};
  return {
    title: BLOG_SEO_TITLES[slug] || `${article.title} | Magnoliya Grand`,
    description: article.dek,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      url: `/blog/${slug}`,
      siteName: "Magnoliya Grand",
      locale: "en_US",
      publishedTime: "2026-08-03T00:00:00-04:00",
      modifiedTime: "2026-08-04T00:00:00-04:00",
      authors: ["Magnoliya Grand Events Team"],
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: BLOG_SEO_TITLES[slug] || article.title,
      description: article.dek,
      images: [article.image],
    },
  };
}

export default async function BlogArticleRoute({ params }) {
  const { slug } = await params;
  const article = await getCmsBlogPost(slug, blogArticles[slug]);
  if (!article) notFound();
  const articles = await getCmsBlogCollection(blogArticles);
  return <BlogArticlePage slug={slug} article={article} articles={articles} />;
}
