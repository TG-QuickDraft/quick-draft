import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, id, ...props }, ref) => {
    const uniqueId = useId();
    const inputId = id || uniqueId;

    return (
      <label
        htmlFor={inputId}
        className={clsx(
          "flex items-center gap-3 cursor-pointer select-none group",
          className,
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            id={inputId}
            ref={ref}
            className="peer sr-only"
            {...props}
          />

          <div
            className={clsx(
              "w-6 h-6 rounded-full border border-gray-600/20 bg-white",
              "transition-all duration-200 ease-in-out",
              "peer-checked:border-[5px] peer-checked:border-primary-60",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-green-600/50 peer-focus-visible:ring-offset-2",
            )}
          />
        </div>

        <span className="text-[20px] font-semibold group-hover:text-primary-20 transition-colors">
          {label}
        </span>
      </label>
    );
  },
);

Radio.displayName = "Radio";

export default Radio;
