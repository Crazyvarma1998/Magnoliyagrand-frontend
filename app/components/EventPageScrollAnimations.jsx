"use client";

import { useEffect } from "react";

const supportedPages = new Set([
  "events",
  "corporate-conferences",
  "meetings-seminars",
  "galas-fundraisers",
  "cultural-music-concerts",
  "trade-shows-expos",
  "milestone-celebrations",
]);

export default function EventPageScrollAnimations({ slug }) {
  useEffect(() => {
    if (!supportedPages.has(slug)) return;
    const page = document.querySelector(`.page-${slug}`);
    if (!page) return;

    const blocks = [...page.querySelectorAll(slug === "events" ? ".feature-page-grid article" : ".page-editorial article")];
    page.classList.add("event-scroll-ready");

    const isCompactViewport = window.matchMedia("(max-width: 900px)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-scroll-visible", entry.isIntersecting);
        });
      },
      {
        threshold: isCompactViewport ? 0.1 : 0.24,
        rootMargin: isCompactViewport ? "0px 0px -3% 0px" : "0px 0px -8% 0px",
      }
    );

    blocks.forEach((block) => observer.observe(block));
    return () => {
      observer.disconnect();
      page.classList.remove("event-scroll-ready");
    };
  }, [slug]);

  return null;
}
