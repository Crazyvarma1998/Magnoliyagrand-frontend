"use client";

import { useEffect } from "react";

export default function WeddingScrollAnimations() {
  useEffect(() => {
    const page = document.querySelector(".page-weddings");
    if (!page) return;

    const blocks = [...page.querySelectorAll(".page-editorial .editorial-copy")];
    page.classList.add("wedding-js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
    );

    blocks.forEach((block) => observer.observe(block));

    return () => {
      observer.disconnect();
      page.classList.remove("wedding-js-ready");
    };
  }, []);

  return null;
}
