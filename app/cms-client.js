const serverApiUrl = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || "";

export async function getCmsPageRecord(slug) {
  if (!serverApiUrl) return null;
  try {
    const response = await fetch(`${serverApiUrl.replace(/\/$/, "")}/public/pages/${slug}`, {
      next: { revalidate: 60, tags: [`cms-page-${slug}`] },
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload?.data || null;
  } catch {
    return null;
  }
}

export async function getCmsPageConfig(slug, fallback) {
  const record = await getCmsPageRecord(slug);
  return record?.sections?.find((section) => section.sectionKey === "page-config")?.contentJson || fallback;
}

export async function getCmsBlogPost(slug, fallback) {
  if (!serverApiUrl) return fallback;
  try {
    const response = await fetch(`${serverApiUrl.replace(/\/$/, "")}/public/blog/${slug}`, { next: { revalidate: 60, tags: [`cms-blog-${slug}`] }, signal: AbortSignal.timeout(2500) });
    if (!response.ok) return fallback;
    const payload = await response.json();
    return payload?.data?.contentJson || fallback;
  } catch { return fallback; }
}

export async function getCmsBlogCollection(fallback) {
  if (!serverApiUrl) return fallback;
  try {
    const response = await fetch(`${serverApiUrl.replace(/\/$/, "")}/public/blog`, { next: { revalidate: 60, tags: ["cms-blog"] }, signal: AbortSignal.timeout(2500) });
    if (!response.ok) return fallback;
    const payload = await response.json();
    const posts = payload?.data || [];
    return posts.length ? Object.fromEntries(posts.map((post) => [post.slug, post.contentJson])) : fallback;
  } catch { return fallback; }
}
