import clsx from "clsx";
import { forwardRef } from "react";

const variants = {
  primary: clsx(
    "border w-full transition focus:shadow-xl border-gray-500/30 p-3 rounded focus:outline-none",
  ),
};

const hasError = clsx("border-red-500");

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: keyof typeof variants;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "primary", className, error, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={clsx(variants[variant], className, error && hasError)}
          {...rest}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </>
    );
  },
);

Input.displayName = "Input";

export default Input;
