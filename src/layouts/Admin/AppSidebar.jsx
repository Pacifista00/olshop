import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiCalendar,
  mdiAccountCircle,
  mdiFormatListBulleted,
  mdiTable,
  mdiFileDocumentOutline,
  mdiChartPie,
  mdiPackageVariantClosed,
  mdiPowerPlug,
  mdiChevronDown,
  mdiDotsHorizontal,
} from "@mdi/js";

import { useSidebar } from "../../context/SidebarContext";

// Konfigurasi Navigasi
const navItems = [
  {
    icon: mdiViewDashboard,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/dashboard", pro: false }],
  },
  // {
  //   icon: mdiCalendar,
  //   name: "Calendar",
  //   path: "#",
  // },
  // {
  //   icon: mdiAccountCircle,
  //   name: "User Profile",
  //   path: "#",
  // },
  {
    name: "Tables",
    icon: mdiTable,
    subItems: [
      { name: "Produk", path: "/dashboard/product", pro: false },
      {
        name: "Kategori Produk",
        path: "/dashboard/product-category",
        pro: false,
      },
      {
        name: "Voucher",
        path: "/dashboard/voucher",
        pro: false,
      },
    ],
  },
  {
    name: "Forms",
    icon: mdiFormatListBulleted,
    subItems: [
      { name: "Produk", path: "/dashboard/product/add", pro: false },
      {
        name: "Kategori Produk",
        path: "/dashboard/product-category/add",
        pro: false,
      },
      {
        name: "Voucher",
        path: "/dashboard/voucher/add",
        pro: false,
      },
    ],
  },
  // {
  //   name: "Pages",
  //   icon: mdiFileDocumentOutline,
  //   subItems: [
  //     { name: "Blank Page", path: "#", pro: false },
  //     { name: "404 Error", path: "#", pro: false },
  //   ],
  // },
];

const othersItems = [
  // {
  //   icon: mdiChartPie,
  //   name: "Charts",
  //   subItems: [
  //     { name: "Line Chart", path: "#", pro: false },
  //     { name: "Bar Chart", path: "#", pro: false },
  //   ],
  // },
  // {
  //   icon: mdiPackageVariantClosed,
  //   name: "UI Elements",
  //   subItems: [
  //     { name: "Alerts", path: "#", pro: false },
  //     { name: "Avatar", path: "#", pro: false },
  //     { name: "Badge", path: "#", pro: false },
  //     { name: "Buttons", path: "#", pro: false },
  //     { name: "Images", path: "#", pro: false },
  //     { name: "Videos", path: "#", pro: false },
  //   ],
  // },
  // {
  //   icon: mdiPowerPlug,
  //   name: "Authentication",
  //   subItems: [
  //     { name: "Sign In", path: "/login", pro: false },
  //     { name: "Sign Up", path: "/register", pro: false },
  //   ],
  // },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  // Efek untuk membuka submenu secara otomatis berdasarkan route aktif
  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType, index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  // Efek untuk menghitung tinggi submenu untuk animasi
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer w-full flex items-center ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`flex items-center justify-center ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-brand-500"
                    : "text-gray-500"
                }`}
              >
                <Icon path={nav.icon} size={1} />
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="menu-item-text ml-3">{nav.name}</span>
                  <Icon
                    path={mdiChevronDown}
                    size={0.8}
                    className={`ml-auto transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group flex items-center ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                } ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path) ? "text-brand-500" : "text-gray-500"
                  }`}
                >
                  <Icon path={nav.icon} size={1} />
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text ml-3">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {/* Submenu Dropdown */}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item flex items-center ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active text-brand-500"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span className="menu-dropdown-badge bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px]">
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span className="menu-dropdown-badge bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-[10px]">
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link
          to="/"
          className="flex items-center font-bold text-xl text-gray-900 dark:text-white"
        >
          {isExpanded || isHovered || isMobileOpen ? (
            <span className="whitespace-nowrap">Dashboard</span>
          ) : (
            <span className="text-2xl">MD</span>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {/* Main Menu Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <Icon path={mdiDotsHorizontal} size={1} />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
