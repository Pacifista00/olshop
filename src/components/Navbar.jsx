import { useState } from "react";
import Icon from "@mdi/react";
import { mdiCartOutline, mdiAccount, mdiMagnify } from "@mdi/js";
import NavbarBottom from "./NavbarBottom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-700">Logo</h1>

        {/* Search Bar */}
        <div className="flex-1 hidden md:flex mx-10">
          <div className="relative w-full">
            <Icon
              path={mdiMagnify}
              size={1}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full border border-blue-600 rounded-full py-1 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-gray-700 text-xl">
          <li className="hover:text-blue-600 cursor-pointer">
            <Icon path={mdiCartOutline} size={1} />
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Icon path={mdiAccount} size={1} />
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden cursor-pointer">
          <div className="flex gap-6">
            <Icon path={mdiCartOutline} size={1} />
            <Icon path={mdiAccount} size={1} />
          </div>
        </div>
      </div>

      {/* Search Bar Mobile */}
      <div className="px-6 pb-3 md:hidden">
        <div className="relative">
          <Icon
            path={mdiMagnify}
            size={1}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full border border-blue-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <NavbarBottom />
    </nav>
  );
}

export default Navbar;
