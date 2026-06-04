export interface SiteSetting {
  id: number;
  trainer_name: string;
  tagline: string;
  hero_description: string | null;
  profile_title: string | null;
  profile_body: string | null;
  qualifications: string | null;
  specialties: string | null;
  line_url: string | null;
  instagram_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  profile_image_url: string | null;
  hero_image_url: string | null;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string | null;
  features: string[];
  featured: boolean;
  position: number;
  course_breakdown?: string | null;
  bulk_offer?: string | null;
  promotion?: string | null;
  target_audience?: string | null;
  includes_drink?: boolean;
  plan_category?: string | null;
}

export interface Transformation {
  id: number;
  title: string;
  client_label: string | null;
  description: string | null;
  duration_weeks: number | null;
  before_weight?: number | null;
  after_weight?: number | null;
  result_summary?: string | null;
  composite_display?: boolean;
  before_image_url: string | null;
  after_image_url: string | null;
  position?: number;
  published?: boolean;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_age: string | null;
  content: string;
  rating: number;
  guest_type?: string | null;
  position?: number;
  published?: boolean;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}
