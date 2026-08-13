"use client";
import { useEffect, useRef, useState } from "react";
import { eventExperiences, homePageContent, pages, sharedAboutContent, sharedFaqs } from "./site-data";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import LocationGlobe from "./components/LocationGlobe";
import { imageDimensions } from "./image-data";
const bookingUrl = "https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062";
const homeFaqs = sharedFaqs.slice(0, 4);
export default function Home() {
    const [videoOpen, setVideoOpen] = useState(false);
    const heroVideoRef = useRef(null);
    useEffect(() => {
        const video = heroVideoRef.current;
        if (!video)
            return;
        const playHero = () => {
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
            video.setAttribute("webkit-playsinline", "");
            const playback = video.play();
            playback?.catch(() => {});
        };
        const resumeWhenVisible = () => {
            if (document.visibilityState === "visible")
                playHero();
        };
        playHero();
        window.addEventListener("pageshow", playHero);
        document.addEventListener("visibilitychange", resumeWhenVisible);
        window.addEventListener("touchstart", playHero, { once: true, passive: true });
        window.addEventListener("pointerdown", playHero, { once: true, passive: true });
        return () => {
            window.removeEventListener("pageshow", playHero);
            document.removeEventListener("visibilitychange", resumeWhenVisible);
            window.removeEventListener("touchstart", playHero);
            window.removeEventListener("pointerdown", playHero);
        };
    }, []);
    useEffect(() => {
        const section = document.querySelector(".manifesto");
        const stageSection = document.querySelector(".stage-section");
        const locationSection = document.querySelector(".location");
        if (!section && !stageSection && !locationSection)
            return;
        const manifestoObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                section?.classList.add("is-visible");
            }
            else {
                section?.classList.remove("is-visible");
            }
        }, {
            threshold: 0.22,
            rootMargin: "-8% 0px -8% 0px",
        });
        const stageObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                stageSection?.classList.add("stage-active");
            }
            else {
                stageSection?.classList.remove("stage-active");
            }
        }, {
            threshold: 0.28,
            rootMargin: "-6% 0px -6% 0px",
        });
        const locationObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                locationSection?.classList.add("location-active");
            }
            else {
                locationSection?.classList.remove("location-active");
            }
        }, {
            threshold: 0.3,
            rootMargin: "-7% 0px -7% 0px",
        });
        if (section)
            manifestoObserver.observe(section);
        if (stageSection)
            stageObserver.observe(stageSection);
        if (locationSection)
            locationObserver.observe(locationSection);
        return () => {
            manifestoObserver.disconnect();
            stageObserver.disconnect();
            locationObserver.disconnect();
        };
    }, []);
    return (<main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-image">
          <video
            ref={heroVideoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={(event) => event.currentTarget.play()?.catch(() => {})}
          >
            <source src={homePageContent.hero.video} type="video/mp4"/>
          </video>
        </div>
        <div className="hero-video-headline">
          <h1>
            <span>{homePageContent.hero.titleLines[0]}</span>
            <em>{homePageContent.hero.titleLines[1]}</em>
          </h1>
        </div>
      </section>

      <section className="manifesto">
        <p className="section-kicker">{sharedAboutContent.label}</p>
        <h2>{sharedAboutContent.homeTitle}<br /><em>{sharedAboutContent.homeAccent}</em></h2>
        <div className="manifesto-grid">
          <p>{sharedAboutContent.homeSummary}</p>
          <p>{sharedAboutContent.serviceSummary}</p>
        </div>
        <a className="line-link dark-link manifesto-link" href="/about">Discover our story <span>↗</span></a>
      </section>

      <section className="stage-section" id="spaces">
        <div className="stage-visual">
          <div className="stage-glow"/>
          <div className="stage-orbit orbit-one"/>
          <div className="stage-orbit orbit-two"/>
          <div className="stage-portal">
            <div className="stage-side-panel panel-left">
              <img {...imageDimensions(homePageContent.ballroom.image)} src={homePageContent.ballroom.image} alt="" decoding="async"/>
            </div>
            <figure className="stage-main-frame">
              <img {...imageDimensions(homePageContent.ballroom.image)} src={homePageContent.ballroom.image} alt={homePageContent.ballroom.imageAlt} loading="eager" decoding="async"/>
              <figcaption>
                <span>{homePageContent.ballroom.caption}</span>
                <small>{homePageContent.ballroom.captionLocation}</small>
              </figcaption>
            </figure>
            <div className="stage-side-panel panel-right">
              <img {...imageDimensions(homePageContent.ballroom.image)} src={homePageContent.ballroom.image} alt="" decoding="async"/>
            </div>
            <div className="stage-capacity-seal">
              <strong>{homePageContent.ballroom.sealValue}</strong>
              <span>{homePageContent.ballroom.sealLabel}</span>
            </div>
          </div>
          <span className="stage-vertical-label">{homePageContent.ballroom.verticalLabel}</span>
        </div>
        <div className="stage-copy">
          <p className="section-kicker light">{homePageContent.ballroom.kicker}</p>
          <h2>
            <span className="stage-title-line">{homePageContent.ballroom.title}</span>
            <em className="stage-title-line stage-title-gold">{homePageContent.ballroom.accent}</em>
          </h2>
          <p>{homePageContent.ballroom.description}</p>
          <div className="stat-row">
            {homePageContent.ballroom.stats.map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <a className="line-link" href={homePageContent.ballroom.button.href}>{homePageContent.ballroom.button.label} <span>↗</span></a>
        </div>
      </section>

      {false && (<>
      <section className="venue-film" aria-label="Magnoliya Grand venue film">
        <div className="film-light film-light-one"/>
        <div className="film-light film-light-two"/>
        <div className="film-heading">
          <p className="section-kicker">{homePageContent.film.kicker}</p>
          <h2>{homePageContent.film.title}<br /><em>{homePageContent.film.accent}</em></h2>
          <p>{homePageContent.film.description}</p>
        </div>
        <div className="film-theater">
          <span className="film-rail rail-left">Magnoliya Grand · Venue Film</span>
          <span className="film-rail rail-right">Manassas · Virginia · 2026</span>
          <button className="film-poster" type="button" onClick={() => setVideoOpen(true)} aria-label="Play the Magnoliya Grand venue film">
            <img {...imageDimensions(homePageContent.film.poster)} src={homePageContent.film.poster} alt={homePageContent.film.posterAlt} loading="lazy" decoding="async"/>
            <span className="film-poster-shade"/>
            <span className="film-poster-copy">
              <small>Press play to enter</small>
              <strong>Experience<br />the grandeur.</strong>
            </span>
            <span className="film-play">
              <i>▶</i>
              <small>Play film</small>
            </span>
            <span className="film-runtime">01:00 · 4K</span>
          </button>
          <div className="film-caption">
            <p>From waterfront arrival to grand-ballroom scale — see the complete Magnoliya experience.</p>
            <span>MG</span>
          </div>
        </div>
      </section>

      {videoOpen && (<div className="film-modal" role="dialog" aria-modal="true" aria-label="Magnoliya Grand venue film">
          <button className="film-close" type="button" onClick={() => setVideoOpen(false)} aria-label="Close venue film">Close ×</button>
          <div className="film-modal-frame">
            <iframe src={homePageContent.film.videoUrl} title="Magnoliya Grand venue film" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen/>
          </div>
        </div>)}
      </>)}

      <section className="occasions" id="occasions">
        <div className="occasion-heading">
          <div>
            <p className="section-kicker">{pages.events.eyebrow}</p>
            <h2>{pages.events.title}<br /><em>{pages.events.accent}</em></h2>
          </div>
          <p>{pages.events.intro}</p>
        </div>
        <div className="event-grid">
          {eventExperiences.map((event, index) => (<a
              href={event.href}
              className={`event-card ${event.tone}`}
              style={{ "--event-image": `url("${event.image}")`, "--event-delay": `${index * -1.15}s` }}
              key={event.title}
            >
              <div className="event-copy">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
              <span className="event-arrow">↗</span>
            </a>))}
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-copy">
          <p className="section-kicker">{homePageContent.experience.kicker}</p>
          <h2>{homePageContent.experience.title}<br /><em>{homePageContent.experience.accent}</em></h2>
          <p>{homePageContent.experience.description}</p>
          <div className="amenity-list">
            {homePageContent.experience.amenities.map((item) => (<div key={item}>{item}</div>))}
          </div>
        </div>
        <div className="experience-visual" aria-label="Magnoliya Grand landscaped garden and waterfront patio">
          <div className="experience-photo-stack">
            <img {...imageDimensions(homePageContent.experience.mainImage)} className="experience-main-photo" src={homePageContent.experience.mainImage} alt={homePageContent.experience.mainImageAlt} loading="lazy" decoding="async"/>
            <img {...imageDimensions(homePageContent.experience.secondaryImage)} className="experience-float-photo" src={homePageContent.experience.secondaryImage} alt={homePageContent.experience.secondaryImageAlt} loading="lazy" decoding="async"/>
            <span className="experience-seal">{homePageContent.experience.sealValue}<small>{homePageContent.experience.sealLabel}</small></span>
          </div>
          <p>{homePageContent.experience.closing[0]}<br />{homePageContent.experience.closing[1]}</p>
        </div>
      </section>

      <section className="venue-gallery" aria-label="Magnoliya Grand photo gallery">
        <div className="gallery-intro">
          <p className="section-kicker light">{homePageContent.gallery.kicker}</p>
          <h2>{homePageContent.gallery.title}<br /><em>{homePageContent.gallery.accent}</em></h2>
          <p>{homePageContent.gallery.description}</p>
        </div>
        {homePageContent.gallery.items.map(([image, alt, caption, shotClass]) => (
          <figure className={`gallery-shot ${shotClass}`} key={image}>
            <img {...imageDimensions(image)} src={image} alt={alt} loading="lazy" decoding="async"/>
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="testimonials">
        <div className="testimonial-heading">
          <p className="section-kicker">{homePageContent.testimonials.kicker}</p>
          <h2>{homePageContent.testimonials.title}<br /><em>{homePageContent.testimonials.accent}</em></h2>
        </div>
        <div className="testimonial-grid">
          {homePageContent.testimonials.items.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section home-faq">
        <div>
          <p className="section-kicker">{homePageContent.faq.kicker}</p>
          <h2>{homePageContent.faq.title}<br /><em>{homePageContent.faq.accent}</em></h2>
          <p className="home-faq-intro">{homePageContent.faq.description}</p>
          <a className="line-link dark-link" href="/faq">View all frequently asked questions <span>↗</span></a>
        </div>
        <div className="faq-list">
          {homeFaqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="location" id="location">
        <LocationGlobe />
        <div className="location-copy">
          <p className="section-kicker light">{homePageContent.location.kicker}</p>
          <h2>
            <span className="location-title-main">{homePageContent.location.title}</span>
            <em className="location-title-gold">{homePageContent.location.accent}</em>
          </h2>
          <div className="location-address">
            <p>7001 Infantry Ridge Road<br />Manassas, Virginia 20109</p>
            <span>{homePageContent.location.coordinates}</span>
          </div>
          <div className="distance-row">
            {homePageContent.location.distances.map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <a className="line-link" href="https://maps.google.com/?q=7001+Infantry+Ridge+Rd+Manassas+VA+20109">{homePageContent.location.buttonLabel} <span>↗</span></a>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="cta-orbit orbit-a"/><div className="cta-orbit orbit-b"/>
        <p className="section-kicker light">{homePageContent.finalCta.kicker}</p>
        <h2>{homePageContent.finalCta.title}<br /><em>{homePageContent.finalCta.accent}</em></h2>
        <p>{homePageContent.finalCta.description}</p>
        <div className="final-actions">
          <a className="button button-gold" href={bookingUrl} target="_blank" rel="noreferrer">{homePageContent.finalCta.primaryLabel} <span>↗</span></a>
          <a className="text-link" href="mailto:sales@magnoliyagrand.com?subject=Magnoliya%20Grand%20Event%20Inquiry">{homePageContent.finalCta.secondaryLabel} <span>↗</span></a>
        </div>
        <a className="contact-phone" href="tel:+17038435536">{homePageContent.finalCta.phoneLabel} +1 703 843 5536</a>
      </section>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: homeFaqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }) }}/>
    </main>);
}
