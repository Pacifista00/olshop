import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useSidebar } from "../../context/SidebarContext";
import ThemeToggleButton from "../../components/Admin/common/ThemeToggleButton";
import UserDropdown from "../../components/Admin/header/UserDropdown";
import NotificationDropdown from "../../components/Admin/header/NotificationDropdown";

const AppHeader = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-99999 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row lg:px-6">
        {/* LEFT */}
        <div className="flex w-full items-center justify-between gap-2 px-3 py-3 lg:justify-normal lg:px-0 lg:py-4">
          <button
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.22 7.28a.75.75 0 011.06-1.06L12 10.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 11-1.06-1.06L10.94 12 6.22 7.28z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="16" height="12" fill="none" viewBox="0 0 16 12">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.58 1A.75.75 0 011.33.25h13.33a.75.75 0 010 1.5H1.33A.75.75 0 01.58 1zm0 10a.75.75 0 01.75-.75h13.33a.75.75 0 010 1.5H1.33a.75.75 0 01-.75-.75zM1.33 5.25a.75.75 0 000 1.5H8a.75.75 0 000-1.5H1.33z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <Link
            to="/"
            className="font-bold text-xl text-gray-900 dark:text-white lg:hidden"
          >
            Dashboard
          </Link>

          {/* SEARCH (Desktop only) */}
          <div className="hidden lg:block">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or type command..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-4 text-sm dark:border-gray-800 dark:text-white"
            />
          </div>

          {/* RIGHT (Mobile) */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* <ThemeToggleButton /> */}
            {/* <NotificationDropdown /> */}
            <UserDropdown />
          </div>
        </div>

        {/* RIGHT (Desktop) */}
        <div className="hidden items-center justify-end gap-4 lg:flex">
          {/* <ThemeToggleButton /> */}
          {/* <NotificationDropdown /> */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
