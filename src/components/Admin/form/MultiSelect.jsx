import React, { useState, useEffect, useRef } from "react";

const MultiSelect = ({
  label,
  options,
  defaultSelected = [],
  value,
  onChange,
  disabled = false,
  placeholder = "Select options",
}) => {
  const isControlled = value !== undefined;

  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const selectedOptions = isControlled ? value : internalSelected;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const updateSelection = (newSelected) => {
    if (!isControlled) {
      setInternalSelected(newSelected);
    }
    if (onChange) {
      onChange(newSelected);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (optionValue) => {
    const newSelected = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((v) => v !== optionValue)
      : [...selectedOptions, optionValue];

    updateSelection(newSelected);
  };

  const removeOption = (optionValue) => {
    updateSelection(selectedOptions.filter((v) => v !== optionValue));
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    e.preventDefault();

    switch (e.key) {
      case "Enter":
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value);
        }
        break;

      case "Escape":
        setIsOpen(false);
        break;

      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;

      case "ArrowUp":
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label
        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
        id={`${label}-label`}
      >
        {label}
      </label>

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            className="w-full"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-labelledby={`${label}-label`}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
          >
            <div
              className={`mb-2 flex min-h-11 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs transition focus:border-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300 ${
                disabled
                  ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
                  : "cursor-pointer"
              }`}
            >
              <div className="flex flex-wrap flex-auto gap-2">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((value) => {
                    const text =
                      options.find((opt) => opt.value === value)?.text || value;

                    return (
                      <div
                        key={value}
                        className="group flex items-center rounded-full bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-white/90"
                      >
                        <span>{text}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!disabled) removeOption(value);
                          }}
                          disabled={disabled}
                          className="pl-2 text-gray-500 group-hover:text-gray-400 dark:text-gray-400 disabled:cursor-not-allowed"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-1 text-sm text-gray-400 dark:text-gray-500">
                    {placeholder}
                  </div>
                )}
              </div>

              <div className="flex items-center pl-1">
                <svg
                  className={`h-5 w-5 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M4.8 7.4L10 12.6L15.2 7.4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute left-0 z-40 w-full max-h-60 overflow-y-auto rounded-lg bg-white shadow-sm dark:bg-gray-900"
              role="listbox"
            >
              {options.map((option, index) => {
                const isSelected = selectedOptions.includes(option.value);
                const isFocused = index === focusedIndex;

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`cursor-pointer border-b border-gray-200 p-2 dark:border-gray-800 ${
                      isFocused ? "bg-primary/5" : ""
                    } ${isSelected ? "bg-primary/10" : ""}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="text-gray-800 dark:text-white/90">
                      {option.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
