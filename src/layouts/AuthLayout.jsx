import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideNavbar && <Footer />}
    </>
  );
}
