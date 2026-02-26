import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { IMaskInput } from "react-imask";
import CurrencyInput from "react-currency-input-field";
import clsx from "clsx";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: any | "currency";
  showErrorMsg?: boolean;
  password?: boolean;
  maskChar?: string | null;
  icon?: React.ReactNode;
  error?: string;
  onCurrencyChange?: (value: string | undefined) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      showErrorMsg,
      mask,
      maskChar = null,
      icon,
      password,
      onCurrencyChange,
      type = "text",
      value,
      error,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasError = Boolean(error);
    const errorClasses = clsx("block text-error-1 text-sm mt-0.5");
    const baseClasses = clsx(
      "w-full py-3 px-4",
      "border border-[#D1D0D0] bg-white rounded-lg",
      "text-[16px] font-normal text-neutral-60",
      "outline-none",
      "placeholder:text-neutral-40 placeholder:font-normal",
      "focus:shadow-md focus:transition-all focus:duration-200",
      "[appearance:textfield]",
      "[&::-webkit-outer-spin-button]:appearance-none",
      "[&::-webkit-inner-spin-button]:appearance-none",

      hasError
        ? "border border-error-1 focus:border-error-1 animate-shake"
        : "border border-[#D1D0D0] focus:border-gray-400",

      className,
    );

    const togglePassword = () => setShowPassword((prev) => !prev);

    const renderIcon = () => {
      if (!icon) return null;

      return (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {icon}
        </span>
      );
    };

    const renderPasswordToggle = () => {
      if (!password) return null;

      return (
        <button
          type="button"
          onClick={togglePassword}
          className={clsx(
            "absolute right-4 -translate-y-1/2",
            error && showErrorMsg ? "top-1/3" : "top-1/2",
          )}
        >
          {showPassword ? (
            <FiEye className="cursor-pointer" />
          ) : (
            <FiEyeOff className="cursor-pointer" />
          )}
        </button>
      );
    };

    const renderWithContainer = (children: React.ReactNode) => (
      <div className="relative w-full">
        {children}
        {renderPasswordToggle()}
        {renderIcon()}
      </div>
    );

    if (mask === "currency") {
      return (
        <div className="w-full">
          <CurrencyInput
            placeholder={placeholder}
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            className={baseClasses}
            onValueChange={onCurrencyChange}
            value={value as string}
          />
        </div>
      );
    }

    if (mask && mask !== "currency") {
      return renderWithContainer(
        <>
          <div className="w-full">
            <IMaskInput
              mask={mask}
              placeholder={placeholder}
              {...props}
              inputRef={ref}
              className={baseClasses}
            />
          </div>
          {error && showErrorMsg && (
            <span className={errorClasses}>{error}</span>
          )}
        </>,
      );
    }

    if (password) {
      return renderWithContainer(
        <>
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={baseClasses}
            maxLength={20}
            value={value}
            placeholder={placeholder}
            {...props}
          />
          {error && showErrorMsg && (
            <span className={errorClasses}>{error}</span>
          )}
        </>,
      );
    }

    return renderWithContainer(
      <>
        <input
          ref={ref}
          className={baseClasses}
          type={type}
          value={value}
          placeholder={placeholder}
          {...props}
        />
        {error && showErrorMsg && <span className={errorClasses}>{error}</span>}
      </>,
    );
  },
);

Input.displayName = "Input";
export default Input;
