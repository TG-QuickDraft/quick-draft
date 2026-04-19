import clsx from "clsx";

const base = clsx(
  "px-4 py-2 rounded cursor-pointer border border-gray-600/20",
  "transition hover:scale-103 hover:shadow-lg active:scale-95",
);

const widths = {
  full: "w-full",
  auto: "w-auto",
  fit: "w-fit",
  fixed: "w-[200px]",
};

export const variants = {
  primary: clsx(base, "bg-primary-100 text-white"),
  secondary: clsx(base, "bg-secondary-80 text-neutral-80"),
  danger: clsx(base, "bg-red-500 text-white"),
  outline: clsx(base, "bg-white text-black"),
  error: clsx(base, "bg-error-1 text-white"),
  success: clsx(base, "bg-success-1 text-white"),
};

const reversedVariants = {
  primary: "",
  secondary: clsx(base, "border border-neutral-20 text-neutral-80"),
  danger: clsx(base, "border border-red-500 text-red-500"),
  outline: "",
  error: "",
  success: "",
};

const Button = ({
  children,
  variant = "primary",
  className,
  width = "auto",
  icon,
  reversed,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
  width?: keyof typeof widths;
  reversed?: boolean;
}) => {
  const currentVariant = reversed
    ? reversedVariants[variant]
    : variants[variant];

  return (
    <button
      className={clsx(
        widths[width],
        currentVariant,
        className,
        "disabled:bg-neutral-20",
        "disabled:cursor-not-allowed disabled:hover:scale-100! shadow-none!",
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        {children}
      </div>
    </button>
  );
};

export default Button;
