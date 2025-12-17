import { useState } from "react";
import Icon from "@mdi/react";
import { mdiCartOutline, mdiAccount, mdiMagnify } from "@mdi/js";
import NavbarBottom from "./NavbarBottom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="w-full md:max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center gap-4">
        {/* Logo */}
        <h1
          className="text-xl font-semibold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Tokoku
        </h1>

        {/* Search Bar */}
        <div className="flex-1 hidden md:flex mx-8">
          <div className="relative w-full">
            <Icon
              path={mdiMagnify}
              size={0.9}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full border border-gray-300 rounded-full py-1 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-5 text-gray-700 text-xl relative">
          {/* Cart */}
          <li
            className="cursor-pointer hover:text-gray-900"
            onClick={() => navigate("/cart")}
          >
            <Icon path={mdiCartOutline} size={0.9} />
          </li>

          {/* Profile Dropdown */}
          <li
            className="cursor-pointer hover:text-gray-900 relative"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <Icon path={mdiAccount} size={0.9} />

            {openProfile && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md border rounded-md z-50">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setOpenProfile(false);
                    navigate("/profile");
                  }}
                >
                  Profil
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden cursor-pointer flex gap-5 text-gray-700">
          {/* Cart */}
          <Icon
            path={mdiCartOutline}
            size={0.9}
            onClick={() => navigate("/cart")}
          />

          {/* Mobile Profile */}
          <div className="relative">
            <Icon
              path={mdiAccount}
              size={0.9}
              onClick={() => setOpenProfile(!openProfile)}
            />

            {openProfile && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md border rounded-md z-50">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setOpenProfile(false);
                    navigate("/profile");
                  }}
                >
                  Profil
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-6 pb-3 md:hidden">
        <div className="relative">
          <Icon
            path={mdiMagnify}
            size={0.9}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>

      <NavbarBottom />
    </nav>
  );
}

export default Navbar;
