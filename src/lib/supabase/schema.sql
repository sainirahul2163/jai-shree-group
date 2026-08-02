-- ============================================================
-- Jai Shree Group — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company TEXT,
  product_interest TEXT,
  products_selected TEXT[],
  message TEXT,
  specifications JSONB,
  material TEXT,
  thickness TEXT,
  size TEXT,
  quantity TEXT,
  deadline TEXT,
  city TEXT,
  source TEXT NOT NULL DEFAULT 'contact_form',
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FOLLOW UPS TABLE
CREATE TABLE IF NOT EXISTS follow_ups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  notes TEXT NOT NULL,
  followed_up_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'General',
  meta_title TEXT,
  meta_description TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  author TEXT DEFAULT 'Jai Shree Group',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  product_category TEXT NOT NULL DEFAULT 'General',
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company_name TEXT,
  industry TEXT,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAGE VIEWS TABLE
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page TEXT NOT NULL,
  product TEXT,
  city TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- UPDATED AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ROW LEVEL SECURITY
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Admin full access leads" ON leads;
DROP POLICY IF EXISTS "Admin full access follow_ups" ON follow_ups;
DROP POLICY IF EXISTS "Admin full access blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin full access gallery" ON gallery_items;
DROP POLICY IF EXISTS "Admin full access testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin full access page_views" ON page_views;
DROP POLICY IF EXISTS "Public can insert leads" ON leads;
DROP POLICY IF EXISTS "Public can insert page_views" ON page_views;
DROP POLICY IF EXISTS "Public read published blogs" ON blog_posts;
DROP POLICY IF EXISTS "Public read published gallery" ON gallery_items;
DROP POLICY IF EXISTS "Public read published testimonials" ON testimonials;

-- ADMIN ALLOW-LIST: only emails in admin_users are treated as admins.
-- (Prevents "any authenticated Supabase user = full admin". Also disable
--  public sign-ups in Auth settings and set the ADMIN_EMAILS app env var.)
CREATE TABLE IF NOT EXISTS admin_users (
  email      TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

DROP POLICY IF EXISTS "admins read admin_users" ON admin_users;
CREATE POLICY "admins read admin_users" ON admin_users FOR SELECT TO authenticated USING (is_admin());

-- POLICIES: only allow-listed admins can do everything
CREATE POLICY "Admin full access leads" ON leads FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access follow_ups" ON follow_ups FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access blog_posts" ON blog_posts FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access gallery" ON gallery_items FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin full access page_views" ON page_views FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Seed admin(s). Replace before running; also add each via Auth → Users and to ADMIN_EMAILS.
INSERT INTO admin_users (email) VALUES ('REPLACE_WITH_ADMIN@EMAIL.COM') ON CONFLICT (email) DO NOTHING;

-- POLICIES: anonymous can insert leads and page_views (public forms)
CREATE POLICY "Public can insert leads" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can insert page_views" ON page_views FOR INSERT TO anon WITH CHECK (true);

-- POLICIES: public can read published content
CREATE POLICY "Public read published blogs" ON blog_posts FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Public read published gallery" ON gallery_items FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT TO anon USING (is_published = true);

-- SEED BLOG POSTS (the 4 from constants — run scripts/seed-blog-posts.ts for full content)
INSERT INTO blog_posts (title, slug, excerpt, category, is_published, published_at) VALUES
('How to Calculate Open Area of Perforated Sheet', 'how-to-calculate-open-area-perforated-sheet', 'Learn the standard formulas for calculating open area percentage in perforated sheets — with worked examples and a reference table for common hole sizes.', 'Technical Guide', true, NOW()),
('Expanded Metal vs Perforated Sheet: Which to Choose?', 'expanded-metal-vs-perforated-sheet', 'Compare expanded metal and perforated sheets across strength, weight, cost, flow, and aesthetics — and learn which material suits your application.', 'Product Guide', true, NOW()),
('Perforated Sheet Specification Guide', 'wire-mesh-specification-guide', 'Complete guide to perforated sheet specifications — hole shapes, pitch types, materials, thickness, finishes, and standard sizes from Jai Shree Group.', 'Technical Guide', true, NOW()),
('Laser Cutting vs Turret Punching: Cost Comparison', 'laser-cutting-vs-turret-punching', 'When to use laser cutting vs turret punching? A detailed cost and capability comparison for industrial buyers in Pune and Mumbai.', 'Cost Guide', true, NOW())
ON CONFLICT (slug) DO NOTHING;

-- SEED TESTIMONIALS
INSERT INTO testimonials (client_name, company_name, industry, message, rating, is_featured, is_published) VALUES
('Rajesh Sharma', 'Tata AutoComp', 'Automobile', 'Excellent quality perforated sheets delivered on time. The bow control is perfect — zero rejections in our assembly line.', 5, true, true),
('Priya Mehta', 'Piramal Pharma', 'Pharmaceutical', 'We have been sourcing SS wire mesh from Jai Shree for 8 years. Consistent quality and responsive team.', 5, true, true),
('Amit Kulkarni', 'L&T Construction', 'Construction', 'Best expanded metal supplier in Pune. Custom sizes, quick turnaround, and competitive pricing.', 5, true, true);

-- ============================================================
-- STORAGE BUCKETS (create in Supabase Dashboard → Storage)
--   1. gallery (public)
--   2. blog-covers (public)
--   3. documents (private)
-- Then run the storage policies below.
-- ============================================================

-- Storage policies (requires buckets to exist first)
-- CREATE POLICY "Public read gallery" ON storage.objects
-- FOR SELECT TO anon USING (bucket_id = 'gallery');
-- CREATE POLICY "Auth upload gallery" ON storage.objects
-- FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');
-- CREATE POLICY "Auth delete gallery" ON storage.objects
-- FOR DELETE TO authenticated USING (bucket_id = 'gallery');
-- CREATE POLICY "Public read blog covers" ON storage.objects
-- FOR SELECT TO anon USING (bucket_id = 'blog-covers');
-- CREATE POLICY "Auth upload blog covers" ON storage.objects
-- FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-covers');
-- CREATE POLICY "Auth delete blog covers" ON storage.objects
-- FOR DELETE TO authenticated USING (bucket_id = 'blog-covers');

-- ============================================================
-- ADMIN USER SETUP
-- 1. Authentication → Sign In / Providers → Email → turn OFF
--    "Allow new users to sign up" (block public self-registration).
-- 2. Authentication → Users → Add user (admin email + strong password).
-- 3. Add the SAME email to admin_users above AND to the ADMIN_EMAILS env var.
-- 4. Log in at https://www.jaishreegroup.com/admin/login
-- ============================================================

-- ============================================================
-- FIX: Form submissions not saving (RLS blocking inserts)
-- API routes use SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
-- If you still use the anon key client, run ONE of these in SQL Editor:
--
-- Option A — disable RLS on leads (simplest):
-- ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
--
-- Option B — allow public inserts (keeps RLS for other operations):
-- DROP POLICY IF EXISTS "Public can insert leads" ON leads;
-- CREATE POLICY "Anyone can insert leads" ON leads
-- FOR INSERT WITH CHECK (true);
-- ============================================================
