-- =====================================================================
-- Admin access hardening
-- =====================================================================
-- Replaces the permissive "any authenticated user = full admin" RLS
-- policies with an allow-list keyed on the user's email.
--
-- WHERE TO RUN: Supabase SQL Editor of the JAI SHREE project
--   (project ref: myhqzpnxwyytqtgoxldy — NOT any other project).
-- Safe to re-run (idempotent).
--
-- ALSO DO IN THE DASHBOARD (not SQL):
--   Authentication → Sign In / Providers → Email →
--   turn OFF "Allow new users to sign up".
--   This stops the public anon key from being used to self-register an
--   account. Create admins manually via Authentication → Users → Add user.
--
-- REMEMBER: also set ADMIN_EMAILS (app env var) to the same email(s).
-- Both the app layer (ADMIN_EMAILS) and the DB layer (admin_users) must
-- list the admin — defense in depth.
-- =====================================================================

-- 1. Allow-list table of admin emails.
create table if not exists public.admin_users (
  email      text primary key,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- 2. Admin check helper — reads the email claim from the caller's JWT.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

-- 3. Only admins may read the allow-list itself.
drop policy if exists "admins read admin_users" on public.admin_users;
create policy "admins read admin_users" on public.admin_users
  for select to authenticated using ( public.is_admin() );

-- 4. Replace the permissive per-table policies with admin-only equivalents.
--    (Public anon INSERT on leads/page_views and public SELECT of published
--     blog/gallery/testimonials are left untouched, so forms + public reads
--     keep working. API routes use the service-role key and bypass RLS.)

drop policy if exists "Admin full access leads" on public.leads;
create policy "Admin full access leads" on public.leads
  for all to authenticated using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "Admin full access follow_ups" on public.follow_ups;
create policy "Admin full access follow_ups" on public.follow_ups
  for all to authenticated using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "Admin full access blog_posts" on public.blog_posts;
create policy "Admin full access blog_posts" on public.blog_posts
  for all to authenticated using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "Admin full access gallery" on public.gallery_items;
create policy "Admin full access gallery" on public.gallery_items
  for all to authenticated using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "Admin full access testimonials" on public.testimonials;
create policy "Admin full access testimonials" on public.testimonials
  for all to authenticated using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "Admin full access page_views" on public.page_views;
create policy "Admin full access page_views" on public.page_views
  for all to authenticated using ( public.is_admin() ) with check ( public.is_admin() );

-- 5. Seed your admin email(s). REPLACE the placeholder before running.
insert into public.admin_users (email) values
  ('REPLACE_WITH_ADMIN@EMAIL.COM')
on conflict (email) do nothing;
