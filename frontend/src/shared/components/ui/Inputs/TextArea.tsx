import { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  showErrorMsg?: boolean;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { placeholder, className, onInput, value, error, showErrorMsg, ...props },
    ref,
  ) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const setRef = (el: HTMLTextAreaElement) => {
      innerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref)
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          el;
    };

    const resize = (el: HTMLTextAreaElement) => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      resize(e.currentTarget);
      onInput?.(e);
    };

    useEffect(() => {
      if (innerRef.current) {
        resize(innerRef.current);
      }
    }, [value]);

    const hasError = Boolean(error);
    const errorClasses = clsx("block text-error-1 text-sm mt-1");

    return (
      <div>
        <textarea
          ref={setRef}
          {...props}
          value={value}
          rows={1}
          onInput={handleInput}
          className={clsx(
            "focus:outline-none w-full resize-none overflow-hidden border max-h-50",
            "border-neutral-20 rounded-lg text-[16px] text-neutral-80",
            "placeholder:text-neutral-40 placeholder:font-normal",
            "focus:shadow-md focus:transition-all focus:duration-200 focus:border-gray-400",
            "py-2.5 px-4 block!",
            hasError
              ? "border border-error-1! focus:border-error-1 animate-shake"
              : "border border-neutral-20 focus:border-gray-400",
            className,
          )}
          placeholder={placeholder}
        />
        {error && showErrorMsg && <span className={errorClasses}>{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
