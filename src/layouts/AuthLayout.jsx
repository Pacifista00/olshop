import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {!hideNavbar && <Navbar />}

      {/* CONTENT */}
      <main className="grow">
        <Outlet />
      </main>

      {!hideNavbar && <Footer />}
    </div>
  );
}
