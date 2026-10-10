-- =====================================================================
-- Multi-site (Phase 0 task 0.7)
-- =====================================================================
-- Every lead, page view and piece of content belongs to one site.
-- Existing rows become 'group' (the main site). Additive and idempotent:
-- safe to re-run. Run on jai-shree-dev first, then on the live project.
-- No RLS policy changes.
-- =====================================================================

do $$
declare
  t text;
begin
  foreach t in array array['leads', 'blog_posts', 'gallery_items', 'testimonials', 'page_views'] loop
    execute format(
      'alter table public.%I add column if not exists site text not null default %L',
      t, 'group'
    );
    if not exists (
      select 1 from pg_constraint
      where conname = t || '_site_check' and conrelid = format('public.%I', t)::regclass
    ) then
      execute format(
        'alter table public.%I add constraint %I check (site in (%L, %L, %L, %L, %L, %L, %L))',
        t, t || '_site_check',
        'group', 'shree-perforators', 'jai-shree-metal-perforators', 'jai-shree-industries',
        'jai-shree-perforator', 'jai-shree-filtration', 'shree-weld-mesh'
      );
    end if;
  end loop;
end $$;

create index if not exists leads_site_created_at_idx on public.leads (site, created_at desc);
create index if not exists page_views_site_created_at_idx on public.page_views (site, created_at desc);

-- Blog slugs were unique across the table; make them unique per site.
-- The new index is created first so uniqueness is never lost.
create unique index if not exists blog_posts_site_slug on public.blog_posts (site, slug);
alter table public.blog_posts drop constraint if exists blog_posts_slug_key;
