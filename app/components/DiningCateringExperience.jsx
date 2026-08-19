"use client";

import { useEffect, useRef } from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { bookingUrl } from "../site-data";
import styles from "./DiningCateringExperience.module.css";
import { useCmsPage } from "../hooks/useCmsPage";

const services = [
  ["Full-Service Event Catering", "Customized menus for weddings, corporate events, galas, celebrations, and social gatherings."],
  ["Wedding & Reception Dining", "Elegant plated dinners, buffets, family-style dining, and customized wedding menus."],
  ["Corporate Catering", "Breakfasts, lunches, dinners, business meetings, conferences, and executive events."],
  ["Cocktail & Hors d'Oeuvres Receptions", "Passed appetizers, specialty stations, and elegant cocktail-style service."],
  ["Buffet Dining", "Professionally presented buffet options suitable for large celebrations and conferences.", "/dining-catering/buffet.png"],
  ["Plated & Seated Dinners", "Formal multi-course dining with attentive table service."],
  ["Food Stations & Action Stations", "Interactive culinary stations customized to the theme and style of your event.", "/dining-catering/food-stations.png"],
  ["Dessert & Specialty Displays", "Dessert tables, specialty sweets, cakes, and customized presentations through trusted partners."],
  ["Custom & Fusion Cuisine", "Menus tailored to cultural preferences, dietary requirements, and special culinary themes."],
  ["International & Cultural Menus", "Customized selections for South Asian, Indian, Middle Eastern, and other cultural celebrations.", "/dining-catering/international-cultural.png"],
  ["Beverage Service", "Coffee and tea service, soft drinks, specialty beverages, alcohol, including bourbons, and other event beverage options.", "/dining-catering/beverages.png"],
  ["Late-Night & Event Enhancements", "Late-night snacks and specialty food offerings for extended celebrations."],
  ["Menu Tastings", "Advance tasting opportunities for select events to help clients finalize their menu and presentation."],
];

const diningFaqs = [
  ["Can we create a menu that is unique to our event?", "Absolutely. At Magnoliya Grand, your menu should be as distinctive as your celebration. Our culinary team works with you to build a customized dining experience around your preferences, event style, cultural traditions, and guest expectations. From classic favorites to contemporary fusion and globally inspired cuisine, we can create a menu that feels uniquely yours."],
  ["What makes the dining experience at Magnoliya Grand special?", "We believe dining should be part of the experience—not simply a meal. Our culinary offerings can include beautifully presented plated dinners, sophisticated buffets, interactive food stations, live culinary experiences, and specialty displays. Every element is thoughtfully designed to complement the atmosphere and elevate your event."],
  ["Do you offer a variety of cuisines?", "Yes. Magnoliya Grand welcomes celebrations of every culture and culinary tradition. Our catering capabilities span American, Asian, African, Indian, Halal, international, and fusion cuisines, allowing us to create diverse and customized menus that reflect your event, cultural traditions, and your guests’ preferences."],
  ["Can Magnoliya Grand accommodate cultural or traditional menus?", "Absolutely. We understand that food is an important part of many cultural celebrations. Our culinary team can work with you to incorporate traditional recipes, regional specialties, family favorites, and cultural dining traditions while maintaining the quality, presentation, and service expected at a premium event."],
  ["How does your catering pricing work?", "Every event is different, so we believe your menu and catering package should be tailored to your needs rather than limited to a one-size-fits-all approach. Pricing can vary based on menu selections, guest count, service style, event duration, and other event requirements. Our team will work with you to create an experience that fits your vision and budget."],
  ["Can you accommodate dietary restrictions and special requests?", "Your guests' dining needs matter to us. During the planning process, we identify dietary requirements and work with our culinary team to provide appropriate options. Depending on the menu, accommodations can include vegetarian, vegan, Jain, gluten-free, allergen-conscious, and other special dietary requests."],
  ["Can we have food stations or interactive dining?", "Absolutely. Interactive dining can transform a meal into an experience. Depending on your event, we can offer chef-attended stations, live cooking, specialty food displays, international stations, dessert experiences, and other customized concepts that encourage guests to explore, interact, and enjoy."],
  ["Can we schedule a menu tasting before our event?", "For qualifying events, menu tastings can be arranged to help you experience the flavors, presentation, and selections before finalizing your menu. Our team will guide you through the process and help refine the dining experience to match your expectations."],
  ["Can Magnoliya Grand coordinate other event services along with catering?", "Yes. We can help coordinate a complete event experience through our trusted partner network, including décor, DJ and entertainment, photography and videography, audio-visual services, and professional live streaming. Our event coordination team helps bring these elements together so your celebration flows smoothly from beginning to end."],
];

const defaultDiningContent = {
  hero: { image: "/dining-catering/hero.jpg", eyebrow: "The art of hospitality", titleStart: "Dining", titleAccent: "&", titleEnd: "Catering", leadTop: "Exceptional cuisine. Beautifully presented.", leadBottom: "Unforgettable experiences.", brand: "Magnoliya Grand", note: "Thoughtful menus, polished service, and a table designed around your occasion.", exploreLabel: "Explore" },
  story: { aside: "The dining experience", label: "Made for your moment", title: "Every unforgettable event has a", accent: "flavor of its own.", paragraphs: ["At Magnoliya Grand, exceptional dining is an essential part of an exceptional event. Our culinary team creates thoughtfully designed menus tailored to your celebration, from elegant plated dinners and sophisticated buffets to interactive food stations, cocktail receptions, and customized cultural cuisine.", "Whether you're hosting an elegant wedding, conference, corporate event, grand gala, cultural celebration, or intimate gathering, our catering team works closely with you to create a dining experience that reflects your vision and delights your guests."], linkLabel: "Discover every service" },
  servicesIntro: { label: "A complete culinary collection", title: "Thirteen ways to make", accent: "the table memorable.", description: "Customizable menus, professional service, beautiful presentation, and trusted culinary partners—brought together for a dining experience that feels entirely your own.", cardLinkLabel: "Ask our events team" },
  services,
  faqIntro: { label: "The details, thoughtfully answered", title: "Frequently", accent: "asked questions.", description: "Explore menus, cultural traditions, dietary needs, tastings, pricing, and everything that shapes your dining experience.", linkLabel: "Have another question?" },
  faqs: diningFaqs,
  promise: { label: "Your menu, beautifully considered", titleLines: ["Imagine it.", "Taste it.", "Celebrate it."], steps: [["Share your vision", "Tell us about your occasion, guests, traditions, service style, and culinary preferences."], ["Shape the menu", "Our team brings the details together—from flavor and dietary needs to presentation and timing."], ["Savor the moment", "Enjoy polished service and a dining experience that carries your celebration from first bite to final toast."]] },
  cta: { label: "Your date is waiting", title: "Let's create a menu", accent: "worth remembering.", description: "From the first bite to the final toast, we make every occasion taste extraordinary.", primaryLabel: "Submit booking request", secondaryLabel: "Contact the events team" },
};
defaultDiningContent.hero.exploreHref = "#dining-story";
defaultDiningContent.story.linkHref = "#services";
defaultDiningContent.servicesIntro.cardLinkHref = "/contact";
defaultDiningContent.faqIntro.linkHref = "/contact";
defaultDiningContent.cta.primaryHref = bookingUrl;
defaultDiningContent.cta.secondaryHref = "/contact";

export default function DiningCateringExperience() {
  const content = useCmsPage("dining-catering", defaultDiningContent);
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const revealItems = [...root.querySelectorAll("[data-dining-reveal]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add(styles.isVisible));
      return undefined;
    }

    root.classList.add(styles.motionReady);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(styles.isVisible);
        observer.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const updateHero = () => {
      frame = 0;
      const offset = Math.min(window.scrollY, window.innerHeight * 1.15);
      root.style.setProperty("--hero-shift", `${offset * .17}px`);
      root.style.setProperty("--hero-fade", `${Math.max(.34, 1 - offset / (window.innerHeight * 1.1))}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateHero);
    };
    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <SiteHeader />
      <main>
        <section className={styles.hero} aria-labelledby="dining-hero-title">
          <div className={styles.heroMedia} aria-hidden="true"><img src={content.hero.image} alt="" width="1536" height="1024" fetchPriority="high" /></div>
          <div className={styles.heroShade} /><div className={styles.heroGrain} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}><span /> {content.hero.eyebrow}</p>
            <h1 id="dining-hero-title">{content.hero.titleStart} <i>{content.hero.titleAccent}</i> {content.hero.titleEnd}</h1>
            <p className={styles.heroLead}>{content.hero.leadTop}<br />{content.hero.leadBottom}</p>
          </div>
          <div className={styles.heroNote}><span>{content.hero.brand}</span><p>{content.hero.note}</p></div>
          <a className={styles.scrollCue} href={content.hero.exploreHref || "#dining-story"}><span>{content.hero.exploreLabel}</span><i aria-hidden="true" /></a>
        </section>

        <section className={styles.story} id="dining-story">
          <div className={styles.storyAside} data-dining-reveal><p>{content.story.aside}</p></div>
          <div className={styles.storyCopy} data-dining-reveal>
            <p className={styles.sectionLabel}>{content.story.label}</p>
            <h2>{content.story.title} <em>{content.story.accent}</em></h2>
            <div className={styles.storyColumns}>
              <p>{content.story.paragraphs[0]}</p>
              <div><p>{content.story.paragraphs[1]}</p><a href={content.story.linkHref || "#services"}>{content.story.linkLabel} <span>↓</span></a></div>
            </div>
          </div>
        </section>

        <section className={styles.services} id="services" aria-labelledby="dining-services-title">
          <header className={styles.servicesHeader} data-dining-reveal>
            <div><p className={styles.sectionLabel}>{content.servicesIntro.label}</p><h2 id="dining-services-title">{content.servicesIntro.title}<br /><em>{content.servicesIntro.accent}</em></h2></div>
            <p>{content.servicesIntro.description}</p>
          </header>
          <div className={styles.serviceList}>
            {content.services.map(([title, description, customImage], index) => {
              const number = String(index + 1).padStart(2, "0");
              const portrait = index >= 7 && [7, 8, 10, 11, 12].includes(index);
              return (
                <article className={styles.serviceCard} key={title} data-dining-reveal>
                  <div className={styles.serviceMedia}><img src={customImage ?? `/dining-catering/service-${number}.jpg`} alt={`${title} presentation at Magnoliya Grand`} width={customImage ? 1254 : portrait ? 1402 : 1536} height={customImage ? 1254 : portrait ? 1122 : 1024} loading={index < 2 ? "eager" : "lazy"} /></div>
                  <div className={styles.serviceCopy}><div className={styles.serviceRule} aria-hidden="true"><i /></div><h3>{title}</h3><p>{description}</p><a href={content.servicesIntro.cardLinkHref || "/contact"}>{content.servicesIntro.cardLinkLabel} <span>↗</span></a></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="dining-faq-title">
          <div className={styles.faqIntro} data-dining-reveal>
            <p className={styles.sectionLabel}>{content.faqIntro.label}</p>
            <h2 id="dining-faq-title">{content.faqIntro.title}<br /><em>{content.faqIntro.accent}</em></h2>
            <p>{content.faqIntro.description}</p>
            <a href={content.faqIntro.linkHref || "/contact"}>{content.faqIntro.linkLabel} <span>↗</span></a>
          </div>
          <div className={styles.faqList}>
            {content.faqs.map(([question, answer]) => (
              <details className={styles.faqItem} key={question} data-dining-reveal>
                <summary>
                  <span className={styles.faqQuestion}>{question}</span>
                  <span className={styles.faqToggle} aria-hidden="true"><i /><i /></span>
                </summary>
                <div className={styles.faqAnswer}><p>{answer}</p></div>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.promise}>
          <div className={styles.promiseTitle} data-dining-reveal><p className={styles.sectionLabel}>{content.promise.label}</p><h2>{content.promise.titleLines[0]}<br /><em>{content.promise.titleLines[1]}</em><br />{content.promise.titleLines[2]}</h2></div>
          <div className={styles.promiseSteps}>
            {content.promise.steps.map(([title, body]) => <article key={title} data-dining-reveal><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaGlow} aria-hidden="true" />
          <p className={styles.sectionLabel} data-dining-reveal>{content.cta.label}</p>
          <h2 data-dining-reveal>{content.cta.title}<br /><em>{content.cta.accent}</em></h2>
          <p data-dining-reveal>{content.cta.description}</p>
          <div className={styles.ctaActions} data-dining-reveal><a className={styles.primaryAction} href={content.cta.primaryHref || bookingUrl} target="_blank" rel="noreferrer">{content.cta.primaryLabel} <span>↗</span></a><a className={styles.secondaryAction} href={content.cta.secondaryHref || "/contact"}>{content.cta.secondaryLabel} <span>↗</span></a></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
