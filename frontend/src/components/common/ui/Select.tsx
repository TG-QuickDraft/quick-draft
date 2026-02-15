import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import CaretDownIcon from "@/assets/icons/ui/actions/caret-down.svg?react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Selecione",
  disabled,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? "");
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === selected);

  useEffect(() => {
    setSelected(value ?? "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    setSelected(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={clsx(
          "px-4 py-1.5 bg-white text-left cursor-pointer",
          "border-2 border-[#EFEFEF] ",
          "rounded-lg min-w-35",
          className,
        )}
      >
        <span className="font-light text-black pr-5">
          {selectedOption?.label ?? placeholder}
        </span>

        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <CaretDownIcon
            className={clsx("transition-transform", isOpen && "rotate-180")}
          />
        </span>
      </button>

      <div
        className={clsx(
          "absolute z-40 w-full bg-white shadow-lg mt-2 px-2",
          "border-2 border-t-0 border-[#EFEFEF]",
          "rounded-lg transition-all duration-200 ease-in-out",
          isOpen ? "py-2 max-h-50 opacity-100" : "max-h-0 py-0 opacity-0",
        )}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSelect(option)}
            className={clsx(
              "px-3 py-2 cursor-pointer text-sm font-light border-b border-black/20 last:border-0",
              "text-black",
            )}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
