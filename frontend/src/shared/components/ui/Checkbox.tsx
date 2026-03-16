import React, { forwardRef } from "react";
import clsx from "clsx";
import Label from "./Label";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  children?: React.ReactNode;
  labelVariant?: "bold" | "light";
  checkboxSize?: "sm" | "md" | "lg";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label = "Checkbox",
      children,
      checkboxSize = "sm",
      labelVariant,
      checked,
      onChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = checked !== undefined;

    return (
      <div className="flex gap-2 items-center">
        <label className="flex items-center cursor-pointer relative">
          <input
            ref={ref}
            type="checkbox"
            checked={isControlled ? checked : undefined}
            onChange={onChange}
            className="opacity-0 absolute inset-0 w-6 h-6 cursor-pointer z-10 peer sr-only"
            {...props}
          />

          <div
            className={clsx(
              "relative inline-flex items-center justify-center w-6 h-6 rounded-md",
              "peer-checked:bg-primary-100 peer-checked:border-none",
              "transition-all duration-150 cursor-pointer shrink-0",
              "bg-white border border-[#D1D5DB]",
            )}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </label>

        <Label variant={labelVariant} size={checkboxSize}>
          {children || label}
        </Label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
