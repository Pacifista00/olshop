import { useState } from "react";

const Select = ({
  options,
  value,
  placeholder = "Select an option",
  onChange,
  className = "",
}) => {
  return (
    <select
      className={`h-11 w-full rounded-lg border px-4 py-2.5 ${
        value ? "text-gray-800" : "text-gray-400"
      } ${className}`}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
