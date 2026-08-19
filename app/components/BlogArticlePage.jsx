import { BookingBand, SiteFooter, SiteHeader } from "./SiteChrome";
import BlogArticleAnimations from "./BlogArticleAnimations";
import { blogArticles } from "../site-data";
import { imageDimensions } from "../image-data";
import { SITE_URL } from "../seo-config";

export default function BlogArticlePage({ slug, article: suppliedArticle, articles: suppliedArticles }) {
  const articles = suppliedArticles || blogArticles;
  const article = suppliedArticle || articles[slug];
  if (!article) return null;
  const related = Object.entries(articles).filter(([key]) => key !== slug).slice(0, 2);
  const titleWords = article.title.split(" ");
  const titleAccent = titleWords.slice(-2).join(" ");
  const titleLead = titleWords.slice(0, -2).join(" ");
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const articleImage = imageDimensions(article.image);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    url: articleUrl,
    headline: article.title,
    description: article.dek,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${article.image}`,
      width: articleImage.width,
      height: articleImage.height,
      caption: article.imageAlt,
    },
    datePublished: "2026-08-03",
    dateModified: "2026-08-04",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#venue` },
    mainEntityOfPage: articleUrl,
    articleSection: article.category,
    keywords: [article.category, "event planning", "Northern Virginia", "Manassas", "Magnoliya Grand", ...article.checklist],
    inLanguage: "en-US",
  };

  return (
    <main className="interior-page page-blog blog-article-page">
      <SiteHeader />
      <BlogArticleAnimations />
      <article>
        <header className="page-hero blog-detail-hero">
          <img {...imageDimensions(article.image)} src={article.image} alt={article.imageAlt} loading="eager" fetchPriority="high" decoding="async" />
          <div className="journal-hero-mark" aria-hidden="true">
            <span>THE</span><strong>JOURNAL</strong><small>Ideas · Places · Occasions</small>
          </div>
          <div className="page-hero-shade" />
          <div className="page-hero-copy">
            <p className="eyebrow"><span /> {article.category} · {article.readTime}</p>
            <h1>{titleLead}<br /><em>{titleAccent}</em></h1>
            <p>{article.dek}</p>
          </div>
        </header>

        <div className="blog-article-layout">
          <aside className="blog-article-rail blog-article-reveal">
            <p>Article details</p>
            <dl>
              <div><dt>Published</dt><dd>August 3, 2026</dd></div>
              <div><dt>Category</dt><dd>{article.category}</dd></div>
              <div><dt>Reading time</dt><dd>{article.readTime}</dd></div>
            </dl>
            <a href="/contact">Ask our events team <span>↗</span></a>
          </aside>

          <div className="blog-article-content">
            <p className="blog-article-lead blog-article-reveal">{article.intro}</p>
            <blockquote className="blog-article-quote blog-article-reveal">
              <span>“</span><p>{article.quote}</p>
            </blockquote>

            {article.sections.map((section, index) => (
              <section className={`blog-story-section blog-article-reveal ${index % 2 ? "is-reverse" : ""}`} id={`chapter-${index + 1}`} key={section.title}>
                <figure>
                  <img {...imageDimensions(section.image)} src={section.image} alt={`${section.title} at Magnoliya Grand`} loading="lazy" decoding="async" />
                  <figcaption>Magnoliya Grand · Manassas, Virginia</figcaption>
                </figure>
                <div>
                  <p className="section-kicker">{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </div>
              </section>
            ))}

            <section className="blog-checklist blog-article-reveal">
              <div>
                <p className="section-kicker">Save for your venue tour</p>
                <h2>Your essential<br /><em>planning checklist.</em></h2>
              </div>
              <ol>{article.checklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
            </section>

            <footer className="blog-article-signoff blog-article-reveal">
              <span>MG</span>
              <div><p>Prepared by the Magnoliya Grand events team</p><small>Planning guidance for remarkable gatherings in Northern Virginia.</small></div>
            </footer>
          </div>
        </div>
      </article>

      <section className="blog-related">
        <div className="blog-related__heading blog-article-reveal"><p className="section-kicker">Continue reading</p><h2>More from<br /><em>the journal.</em></h2></div>
        <div className="blog-related__grid">
          {related.map(([key, item]) => (
            <a href={`/blog/${key}`} className="blog-related__card blog-article-reveal" key={key}>
              <img {...imageDimensions(item.image)} src={item.image} alt={item.imageAlt || `${item.title} at Magnoliya Grand`} loading="lazy" decoding="async" />
              <div><span>{item.category} · {item.readTime}</span><h3>{item.title}</h3><p>Read article ↗</p></div>
            </a>
          ))}
        </div>
      </section>
      <BookingBand title="Bring your next gathering to life." />
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
