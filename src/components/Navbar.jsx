import { useState, useContext } from "react";
import Icon from "@mdi/react";
import {
  mdiCartOutline,
  mdiAccount,
  mdiMagnify,
  mdiLogin,
  mdiAccountPlusOutline,
} from "@mdi/js";
import NavbarBottom from "./NavbarBottom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setOpenProfile(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="w-full md:max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center gap-0">
        {/* Logo */}
        <h1
          className="text-xl font-semibold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Tokoku
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

        {/* ===== MENU DESKTOP ===== */}
        <ul className="hidden md:flex gap-5 text-gray-700 text-xl relative">
          {!user ? (
            <>
              {/* REGISTER */}
              {/* <li
                className="cursor-pointer hover:text-gray-900"
                onClick={() => navigate("/register")}
              >
                <button className="flex items-center text-base">
                  <Icon
                    path={mdiAccountPlusOutline}
                    size={0.8}
                    className="me-1"
                  />
                  Register
                </button>
              </li> */}

              {/* LOGIN */}
              <li
                className="cursor-pointer hover:text-gray-900"
                onClick={() => navigate("/login")}
              >
                <button className="flex items-center text-base">
                  <Icon path={mdiLogin} size={0.8} className="me-1" />
                  Login
                </button>
              </li>
            </>
          ) : (
            <>
              {/* CART */}
              <li
                className="cursor-pointer hover:text-gray-900"
                onClick={() => navigate("/cart")}
              >
                <Icon path={mdiCartOutline} size={0.9} />
              </li>

              {/* PROFILE */}
              <li
                className="cursor-pointer hover:text-gray-900 relative"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <Icon path={mdiAccount} size={0.9} />

                {openProfile && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-md border rounded-md z-50">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setOpenProfile(false);
                        navigate("/profile");
                      }}
                    >
                      Profil
                    </button>

                    <button
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        {/* ===== MOBILE ===== */}
        <div className="md:hidden flex gap-1 relative">
          {!user ? (
            <>
              <Icon
                path={mdiLogin}
                size={0.9}
                onClick={() => navigate("/login")}
              />
              Login
              {/* <Icon
                path={mdiAccountPlusOutline}
                size={0.9}
                onClick={() => navigate("/register")}
              /> */}
            </>
          ) : (
            <>
              <Icon
                path={mdiCartOutline}
                size={0.9}
                onClick={() => navigate("/cart")}
              />

              <Icon
                path={mdiAccount}
                size={0.9}
                onClick={() => setOpenProfile(!openProfile)}
              />

              {openProfile && (
                <div className="absolute right-0 top-10 w-32 bg-white shadow-md border rounded-md z-50">
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setOpenProfile(false);
                      navigate("/profile");
                    }}
                  >
                    Profil
                  </button>

                  <button
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* ===== SEARCH MOBILE ===== */}
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
