"use client";

import { useEffect } from "react";

export default function RoomsSuitesScrollAnimations() {
  useEffect(() => {
    const page = document.querySelector(".page-rooms-suites");
    if (!page) return undefined;

    const elements = Array.from(page.querySelectorAll(".rooms-reveal"));
    if (!elements.length) return undefined;

    page.classList.add("rooms-scroll-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-rooms-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      page.classList.remove("rooms-scroll-ready");
    };
  }, []);

  return null;
}
