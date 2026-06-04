const API_BASE = import.meta.env.VITE_API_URL || "";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/json",
    ...authHeaders(),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.errors?.join?.(", ") || "リクエストに失敗しました");
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getSiteSetting: () => request<import("../types").SiteSetting>("/api/v1/site_setting"),
  getPricingPlans: () => request<import("../types").PricingPlan[]>("/api/v1/pricing_plans"),
  getTransformations: () => request<import("../types").Transformation[]>("/api/v1/transformations"),
  getTestimonials: () => request<import("../types").Testimonial[]>("/api/v1/testimonials"),
  createContact: (data: { name: string; email: string; phone?: string; message: string }) =>
    request<{ message: string }>("/api/v1/contact_inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact_inquiry: data }),
    }),

  adminLogin: (email: string, password: string) =>
    request<{ token: string; email: string }>("/api/v1/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  adminGetInquiries: () => request<import("../types").ContactInquiry[]>("/api/v1/admin/contact_inquiries"),
  adminUpdateInquiry: (id: number, status: string) =>
    request<import("../types").ContactInquiry>(`/api/v1/admin/contact_inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),
  adminDeleteInquiry: (id: number) =>
    request<void>(`/api/v1/admin/contact_inquiries/${id}`, { method: "DELETE" }),

  adminGetPlans: () => request<import("../types").PricingPlan[]>("/api/v1/admin/pricing_plans"),
  adminSavePlan: (
    plan: Partial<Omit<import("../types").PricingPlan, "features">> & { features?: string | string[] },
    id?: number
  ) => {
    const body = {
      pricing_plan: {
        ...plan,
        features: Array.isArray(plan.features) ? plan.features.join("\n") : plan.features,
      },
    };
    return id
      ? request<import("../types").PricingPlan>(`/api/v1/admin/pricing_plans/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      : request<import("../types").PricingPlan>("/api/v1/admin/pricing_plans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
  },
  adminDeletePlan: (id: number) =>
    request<void>(`/api/v1/admin/pricing_plans/${id}`, { method: "DELETE" }),

  adminGetTransformations: () =>
    request<import("../types").Transformation[]>("/api/v1/admin/transformations"),
  adminSaveTransformation: (formData: FormData, id?: number) =>
    request<import("../types").Transformation>(
      id ? `/api/v1/admin/transformations/${id}` : "/api/v1/admin/transformations",
      { method: id ? "PATCH" : "POST", body: formData }
    ),
  adminDeleteTransformation: (id: number) =>
    request<void>(`/api/v1/admin/transformations/${id}`, { method: "DELETE" }),

  adminGetTestimonials: () => request<import("../types").Testimonial[]>("/api/v1/admin/testimonials"),
  adminSaveTestimonial: (data: Partial<import("../types").Testimonial>, id?: number) => {
    const body = { testimonial: data };
    return id
      ? request<import("../types").Testimonial>(`/api/v1/admin/testimonials/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      : request<import("../types").Testimonial>("/api/v1/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
  },
  adminDeleteTestimonial: (id: number) =>
    request<void>(`/api/v1/admin/testimonials/${id}`, { method: "DELETE" }),

  adminUpdateSiteSetting: (formData: FormData) =>
    request<import("../types").SiteSetting>("/api/v1/admin/site_setting", {
      method: "PATCH",
      body: formData,
    }),
};
