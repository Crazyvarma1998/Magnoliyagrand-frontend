"use client";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "";

export function useCmsPage(slug, fallback) {
  const [content, setContent] = useState(fallback);
  useEffect(() => {
    if (!apiUrl) return;
    const controller = new AbortController();
    fetch(`${apiUrl.replace(/\/$/, "")}/public/pages/${slug}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        const next = payload?.data?.sections?.find((section) => section.sectionKey === "page-config")?.contentJson;
        if (next) setContent(next);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [slug]);
  return content;
}

export function useCmsBootstrap(fallback) {
  const [content, setContent] = useState(fallback);
  useEffect(() => {
    if (!apiUrl) return;
    const controller = new AbortController();
    fetch(`${apiUrl.replace(/\/$/, "")}/public/bootstrap`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => payload?.data && setContent(payload.data))
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return content;
}
