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
import ProductDetail from "./pages/ProductDetail";
import AfterPayment from "./pages/AfterPayment";
import OrderDetail from "./pages/OrderDetail";
import HomeDashboard from "./pages/Admin/Home";
import AppLayout from "./layouts/Admin/AppLayout";
import ProductAddPage from "./pages/Admin/ProductAddPage";
import BasicTables from "./pages/Admin/BasicTables";
import ProductTables from "./pages/Admin/ProductTables";
import VoucherTables from "./pages/Admin/VoucherTables";
import ProductCategoryTables from "./pages/Admin/ProductCategoryTables";
import CategoryProductAddPage from "./pages/Admin/CategoryProductAddPage";
import VoucherAddPage from "./pages/Admin/VoucherAddPage";

export default function App() {
  return (
    <Routes>
      {/* ===== AUTH ROUTES (NO NAVBAR) ===== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<HomeDashboard />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/table" element={<BasicTables />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard/product" element={<ProductTables />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route
          path="/dashboard/product-category"
          element={<ProductCategoryTables />}
        />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard/voucher" element={<VoucherTables />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard/product/add" element={<ProductAddPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route
          path="/dashboard/product-category/add"
          element={<CategoryProductAddPage />}
        />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard/voucher/add" element={<VoucherAddPage />} />
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
        <Route path="/produk/:id" element={<ProductDetail />} />
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
        <Route
          path="/after-payment"
          element={
            <ProtectedRoute>
              <AfterPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
