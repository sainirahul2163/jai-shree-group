-- =====================================================================
-- Drawings bucket (Phase 2: Jai Shree Metal Perforators drawing upload)
-- =====================================================================
-- PRIVATE bucket for customer drawings (DXF, DWG, PDF), 20 MB per file.
-- No storage policies: the browser uploads only with one-time signed upload
-- URLs made by /api/drawings/sign (service role), and the admin panel opens
-- files with short-lived signed URLs. Anonymous and signed-in users can
-- neither list nor read the bucket. Additive and idempotent.
-- =====================================================================

insert into storage.buckets (id, name, public, file_size_limit)
values ('drawings', 'drawings', false, 20971520)
on conflict (id) do update set public = false, file_size_limit = 20971520;
