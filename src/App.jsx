import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

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
import VerifyOtpPage from "./pages/Auth/VerifyOtpPage";
import GuestRoute from "./auth/GuestRoute";
import OrdersTables from "./pages/Admin/OrderTables";
import OrdersDetailPage from "./pages/Admin/OrdersDetailPage";
import RewardsTables from "./pages/Admin/RewardTables";
import RewardForm from "./pages/Admin/RewardForm";
import PublicRewardsPage from "./pages/PublicRewardsPage";
import RewardDetail from "./pages/RewardDetail";
import RewardRedemptionDetail from "./pages/RewardRedemptionDetail";
import RewardRedemptionsTables from "./pages/Admin/RewardRedemptionTables";
import VoucherRedemptionsTables from "./pages/Admin/VoucherRedemptionTables";
import HotelRedemptionsTables from "./pages/Admin/HotelRedemptionTables";
import ProductRedemptionsTables from "./pages/Admin/ProductRedemptionTables";
import MyVoucherList from "./pages/MyVoucher";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_MIDTRANS_SNAP_URL;
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY,
    );
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <Routes>
      <Route path="/403" element={<Forbidden403 />} />
      {/* ===== AUTH ROUTES (NO NAVBAR) ===== */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <GuestRoute>
              <VerifyOtpPage />
            </GuestRoute>
          }
        />
      </Route>

      {/* ===== MAIN ROUTES (WITH NAVBAR) ===== */}
      <Route element={<AuthLayout />}>
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
          path="/rewards"
          element={
            <ProtectedRoute>
              <PublicRewardsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reward/:id"
          element={
            <ProtectedRoute>
              <RewardDetail />
            </ProtectedRoute>
          }
        />

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
          path="/vouchers"
          element={
            <ProtectedRoute>
              <MyVoucherList />
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
        <Route
          path="/redemptions/:id"
          element={
            <ProtectedRoute>
              <RewardRedemptionDetail />
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

        <Route path="/dashboard/rewards" element={<RewardsTables />} />
        <Route path="/dashboard/reward/add" element={<RewardForm />} />

        <Route path="/dashboard/orders" element={<OrdersTables />} />
        <Route path="/dashboard/orders/:id" element={<OrdersDetailPage />} />
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

        <Route path="/dashboard/reward/edit/:id" element={<RewardForm />} />
        <Route path="/dashboard/product/edit/:id" element={<ProductForm />} />
        <Route
          path="/dashboard/product-category/edit/:id"
          element={<CategoryProductForm />}
        />
        <Route path="/dashboard/voucher/edit/:id" element={<VoucherForm />} />

        <Route
          path="/dashboard/redemptions/history"
          element={<RewardRedemptionsTables />}
        />
        <Route
          path="/dashboard/redemptions/voucher"
          element={<VoucherRedemptionsTables />}
        />
        <Route
          path="/dashboard/redemptions/hotel"
          element={<HotelRedemptionsTables />}
        />
        <Route
          path="/dashboard/redemptions/product"
          element={<ProductRedemptionsTables />}
        />
      </Route>
    </Routes>
  );
}
