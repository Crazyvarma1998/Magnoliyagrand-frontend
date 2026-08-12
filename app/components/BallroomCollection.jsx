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
    image: "/service-assets/decor-event-design.jpg",
    width: 1536,
    height: 1024,
    capacity: "Up to 500 banquet · 800 theater",
    body: "An elegant setting with a composed architectural rhythm, Yoshino transitions beautifully from ceremonies and receptions to presentations, awards, and polished corporate programs.",
  },
  {
    name: "Denali Ballroom",
    eyebrow: "Presence without compromise",
    image: "/service-assets/corporate-professional-events.jpg",
    width: 1536,
    height: 1024,
    capacity: "Up to 500 banquet · 800 theater",
    body: "Denali combines generous capacity with an intimate sense of arrival. It is equally suited to celebratory dining, cultural programs, conferences, and events that need a strong stage and effortless guest flow.",
  },
  {
    name: "Liberty Ballroom",
    eyebrow: "A room shaped around you",
    image: "/service-assets/premium-audio-visual.jpg",
    width: 1536,
    height: 1024,
    capacity: "Flexible event configurations",
    body: "Liberty offers a versatile canvas for receptions, meetings, private celebrations, and supporting event moments. Its refined neutral palette gives décor, branding, florals, and lighting room to make a distinct impression.",
  },
  {
    name: "TEJ Meeting / Breakout Rooms",
    eyebrow: "Focused spaces, connected plans",
    image: "/home-assets/pre-event-area.jpg",
    width: 640,
    height: 720,
    capacity: "Up to 100 banquet · 200 theater",
    body: "Designed for clarity and connection, the TEJ rooms support board meetings, seminars, training, green-room use, and breakout sessions—keeping smaller conversations close to the energy of the main event.",
  },
];

export default function BallroomCollection() {
  const sectionRef = useRef(null);
  const [activeRoom, setActiveRoom] = useState(0);

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
          <p>Five distinctive settings</p>
          <h2 id="ballroom-collection-title">Find the room<br /><em>that fits the moment.</em></h2>
        </div>
        <p>From landmark celebrations to focused conversations, every Magnoliya Grand space offers its own sense of scale, rhythm, and possibility.</p>
      </header>

      <div className={styles.atlas}>
        <div className={styles.stageColumn}>
          <div className={styles.stage}>
            <div className={styles.imageStack}>
              {ballrooms.map((room, index) => (
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
              <div className={styles.stageCaption} key={ballrooms[activeRoom].name}>
                <p>{ballrooms[activeRoom].eyebrow}</p>
                <strong>{ballrooms[activeRoom].name}</strong>
                <span>{ballrooms[activeRoom].capacity}</span>
              </div>
            </div>
            <div className={styles.progress} aria-hidden="true">
              {ballrooms.map((room, index) => <i className={index === activeRoom ? styles.activeDot : ""} key={room.name} />)}
            </div>
          </div>
        </div>

        <div className={styles.chapters}>
          {ballrooms.map((room, index) => (
            <article
              className={`${styles.chapter} ${index === activeRoom ? styles.activeChapter : ""}`}
              data-room-index={index}
              onMouseEnter={() => setActiveRoom(index)}
              key={room.name}
            >
              <p className={styles.eyebrow}>{room.eyebrow}</p>
              <h3>{room.name}</h3>
              <p className={styles.capacity}>{room.capacity}</p>
              <p className={styles.body}>{room.body}</p>
              <a href="/contact">Explore this space <span>↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
