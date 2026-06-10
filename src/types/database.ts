export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "converted"
  | "lost";

export type LeadSource =
  | "contact_form"
  | "quote_form"
  | "product_page"
  | "location_page";

export type FollowUpType = "whatsapp" | "call" | "email" | "meeting";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  product_interest: string | null;
  products_selected: string[] | null;
  message: string | null;
  specifications: Record<string, unknown> | null;
  material: string | null;
  thickness: string | null;
  size: string | null;
  quantity: string | null;
  deadline: string | null;
  city: string | null;
  source: LeadSource;
  source_page: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface FollowUp {
  id: string;
  lead_id: string;
  type: FollowUpType;
  notes: string;
  followed_up_at: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  meta_title: string | null;
  meta_description: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  description: string | null;
  product_category: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company_name: string | null;
  industry: string | null;
  message: string;
  rating: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface PageView {
  id: string;
  page: string;
  product: string | null;
  city: string | null;
  referrer: string | null;
  created_at: string;
}

type LeadInsert = {
  name: string;
  phone: string;
  source: LeadSource;
  email?: string | null;
  company?: string | null;
  product_interest?: string | null;
  products_selected?: string[] | null;
  message?: string | null;
  specifications?: Record<string, unknown> | null;
  material?: string | null;
  thickness?: string | null;
  size?: string | null;
  quantity?: string | null;
  deadline?: string | null;
  city?: string | null;
  source_page?: string | null;
  status?: LeadStatus;
  notes?: string | null;
};

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: LeadInsert;
        Update: Partial<LeadInsert>;
        Relationships: [];
      };
      follow_ups: {
        Row: FollowUp;
        Insert: {
          lead_id: string;
          type: FollowUpType;
          notes: string;
          followed_up_at?: string;
        };
        Update: Partial<FollowUp>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPost;
        Insert: {
          title: string;
          slug: string;
          content?: string;
          excerpt?: string;
          category?: string;
          meta_title?: string | null;
          meta_description?: string | null;
          cover_image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          author?: string;
        };
        Update: Partial<BlogPost>;
        Relationships: [];
      };
      gallery_items: {
        Row: GalleryItem;
        Insert: {
          image_url: string;
          title: string;
          description?: string | null;
          product_category?: string;
          is_published?: boolean;
          sort_order?: number;
        };
        Update: Partial<GalleryItem>;
        Relationships: [];
      };
      testimonials: {
        Row: Testimonial;
        Insert: {
          client_name: string;
          company_name?: string | null;
          industry?: string | null;
          message: string;
          rating?: number;
          is_featured?: boolean;
          is_published?: boolean;
        };
        Update: Partial<Testimonial>;
        Relationships: [];
      };
      page_views: {
        Row: PageView;
        Insert: {
          page: string;
          product?: string | null;
          city?: string | null;
          referrer?: string | null;
        };
        Update: Partial<PageView>;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
  };
};
