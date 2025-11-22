import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FAQ from "./pages/FAQ.jsx";
import OrderGuide from "./pages/OrderGuide.jsx";
import About from "./pages/About.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProductList from "./pages/ProductList.jsx";
import CategoryList from "./pages/CategoryList.jsx";
import ProfilePage from "./pages/Profile.jsx";
import CartPage from "./pages/Cart.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cara-belanja" element={<OrderGuide />} />
        <Route path="/syarat-dan-ketentuan" element={<TermsAndConditions />} />
        <Route path="/produk" element={<ProductList />} />
        <Route path="/kategori" element={<CategoryList />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}
