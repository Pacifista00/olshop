import { useState } from "react";
import Icon from "@mdi/react";
import { mdiCartOutline, mdiMagnify, mdiLogin } from "@mdi/js";
import NavbarBottom from "./NavbarBottom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    setOpenProfile(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="w-full md:max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-xl font-semibold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          LogoNyusul
        </h1>

        {/* Search Desktop */}
        <div className="flex-1 hidden md:flex mx-5">
          <div className="relative w-full">
            <Icon
              path={mdiMagnify}
              size={0.9}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full border border-gray-300 rounded-full py-1 pl-10 pr-3 text-sm"
            />
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <ul className="hidden md:flex gap-5 text-gray-700 text-xl relative">
          {loading ? (
            /* SKELETON DESKTOP */
            <li className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
            </li>
          ) : !user ? (
            /* LOGIN */
            <li
              className="cursor-pointer hover:text-gray-900"
              onClick={() => navigate("/login")}
            >
              <button className="flex items-center text-base">
                <Icon path={mdiLogin} size={0.8} className="me-1" />
                Login
              </button>
            </li>
          ) : (
            /* USER MENU */
            <li className="relative flex items-center gap-4">
              {/* CART */}
              <div
                className="relative cursor-pointer hover:opacity-80"
                onClick={() => navigate("/cart")}
              >
                <Icon path={mdiCartOutline} size={0.95} />
              </div>

              {/* AVATAR */}
              <div
                onClick={() => setOpenProfile(!openProfile)}
                className="relative cursor-pointer"
              >
                <img
                  src={
                    user?.photo
                      ? `${baseUrl}/storage/${user.photo}`
                      : "/image/user/profile.png"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* DROPDOWN */}
              {openProfile && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                  {loading ? (
                    <div className="px-5 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <>
                      <div className="px-5 py-4 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Total Point
                        </p>
                        <p className="text-sm font-bold text-green-600 mt-1">
                          ⭐ {user?.point?.total_points ?? 0}
                        </p>
                      </div>

                      <div className="py-2">
                        <button
                          className="w-full text-left px-5 py-2 text-sm hover:bg-gray-100 transition"
                          onClick={() => {
                            setOpenProfile(false);
                            navigate("/profile");
                          }}
                        >
                          Profil Saya
                        </button>

                        <button
                          className="w-full text-left px-5 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          )}
        </ul>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex items-center gap-4 relative">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
          ) : !user ? (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Icon path={mdiLogin} size={0.9} />
              Login
            </button>
          ) : (
            <>
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <Icon path={mdiCartOutline} size={1} />
              </div>

              <div
                onClick={() => setOpenProfile(!openProfile)}
                className="relative cursor-pointer"
              >
                <img
                  src={
                    user?.photo
                      ? `${baseUrl}/storage/${user.photo}`
                      : "/image/user/profile.png"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* SEARCH MOBILE */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Icon
            path={mdiMagnify}
            size={0.9}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-3 text-sm"
          />
        </div>
      </div>

      <NavbarBottom />
    </nav>
  );
}

export default Navbar;
