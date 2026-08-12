"use client";

import { useEffect } from "react";

export default function AboutScrollAnimations() {
  useEffect(() => {
    const page = document.querySelector(".page-about");
    if (!page) return;
    const sections = [...page.querySelectorAll(".page-intro, .page-stats, .page-editorial article")];
    page.classList.add("about-scroll-ready");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("about-visible", entry.isIntersecting)),
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => { observer.disconnect(); page.classList.remove("about-scroll-ready"); };
  }, []);
  return null;
}
