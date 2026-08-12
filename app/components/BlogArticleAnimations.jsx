"use client";

import { useEffect, useRef } from "react";

export default function BlogArticleAnimations() {
  const progressRef = useRef(null);

  useEffect(() => {
    const page = document.querySelector(".blog-article-page");
    const reveals = document.querySelectorAll(".blog-article-reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
    }, { threshold: 0.14, rootMargin: "-4% 0px -8%" });
    reveals.forEach((item) => observer.observe(item));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      if (!page || !progressRef.current) return;
      const available = Math.max(1, page.scrollHeight - window.innerHeight);
      progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / available))})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div className="blog-reading-progress" aria-hidden="true"><span ref={progressRef} /></div>;
}
