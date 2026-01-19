import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/AuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Navigate } from "react-router-dom";

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
import ProductForm from "./pages/Admin/ProductForm";
import ProductTables from "./pages/Admin/ProductTables";
import VoucherTables from "./pages/Admin/VoucherTables";
import ProductCategoryTables from "./pages/Admin/ProductCategoryTables";
import CategoryProductForm from "./pages/Admin/CategoryProductForm";
import VoucherForm from "./pages/Admin/VoucherForm";
import ProtectedAdminRoute from "./auth/ProtectedAdminRoute";
import Forbidden403 from "./pages/errors/Forbidden403";
import AddressFormPage from "./pages/AddressFormPage";

export default function App() {
  return (
    <Routes>
      <Route path="/403" element={<Forbidden403 />} />
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
        >
          {/* default */}
          <Route index element={<Navigate to="orders" replace />} />

          {/* tab */}
          <Route path=":tab" element={<ProfilePage />} />
        </Route>

        <Route
          path="/addresses/new"
          element={
            <ProtectedRoute>
              <AddressFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addresses/:id/edit"
          element={
            <ProtectedRoute>
              <AddressFormPage />
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

      {/* DASHBOARD */}
      <Route
        element={
          <ProtectedAdminRoute>
            <AppLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="/dashboard" element={<HomeDashboard />} />

        <Route path="/dashboard/product" element={<ProductTables />} />
        <Route path="/dashboard/product/add" element={<ProductForm />} />

        <Route
          path="/dashboard/product-category"
          element={<ProductCategoryTables />}
        />
        <Route
          path="/dashboard/product-category/add"
          element={<CategoryProductForm />}
        />

        <Route path="/dashboard/voucher" element={<VoucherTables />} />
        <Route path="/dashboard/voucher/add" element={<VoucherForm />} />

        <Route path="/dashboard/product/edit/:id" element={<ProductForm />} />
        <Route
          path="/dashboard/product-category/edit/:id"
          element={<CategoryProductForm />}
        />
        <Route path="/dashboard/voucher/edit/:id" element={<VoucherForm />} />
      </Route>
    </Routes>
  );
}
