"use client";

import { useEffect, useRef, useState } from "react";
import { imageDimensions } from "../image-data";

const labels = ["Arrival", "Grand ballroom", "Waterfront", "Banquet setting", "Garden", "Event details"];

export default function GalleryCarousel({ images }) {
  const galleryImages = Array.isArray(images) ? images : [];
  const [lightbox, setLightbox] = useState(null);
  const wallRef = useRef(null);

  useEffect(() => {
    const figures = wallRef.current?.querySelectorAll("figure") ?? [];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    figures.forEach((figure) => observer.observe(figure));
    return () => observer.disconnect();
  }, [galleryImages.length]);

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((current) => (current + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setLightbox((current) => (current - 1 + galleryImages.length) % galleryImages.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, galleryImages.length]);

  if (!galleryImages.length) return null;

  return (
    <section className="gallery-wall-section" aria-label="Magnoliya Grand image gallery">
      <header className="gallery-wall-header">
        <div>
          <p className="section-kicker">The Magnoliya collection</p>
          <h2>A venue,<br /><em>seen in moments.</em></h2>
        </div>
        <p>Explore the architecture, atmosphere, waterfront, and details that shape every gathering at Magnoliya Grand.</p>
      </header>

      <div className="gallery-wall" ref={wallRef}>
        {galleryImages.map((image, index) => (
          <figure key={`${image}-${index}`} style={{ "--gallery-delay": `${(index % 4) * 90}ms` }}>
            <button onClick={() => setLightbox(index)} aria-label={`Open image ${index + 1}`}>
              <img {...imageDimensions(image)} src={image} alt={`Magnoliya Grand ${labels[index % labels.length]}`} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
              <span className="gallery-wall-shade" />
              <figcaption><span>{labels[index % labels.length]}</span><i>View ↗</i></figcaption>
            </button>
          </figure>
        ))}
      </div>

      {lightbox !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Expanded gallery image" onClick={() => setLightbox(null)}>
          <button className="gallery-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image">×</button>
          <button className="gallery-lightbox-nav previous" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }} aria-label="Previous image">←</button>
          <figure onClick={(event) => event.stopPropagation()} key={lightbox}>
            <img {...imageDimensions(galleryImages[lightbox])} src={galleryImages[lightbox]} alt={`Magnoliya Grand ${labels[lightbox % labels.length]}`} decoding="async" />
            <figcaption>{labels[lightbox % labels.length]} <span>Magnoliya Grand</span></figcaption>
          </figure>
          <button className="gallery-lightbox-nav next" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }} aria-label="Next image">→</button>
        </div>
      )}
    </section>
  );
}
