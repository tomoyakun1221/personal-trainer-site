import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Pricing } from "./pages/Pricing";
import { Results } from "./pages/Results";
import { Equipment } from "./pages/Equipment";
import { About } from "./pages/About";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminSite } from "./pages/admin/AdminSite";
import { AdminPricing } from "./pages/admin/AdminPricing";
import { AdminResults } from "./pages/admin/AdminResults";
import { AdminTestimonials } from "./pages/admin/AdminTestimonials";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
const isStaticSite = import.meta.env.VITE_STATIC_SITE === "true";

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="results" element={<Results />} />
          <Route path="about" element={<About />} />
        </Route>
        {!isStaticSite && (
          <>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="site" element={<AdminSite />} />
              <Route path="pricing" element={<AdminPricing />} />
              <Route path="results" element={<AdminResults />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
            </Route>
          </>
        )}
        <Route path="/contact" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
