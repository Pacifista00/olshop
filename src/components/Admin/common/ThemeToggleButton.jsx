import { useTheme } from "../../../context/ThemeContext";

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center h-11 w-11 rounded-full
        bg-white border border-gray-200 text-gray-500
        transition-colors
        hover:bg-gray-100 hover:text-gray-700
        dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400
        dark:hover:bg-gray-800 dark:hover:text-white"
    >
      {/* 🌞 Sun icon (dark mode active) */}
      <svg
        className="hidden dark:block"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99998 1.5415C10.4142 1.5415 10.75 1.87729 10.75 2.2915V3.5415C10.75 3.95572 10.4142 4.2915 9.99998 4.2915C9.58577 4.2915 9.24998 3.95572 9.24998 3.5415V2.2915C9.24998 1.87729 9.58577 1.5415 9.99998 1.5415ZM10.0009 6.79327C8.22978 6.79327 6.79402 8.22904 6.79402 10.0001C6.79402 11.7712 8.22978 13.207 10.0009 13.207C11.772 13.207 13.2078 11.7712 13.2078 10.0001C13.2078 8.22904 11.772 6.79327 10.0009 6.79327Z"
          fill="currentColor"
        />
      </svg>

      {/* 🌙 Moon icon (light mode active) */}
      <svg
        className="dark:hidden"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.4547 11.97C16.6418 13.7499 14.8657 14.5035 12.9154 14.5035C8.81835 14.5035 5.49707 11.1823 5.49707 7.08524C5.49707 5.13487 6.25073 3.35885 7.48132 2.03522C4.21532 2.77574 1.54199 6.07486 1.54199 10.0003C1.54199 14.6717 5.32892 18.4586 10.0003 18.4586C13.9257 18.4586 17.2249 15.7853 18.1799 12.1611C18.1265 11.4982 17.8401 11.3266 17.4547 11.97Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default ThemeToggleButton;
