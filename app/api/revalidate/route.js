import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request) {
  if (!process.env.CMS_REVALIDATION_SECRET || request.headers.get("x-revalidation-secret") !== process.env.CMS_REVALIDATION_SECRET) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { path = "/", slug } = await request.json().catch(() => ({}));
  revalidatePath(path);
  if (slug) revalidateTag(`cms-page-${slug}`, "max");
  return Response.json({ ok: true, path });
}
