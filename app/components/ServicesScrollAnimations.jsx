"use client";

import { useEffect } from "react";

export default function ServicesScrollAnimations() {
  useEffect(() => {
    const page = document.querySelector(".page-services");
    if (!page) return undefined;

    const cards = Array.from(page.querySelectorAll(".service-detail-card"));
    if (!cards.length) return undefined;

    page.classList.add("services-scroll-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-services-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      page.classList.remove("services-scroll-ready");
    };
  }, []);

  return null;
}
