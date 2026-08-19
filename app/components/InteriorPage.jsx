import { BookingBand, SiteFooter, SiteHeader } from "./SiteChrome";
import CelebrationBookExact from "./CelebrationBookExact";
import GalleryCarousel from "./GalleryCarousel";
import WeddingScrollAnimations from "./WeddingScrollAnimations";
import EventPageScrollAnimations from "./EventPageScrollAnimations";
import AboutScrollAnimations from "./AboutScrollAnimations";
import ServicesScrollAnimations from "./ServicesScrollAnimations";
import RoomsSuitesExperience from "./RoomsSuitesExperience";
import RoomsSuitesScrollAnimations from "./RoomsSuitesScrollAnimations";
import ContactExperience from "./ContactExperience";
import BallroomCollection from "./BallroomCollection";
import { imageDimensions } from "../image-data";
import { SITE_URL } from "../seo-config";

const EVENT_PAGE_SLUGS = [
  "weddings",
  "corporate-conferences",
  "meetings-seminars",
  "galas-fundraisers",
  "cultural-music-concerts",
  "trade-shows-expos",
  "milestone-celebrations",
];

export function createPageMetadata(slug, page, seoTitle) {
  if (!page) return {};

  return {
    title: seoTitle || `${page.navLabel} | Magnoliya Grand`,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${page.title} ${page.accent} | Magnoliya Grand`,
      description: page.description,
      url: `/${slug}`,
      siteName: "Magnoliya Grand",
      locale: "en_US",
      images: [{ url: page.heroImage, alt: `${page.navLabel} at Magnoliya Grand in Manassas, Virginia` }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle || `${page.navLabel} | Magnoliya Grand`,
      description: page.description,
      images: [page.heroImage],
    },
  };
}

function breadcrumbSchema(slug, label) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${slug}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE_URL}/${slug}` },
    ],
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function pageSchema(page, slug, seoTitle) {
  const url = `${SITE_URL}/${slug}`;
  const pageTypes = {
    about: "AboutPage",
    contact: "ContactPage",
    events: "CollectionPage",
    gallery: "CollectionPage",
    blog: "Blog",
    privacy: "WebPage",
    faq: "WebPage",
    venue: "WebPage",
    features: "WebPage",
    services: "CollectionPage",
  };

  if (!EVENT_PAGE_SLUGS.includes(slug)) {
    return {
      "@context": "https://schema.org",
      "@type": pageTypes[slug] || "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: seoTitle || `${page.navLabel} | Magnoliya Grand`,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#venue` },
      breadcrumb: { "@id": `${url}#breadcrumbs` },
      inLanguage: "en-US",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${page.navLabel} at Magnoliya Grand`,
    serviceType: page.navLabel,
    description: page.description,
    url,
    areaServed: [
      { "@type": "City", name: "Manassas" },
      { "@type": "AdministrativeArea", name: "Northern Virginia" },
      { "@type": "City", name: "Washington, D.C." },
    ],
    provider: { "@id": `${SITE_URL}/#venue` },
    audience: {
      "@type": "Audience",
      audienceType: `Hosts and planners seeking ${page.navLabel.toLowerCase()} in Northern Virginia`,
    },
  };
}

function venueSpacesSchema(rows) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/venue#spaces`,
    name: "Magnoliya Grand venue spaces and capacities",
    numberOfItems: rows.length,
    itemListElement: rows.map(([name, banquet, theater], index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name,
        containedInPlace: { "@id": `${SITE_URL}/#venue` },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Banquet capacity", value: banquet },
          { "@type": "PropertyValue", name: "Theater capacity", value: theater },
        ],
      },
    })),
  };
}

function Stats({ items }) {
  if (!items?.length) return null;
  return (
    <div className="page-stats">
      {items.map((item) => (
        <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
      ))}
    </div>
  );
}

function EditorialSections({ sections, linkLabel = "Plan your event", linkHref = "/contact" }) {
  if (!sections) return null;
  return (
    <section className="page-editorial">
      {sections.map((section, index) => (
        <article className={index % 2 ? "reverse" : ""} key={section.title}>
          <div className="editorial-image">
            <img {...imageDimensions(section.image)} src={section.image} alt={`${section.title} at Magnoliya Grand`} loading="lazy" decoding="async" />
          </div>
          <div className="editorial-copy">
            <p className="section-kicker">{section.kicker}</p>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            <a className="line-link dark-link" href={section.linkHref || linkHref}>{section.linkLabel || linkLabel} <span>↗</span></a>
          </div>
        </article>
      ))}
    </section>
  );
}

function CapacityTable({ rows, additionalSpaces }) {
  if (!rows) return null;
  return (
    <section className="capacity-section">
      <div className="capacity-heading">
        <p className="section-kicker">Ballroom capacity</p>
        <h2>Ballroom<br /><em>Capacity.</em></h2>
        <p>Final layouts and capacities depend on staging, dance floors, service requirements, and production. Our team will prepare a custom plan.</p>
      </div>
      <div className="capacity-table-wrap">
        <table>
          <caption>Magnoliya Grand ballroom banquet and theater capacities</caption>
          <thead><tr><th scope="col">Ballroom</th><th scope="col">Banquet Capacity</th><th scope="col">Theater Capacity</th></tr></thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  cellIndex === 0
                    ? <th scope="row" key={`${rowIndex}-${cellIndex}`}>{cell}</th>
                    : <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {additionalSpaces?.length > 0 && (
        <div className="additional-spaces" aria-labelledby="additional-spaces-title">
          <div>
            <p className="section-kicker">Beyond the ballroom</p>
            <h3 id="additional-spaces-title">Outdoor / Additional Spaces</h3>
          </div>
          <dl>
            {additionalSpaces.map(([name, capacity]) => (
              <div key={name}><dt>{name}</dt><dd>{capacity}</dd></div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

function FeatureGrid({ items, linkLabel = "Explore event" }) {
  if (!items) return null;
  return (
    <section className="feature-page-grid">
      {items.map(([title, body, image, href]) => (
        <article key={title} className={href ? "linked-feature" : ""}>
          <img {...imageDimensions(image)} src={image} alt={`${title} at Magnoliya Grand`} loading="lazy" decoding="async" />
          <div><h2>{title}</h2><p>{body}</p></div>
          {href && <a className="feature-card-hit-area" href={href} aria-label={`${linkLabel}: ${title}`} />}
          {href && <a href={href} aria-label={`${linkLabel}: ${title}`}>{linkLabel} <span>↗</span></a>}
        </article>
      ))}
    </section>
  );
}

function ServicesShowcase({ items }) {
  if (!items?.length) return null;

  return (
    <section className="services-showcase" aria-labelledby="services-showcase-title">
      {/* <header className="services-showcase__header">
        <div>
          <p className="section-kicker">Designed around your occasion</p>
          <h2 id="services-showcase-title">Expert partners.<br /><em>Seamless execution.</em></h2>
        </div>
        <p>From the first planning conversation to the final cue, every service is brought together around your guests, your priorities, and your vision.</p>
      </header> */}
      <div className="services-showcase__list">
        {items.map((item) => (
          <article className={`service-detail-card${item.imageFit === "contain" ? " service-detail-card--contain" : ""}`} key={item.title}>
            <div className="service-detail-card__image">
              <img {...imageDimensions(item.image)} src={item.image} alt={`${item.title} at Magnoliya Grand`} loading="lazy" decoding="async" />
            </div>
            <div className="service-detail-card__copy">
              <span className="service-detail-card__icon" aria-hidden="true">{item.icon}</span>
              <p className="service-detail-card__label">Magnoliya Grand service</p>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery({ images }) {
  if (!images?.length) return null;
  return <GalleryCarousel images={images} />;
}

function PlanningFacts({ facts, slug }) {
  if (!facts) return null;
  return (
    <section className="planning-facts" aria-labelledby={`${slug}-planning-facts-title`}>
      <header>
        <p className="section-kicker">Planning facts</p>
        <h2 id={`${slug}-planning-facts-title`}>{facts.title}</h2>
        <p>{facts.summary}</p>
      </header>
      <dl>
        {facts.items.map(([term, description]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function MatterportTour() {
  return (
    <section className="matterport-tour" aria-label="Explore the Magnoliya Grand venue in 3D">
      <div className="matterport-tour__heading">
        <p className="section-kicker">Explore before you arrive</p>
        <h2>Walk through<br /><em>Magnoliya Grand.</em></h2>
      </div>
      <div className="matterport-tour__viewer">
        <div className="matterport-tour__frame">
          <iframe
            title="Interactive 3D tour of Magnoliya Grand"
            src="https://my.matterport.com/show/?m=6iY6GLp6o9B&play=1&qs=1"
            allow="fullscreen; autoplay; xr-spatial-tracking"
            loading="lazy"
          />
        </div>
        <div className="matterport-tour__instruction">
          <span className="matterport-tour__instruction-mark" aria-hidden="true">↔</span>
          <div>
            <span className="matterport-tour__instruction-label">Interactive walkthrough</span>
            <p>Move through the venue in an immersive 3D tour. <span>Drag to look around</span>, <span>click to move between spaces</span>, and use the controls to explore at your own pace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hotel360Tour() {
  return (
    <section className="hotel-tour" id="rooms-suites" aria-labelledby="hotel-tour-title">
      <header className="hotel-tour__heading">
        <div>
          <p className="section-kicker">Stay connected to the celebration</p>
          <h2 id="hotel-tour-title">Hotel <em>360</em></h2>
        </div>
        <p>Explore the connected Hilton Garden Inn before your visit, from guest spaces to hotel amenities.</p>
      </header>
      <div className="hotel-tour__frame">
        <iframe
          title="360 degree virtual tour of Hilton Garden Inn Manassas"
          src="https://www.gotyoulooking.com/1hiltongardenmanassasva/mht.html"
          allow="autoplay; fullscreen; gyroscope; accelerometer"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="hotel-tour__instruction">
        <span aria-hidden="true">360°</span>
        Click and drag to look around, scroll to zoom in and out.
      </p>
    </section>
  );
}

function CourtyardSpotlight({ content }) {
  if (!content) return null;
  return (
    <section className="courtyard-spotlight" aria-labelledby="courtyard-spotlight-title">
      <div className="courtyard-spotlight__image">
        <img
          src={content.image}
          alt={content.imageAlt || "Courtyard by Marriott Manassas Battlefield Park exterior"}
          width={content.imageWidth || 1672}
          height={content.imageHeight || 941}
          loading="lazy"
          decoding="async"
        />
        <span aria-hidden="true">Stay nearby</span>
      </div>
      <div className="courtyard-spotlight__copy">
        <p className="section-kicker">{content.eyebrow || "Another place to stay"}</p>
        <h2 id="courtyard-spotlight-title">{content.title}</h2>
        <h3>{content.subtitle}</h3>
        <p>{content.description}</p>
        {content.linkHref && content.linkLabel && (
          <a href={content.linkHref} target="_blank" rel="noreferrer">
            {content.linkLabel} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <div className="courtyard-spotlight__number" aria-hidden="true">149</div>
    </section>
  );
}

function Faqs({ faqs }) {
  if (!faqs) return null;
  return (
    <section className="faq-section">
      <div>
        <p className="section-kicker">Clear answers</p>
        <h2>Know before<br /><em>you arrive.</em></h2>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Policy({ items }) {
  if (!items) return null;
  return (
    <section className="policy-section">
      {items.map(([title, body], index) => (
        <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{body}</p></div></article>
      ))}
    </section>
  );
}

export default function InteriorPage({ slug, page, planningFacts, seoTitle }) {
  const shouldShowFaqs = Boolean(page.faqs) && !EVENT_PAGE_SLUGS.includes(slug);

  const schemas = [breadcrumbSchema(slug, page.navLabel), pageSchema(page, slug, seoTitle)];
  if (shouldShowFaqs) schemas.push(faqSchema(page.faqs));
  if (slug === "venue" && page.table) schemas.push(venueSpacesSchema(page.table));

  return (
    <main className={`interior-page page-${slug}`}>
      <SiteHeader />
      <section className="page-hero">
        <img {...imageDimensions(page.heroImage)} src={page.heroImage} alt={`${page.navLabel} at Magnoliya Grand in Manassas, Virginia`} loading="eager" fetchPriority="high" decoding="async" />
        {slug === "venue" && (
          <div className="venue-hero-architecture" aria-hidden="true">
            <span /><span /><span />
          </div>
        )}
        {slug === "events" && (
          <div className="events-hero-aura" aria-hidden="true">
            <span /><span /><span />
          </div>
        )}
        {slug === "blog" && (
          <div className="journal-hero-mark" aria-hidden="true">
            <span>THE</span><strong>JOURNAL</strong><small>Ideas · Places · Occasions</small>
          </div>
        )}
        <div className="page-hero-shade" />
        <div className="page-hero-copy">
          <p className="eyebrow"><span /> {page.eyebrow}</p>
          <h1>{page.title}<br /><em>{page.accent}</em></h1>
          <p>{page.description}</p>
        </div>
      </section>

      {slug === "venue" && (
        <>
          <MatterportTour />
          <Hotel360Tour />
          <CourtyardSpotlight content={page.courtyardSpotlight} />
          <BallroomCollection config={page.ballroomCollection} />
        </>
      )}

      {page.introTitle && page.intro && !["blog", "contact", "venue", "services"].includes(slug) && (<section className="page-intro">
        <div>
          <p className="section-kicker">Magnoliya Grand · Manassas, Virginia</p>
          <h2>{page.introTitle}</h2>
        </div>
        <p>{page.intro}</p>
      </section>)}

      {!["blog", "contact", "venue"].includes(slug) && <Stats items={page.highlights} />}
      <PlanningFacts facts={planningFacts} slug={slug} />
      <EditorialSections sections={page.sections} linkLabel={page.editorialLinkLabel} linkHref={page.editorialLinkHref} />
      <CapacityTable rows={page.table} additionalSpaces={page.additionalSpaces} />
      {slug === "features" ? (
        <CelebrationBookExact features={page.featureGrid} cta={page.featureCta} />
      ) : slug === "rooms-suites" ? (
        <RoomsSuitesExperience hotels={page.hotelStays} benefits={page.stayBenefits} />
      ) : slug === "services" ? (
        <ServicesShowcase items={page.services} />
      ) : (
        <FeatureGrid items={page.featureGrid} linkLabel={page.featureLinkLabel || (slug === "blog" ? "Read article" : "Explore event")} />
      )}
      <Gallery images={page.gallery} />
      {shouldShowFaqs && <Faqs faqs={page.faqs} />}
      {slug === "contact" && <ContactExperience content={page.experience} />}
      <Policy items={page.policy} />
      {slug !== "privacy" && <BookingBand title={slug === "contact" ? "Come see what is possible." : undefined} />}
      <SiteFooter />
      {slug === "weddings" && <WeddingScrollAnimations />}
      <EventPageScrollAnimations slug={slug} />
      {slug === "about" && <AboutScrollAnimations />}
      {slug === "services" && <ServicesScrollAnimations />}
      {slug === "rooms-suites" && <RoomsSuitesScrollAnimations />}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </main>
  );
}
