"use server";

import { revalidatePath } from "next/cache";

// Public pages live under /[site]/(chrome)/… (the proxy rewrites each host),
// so they are revalidated by route pattern for every site.

import { isAdminEmail } from "@/lib/admin";
import { createServerClient } from "@/lib/supabase/server";
import { isSiteKey } from "@/sites/keys";
import type { SiteKey } from "@/sites/types";
import type { FollowUpType, LeadStatus } from "@/types/database";

function checkedSite(site: string): SiteKey {
  if (!isSiteKey(site)) throw new Error(`Unknown site "${site}"`);
  return site;
}

/**
 * Whether the current session belongs to an allow-listed admin.
 *
 * Signing in successfully is NOT the same as being allowed into the panel —
 * `ADMIN_EMAILS` gates that, server-side. The login form calls this so a
 * rejected account is told why, instead of bouncing off the middleware.
 * Returns only a boolean about the caller's own session, so the allow-list
 * itself never reaches the browser.
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdminEmail(user?.email);
}

/**
 * Permanently removes a lead and its follow-up history.
 *
 * follow_ups.lead_id currently cascades, so deleting the lead alone would be
 * enough. We clear follow-ups explicitly anyway so this keeps working if that
 * constraint is ever recreated without the cascade.
 *
 * There is no undo — the leads table is the only record of these enquiries,
 * so the UI confirms before calling this.
 */
export async function deleteLead(leadId: string) {
  const supabase = await createServerClient();

  const { error: followUpError } = await supabase
    .from("follow_ups")
    .delete()
    .eq("lead_id", leadId);
  if (followUpError) throw new Error(followUpError.message);

  const { error } = await supabase.from("leads").delete().eq("id", leadId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
}

export async function updateLeadNotes(leadId: string, notes: string) {
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("leads")
    .update({ notes })
    .eq("id", leadId);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function addFollowUp(
  leadId: string,
  type: FollowUpType,
  notes: string,
  followedUpAt?: string
) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("follow_ups").insert({
    lead_id: leadId,
    type,
    notes,
    followed_up_at: followedUpAt ?? new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/[site]/(chrome)/gallery", "page");
}

export async function toggleGalleryPublished(id: string, isPublished: boolean) {
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("gallery_items")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/[site]/(chrome)/gallery", "page");
}

export async function updateGalleryItem(
  id: string,
  data: { title: string; description: string | null; product_category: string }
) {
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("gallery_items")
    .update({
      title: data.title,
      description: data.description,
      product_category: data.product_category,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/[site]/(chrome)/gallery", "page");
}

export async function bulkUpdateGalleryCategory(
  ids: string[],
  productCategory: string
) {
  if (ids.length === 0) return;
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("gallery_items")
    .update({ product_category: productCategory })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/[site]/(chrome)/gallery", "page");
}

export async function bulkSetGalleryPublished(
  ids: string[],
  isPublished: boolean
) {
  if (ids.length === 0) return;
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("gallery_items")
    .update({ is_published: isPublished })
    .in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/[site]/(chrome)/gallery", "page");
}

export async function saveGalleryItem(data: {
  site: SiteKey;
  image_url: string;
  title: string;
  description?: string;
  product_category: string;
}) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("gallery_items").insert({
    site: checkedSite(data.site),
    image_url: data.image_url,
    title: data.title,
    description: data.description ?? null,
    product_category: data.product_category,
    is_published: true,
    sort_order: 0,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/[site]/(chrome)/gallery", "page");
}

export async function deleteBlogPost(id: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/[site]/(chrome)/blog", "page");
  revalidatePath("/[site]/(chrome)/blog/[slug]", "page");
}

export async function saveBlogPost(
  data: {
    site: SiteKey;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    meta_title?: string;
    meta_description?: string;
    cover_image_url?: string;
    is_published: boolean;
    author?: string;
  },
  id?: string
) {
  const supabase = await createServerClient();
  const payload = {
    ...data,
    site: checkedSite(data.site),
    meta_title: data.meta_title ?? null,
    meta_description: data.meta_description ?? null,
    cover_image_url: data.cover_image_url ?? null,
    author: data.author ?? "Jai Shree Group",
    published_at: data.is_published ? new Date().toISOString() : null,
  };

  if (id) {
    const { error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("blog_posts").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/[site]/(chrome)/blog", "page");
  revalidatePath("/[site]/(chrome)/blog/[slug]", "page");
}

export async function saveTestimonial(data: {
  site: SiteKey;
  client_name: string;
  company_name?: string;
  industry?: string;
  message: string;
  rating: number;
  is_featured: boolean;
  is_published: boolean;
}) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("testimonials").insert({
    site: checkedSite(data.site),
    client_name: data.client_name,
    company_name: data.company_name ?? null,
    industry: data.industry ?? null,
    message: data.message,
    rating: data.rating,
    is_featured: data.is_featured,
    is_published: data.is_published,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/[site]/(chrome)/clients", "page");
}

export async function updateTestimonial(
  id: string,
  data: Partial<{
    client_name: string;
    company_name: string | null;
    industry: string | null;
    message: string;
    rating: number;
    is_featured: boolean;
    is_published: boolean;
  }>
) {
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("testimonials")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/[site]/(chrome)/clients", "page");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createServerClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/[site]/(chrome)/clients", "page");
}

export async function signOutAdmin() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
}
