"use client";

import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import ArrowDownIcon from "@/assets/svgs/ArrowDownIcon";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

export default function Select({
  value,
  onChange,
  options,
  disabled = false,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => setIsOpen(false), isOpen);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Select an option"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white outline-none text-left flex items-center justify-between"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {selectedOption?.label || "Select an option"}
        </span>
        <ArrowDownIcon
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-[200px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-label={option.label}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                  value === option.value
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
