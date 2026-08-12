"use client";

import { useEffect, useRef, useState } from "react";
import { imageDimensions } from "../image-data";

export default function FeatureBook({ items }) {
  const section = useRef(null);
  const [motion, setMotion] = useState({ active: 0, from: 0, amount: 0, progress: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!section.current) return;
      const box = section.current.getBoundingClientRect();
      const distance = Math.max(1, box.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -box.top / distance));
      const pageProgress = Math.min(1, Math.max(0, (progress - .22) / .56));
      const position = pageProgress * (items.length - 1);
      const from = Math.min(items.length - 2, Math.floor(position));
      const amount = pageProgress === 1 ? 0 : position - from;
      const active = pageProgress === 1 ? items.length - 1 : amount < .5 ? from : from + 1;
      setMotion((previous) =>
        previous.active === active && previous.from === from &&
        Math.abs(previous.amount - amount) < .001 && Math.abs(previous.progress - progress) < .001
          ? previous
          : { active, from, amount, progress }
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items.length]);

  const current = items[motion.active];
  const from = items[motion.from];
  const next = items[Math.min(motion.from + 1, items.length - 1)];
  const isTurning = motion.amount > .001;
  const shadow = Math.sin(motion.amount * Math.PI);
  const coverOpen = Math.min(1, Math.max(0, (motion.progress - .1) / .12));
  const closing = Math.min(1, Math.max(0, (motion.progress - .78) / .12));
  const outro = Math.min(1, Math.max(0, (motion.progress - .9) / .1));
  const bookX = -25 * (1 - coverOpen) + 25 * outro;
  const bookScale = .86 + .14 * coverOpen - .38 * outro;
  const bookTilt = 7 * (1 - coverOpen) + 7 * outro;

  return (
    <section
      ref={section}
      className="feature-book-scroll"
      style={{ height: `${Math.max(650, items.length * 82)}svh` }}
      aria-label="Scroll through Magnoliya Grand features"
    >
      <div className="feature-book-shell">
        <header className="feature-book-intro" style={{ opacity: Math.max(0, 1 - motion.progress / .09), transform: `translateY(${-35 * Math.min(1, motion.progress / .09)}px)` }}>
          <p>The Magnoliya album</p>
          <h2>Every feature<br />has a purpose.</h2>
          <span>Scroll to open</span>
        </header>

        <div
          className="feature-book"
          style={{ transform: `translateX(${bookX}%) scale(${bookScale}) rotateX(${bookTilt}deg)` }}
        >
          <div className="feature-book-page feature-book-image" style={{ opacity: coverOpen }}>
            <img {...imageDimensions(current[2])} src={current[2]} alt={`${current[0]} at Magnoliya Grand`} loading="lazy" decoding="async" />
            <span>Magnoliya Grand · Features</span>
          </div>

          <div className="feature-book-page feature-book-copy">
            <p className="feature-book-eyebrow">The Magnoliya Collection</p>
            <h2>{current[0]}</h2>
            <p>{current[1]}</p>
            <span className="feature-book-hint">Scroll to turn the page</span>
          </div>

          {isTurning && (
            <div
              className="feature-book-turning-page is-scroll-driven"
              aria-hidden="true"
              style={{
                opacity: 1,
                transform: `rotateY(${-180 * motion.amount}deg)`,
                boxShadow: `${-42 * shadow}px 8px ${55 * shadow}px rgba(25,31,37,${.08 + .25 * shadow})`,
              }}
            >
              <div className="feature-book-turn-front">
                <p>The Magnoliya Collection</p>
                <strong>{from[0]}</strong>
                <span>{from[1]}</span>
              </div>
              <div className="feature-book-turn-back">
                <img {...imageDimensions(next[2])} src={next[2]} alt="" decoding="async" />
              </div>
            </div>
          )}

          <div
            className="feature-book-cover"
            aria-hidden="true"
            style={{ transform: `rotateY(${-180 * coverOpen}deg)`, visibility: coverOpen >= .999 ? "hidden" : "visible" }}
          >
            <div className="feature-book-cover-front">
              <i>MG</i>
              <strong>Magnoliya Grand</strong>
              <span>The Features Collection</span>
            </div>
            <div className="feature-book-cover-back" />
          </div>

          <div
            className="feature-book-closing"
            aria-hidden="true"
            style={{ opacity: closing > 0 ? 1 : 0, transform: `rotateY(${-180 * closing}deg)` }}
          >
            <div className="feature-book-closing-front">
              <img {...imageDimensions(items.at(-1)[2])} src={items.at(-1)[2]} alt="" decoding="async" />
            </div>
            <div className="feature-book-closing-back">
              <i>MG</i>
              <strong>Magnoliya Grand</strong>
            </div>
          </div>

          <span className="feature-book-spine" aria-hidden="true" />
        </div>

        <div className="feature-book-scroll-progress" aria-hidden="true" style={{ opacity: coverOpen * (1 - closing) }}>
          <span>{String(motion.active + 1).padStart(2, "0")}</span>
          <i><b style={{ transform: `scaleX(${(motion.from + motion.amount) / (items.length - 1)})` }} /></i>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>

        <div className="feature-book-outro" style={{ opacity: outro, transform: `translateY(${28 * (1 - outro)}px)` }}>
          <p>Every detail, considered</p>
          <h2>One venue.<br />Every possibility.</h2>
        </div>
      </div>
    </section>
  );
}
