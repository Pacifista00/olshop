import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/AuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./auth/ProtectedRoute";

// pages
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import OrderGuide from "./pages/OrderGuide";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import ProductList from "./pages/ProductList";
import CategoryList from "./pages/CategoryList";
import ProfilePage from "./pages/Profile";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

export default function App() {
  return (
    <Routes>
      {/* ===== AUTH ROUTES (NO NAVBAR) ===== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* ===== MAIN ROUTES (WITH NAVBAR) ===== */}
      <Route element={<MainLayout />}>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cara-belanja" element={<OrderGuide />} />
        <Route path="/syarat-dan-ketentuan" element={<TermsAndConditions />} />
        <Route path="/produk" element={<ProductList />} />
        <Route path="/kategori" element={<CategoryList />} />

        {/* PROTECTED */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
