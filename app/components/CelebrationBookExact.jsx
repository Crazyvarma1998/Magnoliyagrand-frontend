"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// App Router allows global CSS imports from a component. If you prefer,
// move this import into app/layout.jsx instead.
import "../celebration-book-exact.css";
import { pages } from "../site-data";

const site = {
  bookingUrl:
    "https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062",
};

const celebrations = pages.features.featureGrid.map(([title, description, image], index) => ({
  number: "",
  title,
  tagline: "Every detail, beautifully considered.",
  description,
  image,
  alt: `${title} at Magnoliya Grand`,
  accent: "Magnoliya Grand · Manassas",
}));

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function Dust() {
  return (
    <div className="dust" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <i
          key={index}
          style={{
            "--dust-x": `${(index * 37) % 97}%`,
            "--dust-y": `${(index * 61) % 91}%`,
            "--dust-delay": `${(index % 8) * -0.9}s`,
            "--dust-duration": `${7 + (index % 6)}s`,
          }}
        />
      ))}
    </div>
  );
}

function PageCopy({ celebration }) {
  return (
    <div className="page-copy">
      <div className="page-kicker">
        <span>{celebration.number}</span>
        <i />
        <span>Celebrations</span>
      </div>
      <div>
        <h3>{celebration.title}</h3>
        <blockquote>&ldquo;{celebration.tagline}&rdquo;</blockquote>
        <p>{celebration.description}</p>
      </div>
      <p className="page-accent">{celebration.accent}</p>
    </div>
  );
}

function PageImage({ celebration, turning = false }) {
  return (
    <div className={`page-image ${turning ? "is-turning" : ""}`}>
      <Image
        src={celebration.image}
        alt={turning ? "" : celebration.alt}
        fill
        sizes="(max-width: 768px) 82vw, 42vw"
        unoptimized={celebration.image.endsWith(".svg")}
      />
      <div className="page-image__wash" aria-hidden="true" />
      <span className="page-image__caption">Magnoliya Grand Ã‚Â· Manassas</span>
    </div>
  );
}

function OpenSpread({ celebration, index, setRef }) {
  return (
    <article
      ref={setRef}
      className="book-spread"
      aria-label={`${celebration.title}: ${celebration.tagline}`}
      style={{ zIndex: celebrations.length - index }}
    >
      <div className="book-page book-page--left">
        <PageImage celebration={celebration} />
        <span className="paper-edge" aria-hidden="true" />
      </div>
      <div className="book-page book-page--right">
        <PageCopy celebration={celebration} />
        <span className="paper-edge" aria-hidden="true" />
      </div>
    </article>
  );
}

function TurningPage({ current, next, setRef, index }) {
  return (
    <div
      ref={setRef}
      className="turning-page"
      aria-hidden="true"
      style={{ zIndex: celebrations.length + 4 - index }}
    >
      <div className="turning-face turning-face--front">
        <PageCopy celebration={current} />
      </div>
      <div className="turning-face turning-face--back">
        <PageImage celebration={next} turning />
      </div>
    </div>
  );
}

function ReducedCelebrations() {
  return (
    <div className="book-reduced shell">
      <div className="section-heading">
        <p className="eyebrow">The Magnoliya album</p>
        <h2>Every celebration has a home.</h2>
        <p>
          Every unforgettable moment begins with a beautiful space.
        </p>
      </div>
      <div className="reduced-stories">
        {celebrations.map((celebration) => (
          <article key={celebration.title} className="reduced-story">
            <div className="reduced-story__image">
              <Image
                src={celebration.image}
                alt={celebration.alt}
                fill
                sizes="(max-width: 768px) 92vw, 44vw"
                unoptimized={celebration.image.endsWith(".svg")}
              />
            </div>
            <PageCopy celebration={celebration} />
          </article>
        ))}
      </div>
    </div>
  );
}

export default function CelebrationBook() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const bookRef = useRef(null);
  const coverRef = useRef(null);
  const closerRef = useRef(null);
  const shadowRef = useRef(null);
  const stackLeftRef = useRef(null);
  const stackRightRef = useRef(null);
  const introRef = useRef(null);
  const outroRef = useRef(null);
  const spreadRefs = useRef([]);
  const turningRefs = useRef([]);

  useEffect(() => {
    if (
      !rootRef.current ||
      !stageRef.current ||
      !sceneRef.current ||
      !bookRef.current
    ) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      rootRef.current.dataset.reducedMotion = "true";
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // The first spread stays mounted under the closed cover so the cover
      // physically uncovers the right page as it lifts; only the left halves
      // (first/last left page, left stack) fade, always beneath the moving
      // cover's silhouette.
      const isDesktop = () => window.matchMedia("(min-width: 981px)").matches;
      const firstLeftPage =
        spreadRefs.current[0]?.querySelector(".book-page--left");
      // Opacity is faded on the cover FACES, never on the 3D cover itself:
      // opacity < 1 flattens preserve-3d and renders the faces mirrored.
      const coverFaces = coverRef.current.querySelectorAll(".cover-face");

      gsap.set(spreadRefs.current, { autoAlpha: 0 });
      gsap.set(spreadRefs.current[0], { autoAlpha: 1 });
      gsap.set(firstLeftPage, { autoAlpha: 0 });
      gsap.set(stackLeftRef.current, { autoAlpha: 0 });
      gsap.set(closerRef.current, {
        autoAlpha: 0,
        rotationY: 0,
        transformOrigin: "left center",
      });
      gsap.set(turningRefs.current, {
        rotationY: 0,
        transformOrigin: "left center",
      });
      // Transforms pivot on the closed album (the block's right half) so the
      // entrance and the final sink stay centered on what the viewer sees.
      gsap.set(bookRef.current, { transformOrigin: "75% 50%" });
      gsap.set(outroRef.current, { autoAlpha: 0, y: 36 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=650%",
          pin: stageRef.current,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Beat 1 Ã¢â‚¬â€ the intro owns the stage and leaves COMPLETELY before the
      // book enters, so heading and book never share a frame.
      timeline
        .to(
          introRef.current,
          {
            autoAlpha: 0,
            y: -40,
            duration: 0.06,
            ease: "power1.in",
          },
          0.04,
        )
        // Beat 2 Ã¢â‚¬â€ on desktop the closed album starts standing at the right
        // (mirroring the finale, bookending the section) and glides to center
        // stage; on mobile it rises from below the fold instead.
        .fromTo(
          bookRef.current,
          {
            // The intro's closed album is the block's RIGHT half, so +5
            // lands its footprint at the same stage position the finale's
            // LEFT-half footprint reaches with +55.
            xPercent: () => (isDesktop() ? 5 : -25),
            yPercent: () => (isDesktop() ? 0 : 65),
            scale: () => (isDesktop() ? 0.9 : 0.85),
            rotationX: () => (isDesktop() ? 8 : 12),
            rotationZ: () => (isDesktop() ? 2 : -2.5),
          },
          {
            xPercent: -25,
            yPercent: 2,
            scale: 1,
            rotationX: 1.6,
            rotationZ: -0.4,
            duration: 0.14,
            ease: "power2.out",
          },
          0.1,
        )
        // Beat 3 Ã¢â‚¬â€ the cover swings across the spine while the book slides to
        // recenter as a full spread; the left page, its page stack, and the
        // widening floor shadow materialize under the moving cover, which
        // dissolves during the last stretch of its sweep so the open spread
        // stands alone.
        .to(
          bookRef.current,
          {
            xPercent: 0,
            duration: 0.12,
            ease: "power2.inOut",
          },
          0.26,
        )
        .to(
          coverRef.current,
          {
            rotationY: -180,
            duration: 0.12,
            ease: "power2.inOut",
          },
          0.26,
        )
        .fromTo(
          shadowRef.current,
          { scaleX: 0.55, transformOrigin: "75% 50%" },
          { scaleX: 1, duration: 0.12, ease: "power2.inOut" },
          0.26,
        )
        .to(
          firstLeftPage,
          {
            autoAlpha: 1,
            duration: 0.04,
          },
          0.335,
        )
        .to(
          stackLeftRef.current,
          {
            autoAlpha: 1,
            duration: 0.04,
          },
          0.335,
        )
        .to(
          coverFaces,
          {
            autoAlpha: 0,
            duration: 0.045,
            ease: "power1.in",
          },
          0.33,
        )
        .to(
          bookRef.current,
          {
            rotationX: 0.5,
            rotationZ: 0.3,
            duration: 0.1,
            ease: "power1.inOut",
          },
          0.28,
        );

      // Beat 4 Ã¢â‚¬â€ page turns.
      const pageTurnStart = 0.4;
      const pageTurnEnd = 0.75;
      const pageTurnStep =
        (pageTurnEnd - pageTurnStart) / Math.max(1, turningRefs.current.length);
      const pageTurnDuration = Math.min(0.06, pageTurnStep * 0.86);

      turningRefs.current.forEach((page, index) => {
        const position = pageTurnStart + index * pageTurnStep;
        const midpoint = position + pageTurnDuration * 0.52;
        const currentSpread = spreadRefs.current[index];
        const nextSpread = spreadRefs.current[index + 1];

        timeline
          .to(
            page,
            {
              rotationY: -180,
              duration: pageTurnDuration,
              ease: "power1.inOut",
            },
            position,
          )
          .to(
            page,
            {
              autoAlpha: 0,
              duration: 0.001,
            },
            position + pageTurnDuration - 0.0005,
          )
          .to(
            currentSpread,
            {
              autoAlpha: 0,
              duration: Math.min(0.012, pageTurnDuration * 0.2),
            },
            midpoint,
          )
          .to(
            nextSpread,
            {
              autoAlpha: 1,
              duration: Math.min(0.012, pageTurnDuration * 0.2),
            },
            midpoint + 0.001,
          )
          .to(
            bookRef.current,
            {
              rotationZ: index % 2 === 0 ? -0.3 : 0.3,
              duration: pageTurnDuration,
              ease: "sine.inOut",
            },
            position,
          );
      });

      // Beat 5 Ã¢â‚¬â€ the book closes like a finished album: the right side flips
      // over the spine (the same direction as every page turn) and lands as
      // the closed cover on the left; beneath the identical flap, the right
      // half retires, the book recenters on its new footprint, and the
      // closed album settles away for the outro.
      timeline
        .set(closerRef.current, { autoAlpha: 1 }, 0.795)
        .set(shadowRef.current, { transformOrigin: "25% 50%" }, 0.798)
        .set(bookRef.current, { transformOrigin: "25% 50%" }, 0.798)
        .to(
          closerRef.current,
          {
            rotationY: -180,
            duration: 0.12,
            ease: "power2.inOut",
          },
          0.8,
        )
        .to(
          bookRef.current,
          {
            // Desktop: the closing album sweeps to the right half of the
            // stage so the outro text owns the left; mobile stays centered.
            xPercent: () => (isDesktop() ? 55 : 25),
            duration: 0.12,
            ease: "power2.inOut",
          },
          0.8,
        )
        .to(
          shadowRef.current,
          {
            scaleX: 0.55,
            duration: 0.12,
            ease: "power2.inOut",
          },
          0.8,
        )
        .to(
          spreadRefs.current.at(-1),
          {
            autoAlpha: 0,
            duration: 0.001,
          },
          0.8,
        )
        .to(
          stackRightRef.current,
          {
            autoAlpha: 0,
            duration: 0.001,
          },
          0.8,
        )
        .to(
          bookRef.current,
          {
            scale: () => (isDesktop() ? 0.9 : 0.55),
            rotationX: 8,
            rotationZ: 2,
            // Mobile: rest closer beneath the outro text; short phones sink
            // a little further so the text never collides with the album.
            yPercent: () => {
              if (isDesktop()) {
                return 0;
              }
              return window.matchMedia("(max-height: 720px)").matches
                ? 56
                : 44;
            },
            duration: 0.14,
            ease: "power2.inOut",
          },
          0.84,
        )
        .to(
          outroRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
            ease: "power2.out",
          },
          0.9,
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="celebrations"
      ref={rootRef}
      className="memory-section"
      aria-labelledby="memory-title"
    >
      <ReducedCelebrations />

      <div ref={stageRef} className="memory-stage">
        <div ref={sceneRef} className="memory-scene">
          <Dust />
          <div className="ambient-light ambient-light--left" aria-hidden="true" />
          <div className="ambient-light ambient-light--right" aria-hidden="true" />
          <div className="memory-spotlight" aria-hidden="true" />

          <header ref={introRef} className="memory-intro">
            <p className="eyebrow">The Magnoliya album</p>
            <h2 id="memory-title">Every celebration has a home.</h2>
            <p>Every unforgettable moment begins with a beautiful space.</p>
          </header>

          <div className="book-perspective">
            <div ref={bookRef} className="book">
              <div ref={shadowRef} className="book-shadow" />
              <div className="book-block">
                <span
                  ref={stackRightRef}
                  className="book-stack book-stack--right"
                  aria-hidden="true"
                />
                <span
                  ref={stackLeftRef}
                  className="book-stack book-stack--left"
                  aria-hidden="true"
                />
                {celebrations.map((celebration, index) => (
                  <OpenSpread
                    key={celebration.title}
                    celebration={celebration}
                    index={index}
                    setRef={(node) => {
                      spreadRefs.current[index] = node;
                    }}
                  />
                ))}

                {celebrations.slice(0, -1).map((celebration, index) => (
                  <TurningPage
                    key={`${celebration.title}-turn`}
                    current={celebration}
                    next={celebrations[index + 1]}
                    index={index}
                    setRef={(node) => {
                      turningRefs.current[index] = node;
                    }}
                  />
                ))}

                <div
                  ref={closerRef}
                  className="turning-page book-closer"
                  aria-hidden="true"
                >
                  <div className="turning-face turning-face--front">
                    <PageCopy celebration={celebrations.at(-1)} />
                  </div>
                  <div className="turning-face turning-face--back book-closer__cover">
                    <div className="cover-stitch cover-stitch--outer" />
                    <div className="cover-title">
                      <Image
                        className="cover-monogram"
                        src="/home-assets/logo.png"
                        alt=""
                        width={56}
                        height={64}
                      />
                      <i />
                      <strong>Magnoliya Grand</strong>
                      <small>Celebrations, beautifully remembered</small>
                    </div>
                  </div>
                </div>

                <div ref={coverRef} className="book-cover">
                  <div className="cover-face cover-face--front">
                    <div className="cover-stitch cover-stitch--outer" />
                    <div className="cover-stitch cover-stitch--inner" />
                    <div className="cover-light" />
                    <div className="cover-title">
                      <Image
                        className="cover-monogram"
                        src="/home-assets/logo.png"
                        alt=""
                        width={56}
                        height={64}
                      />
                      <i />
                      <strong>Magnoliya Grand</strong>
                      <small>Celebrations, beautifully remembered</small>
                    </div>
                  </div>
                  <div className="cover-face cover-face--back" aria-hidden="true">
                    <div className="cover-stitch cover-stitch--outer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="possibilities" ref={outroRef} className="memory-outro">
            <p className="eyebrow">14,500 square feet · Up to 2,000 guests</p>
            <h2>One venue.<br />Endless possibilities.</h2>
            <p>From professional planning and refined hospitality to flexible spaces and modern technology, every event begins here.</p>
            <a className="button button--dark" href={site.bookingUrl} target="_blank" rel="noreferrer">
              Explore our spaces <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
