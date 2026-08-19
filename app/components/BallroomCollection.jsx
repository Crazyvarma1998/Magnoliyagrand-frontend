"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BallroomCollection.module.css";

const ballrooms = [
  {
    name: "Magna Ballroom",
    eyebrow: "The signature room",
    image: "/home-assets/banner-13.jpg",
    width: 1920,
    height: 716,
    capacity: "Up to 1,000 banquet · 1,900 theater",
    body: "The venue's grand centerpiece balances extraordinary scale with thoughtful flexibility. Shape one impressive room for a gala, conference, or wedding, then layer in staging, dining, entertainment, and production around your vision.",
  },
  {
    name: "Yoshino Ballroom",
    eyebrow: "Warm, graceful, adaptable",
    image: "/home-assets/yoshino-ballroom-2026.jpg",
    width: 1168,
    height: 880,
    capacity: "Up to 500 banquet · 800 theater",
    body: "An elegant setting with a composed architectural rhythm, Yoshino transitions beautifully from ceremonies and receptions to presentations, awards, and polished corporate programs.",
  },
  {
    name: "Denali Ballroom",
    eyebrow: "Presence without compromise",
    image: "/home-assets/denali-ballroom-2026.jpg",
    width: 1600,
    height: 989,
    capacity: "Up to 500 banquet · 800 theater",
    body: "Denali combines generous capacity with an intimate sense of arrival. It is equally suited to celebratory dining, cultural programs, conferences, and events that need a strong stage and effortless guest flow.",
  },
  {
    name: "Liberty Ballroom",
    eyebrow: "A room shaped around you",
    image: "/home-assets/liberty-ballroom.jpg",
    width: 2400,
    height: 1136,
    capacity: "Flexible event configurations",
    body: "Liberty offers a versatile canvas for receptions, meetings, private celebrations, and supporting event moments. Its refined neutral palette gives décor, branding, florals, and lighting room to make a distinct impression.",
  },
  {
    name: "Tej Ballroom",
    eyebrow: "Focused spaces, connected plans",
    image: "/home-assets/tej-ballroom.jpg",
    width: 2400,
    height: 1800,
    capacity: "Up to 100 banquet · 200 theater",
    body: "Designed for clarity and connection, the Tej rooms support board meetings, seminars, training, green-room use, and breakout sessions—keeping smaller conversations close to the energy of the main event.",
  },
  {
    name: "Lake View Terrace",
    eyebrow: "An elevated waterfront setting",
    image: "/home-assets/lake-view-terrace.jpg",
    width: 2400,
    height: 1800,
    capacity: "Up to 160 guests",
    body: "A relaxed open-air setting framed by water views, Lake View Terrace is ideal for cocktail hours, intimate ceremonies, sunset dinners, and celebrations that move naturally between indoors and out.",
  },
  {
    name: "Lake View Garden",
    eyebrow: "Celebrations in the landscape",
    image: "/home-assets/lake-view-garden.jpg",
    width: 2400,
    height: 1800,
    capacity: "Up to 500 guests",
    body: "The Lake View Garden brings large outdoor ceremonies and receptions into a scenic setting beside the water, with room for meaningful entrances, layered décor, guest seating, and memorable photographs.",
  },
];

export default function BallroomCollection({ config }) {
  const rooms = config?.rooms || ballrooms;
  const intro = config?.intro || { eyebrow: "Seven distinctive settings", title: "Find the room", accent: "that fits the moment.", description: "From landmark celebrations to focused conversations, every Magnoliya Grand space offers its own sense of scale, rhythm, and possibility.", linkLabel: "Explore this space", linkHref: "/contact" };
  const sectionRef = useRef(null);
  const [activeRoom, setActiveRoom] = useState(0);
  const [mobileLayout, setMobileLayout] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 980px)");
    const updateLayout = () => setMobileLayout(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const items = [...section.querySelectorAll("[data-room-index]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActiveRoom(Number(entry.target.dataset.roomIndex));
      });
    }, { threshold: .2, rootMargin: "-28% 0px -52% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.collection} ref={sectionRef} aria-labelledby="ballroom-collection-title">
      <header className={styles.header}>
        <div>
          <p>{intro.eyebrow}</p>
          <h2 id="ballroom-collection-title">{intro.title}<br /><em>{intro.accent}</em></h2>
        </div>
        <p>{intro.description}</p>
      </header>

      <div className={styles.atlas}>
        {!mobileLayout && (
          <div className={styles.stageColumn}>
            <div className={styles.stage}>
              <div className={styles.imageStack}>
                {rooms.map((room, index) => (
                  <img
                    className={index === activeRoom ? styles.activeImage : ""}
                    src={room.image}
                    width={room.width}
                    height={room.height}
                    alt={index === activeRoom ? `${room.name} at Magnoliya Grand` : ""}
                    aria-hidden={index !== activeRoom}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    key={room.name}
                  />
                ))}
                <div className={styles.stageShade} />
                <div className={styles.stageFrame} aria-hidden="true"><span /><span /><span /><span /></div>
                <div className={styles.stageCaption} key={rooms[activeRoom].name}>
                  <p>{rooms[activeRoom].eyebrow}</p>
                  <strong>{rooms[activeRoom].name}</strong>
                  <span>{rooms[activeRoom].capacity}</span>
                </div>
              </div>
              <div className={styles.progress} aria-hidden="true">
                {rooms.map((room, index) => <i className={index === activeRoom ? styles.activeDot : ""} key={room.name} />)}
              </div>
            </div>
          </div>
        )}

        <div className={styles.chapters}>
          {rooms.map((room, index) => (
            <article
              className={`${styles.chapter} ${index === activeRoom ? styles.activeChapter : ""}`}
              data-room-index={index}
              onMouseEnter={() => setActiveRoom(index)}
              key={room.name}
            >
              {mobileLayout && (
                <figure className={styles.mobileImage}>
                  <img
                    src={room.image}
                    width={room.width}
                    height={room.height}
                    alt={`${room.name} at Magnoliya Grand`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <figcaption>{room.capacity}</figcaption>
                </figure>
              )}
              <p className={styles.eyebrow}>{room.eyebrow}</p>
              <h3>{room.name}</h3>
              <p className={styles.body}>{room.body}</p>
              <a href={intro.linkHref || "/contact"}>{intro.linkLabel} <span>↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
