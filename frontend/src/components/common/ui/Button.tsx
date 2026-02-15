import clsx from "clsx";

const base = clsx(
  "px-4 py-2 rounded cursor-pointer ",
  "transition hover:scale-105 hover:shadow-lg",
);

const widths = {
  full: "w-full",
  auto: "w-auto",
  fit: "w-fit",
  fixed: "w-[200px]",
};

export const variants = {
  primary: clsx(base, "bg-primary-100 text-black text-secondary-100"),
  secondary: clsx(base, "bg-secondary-80 text-white"),
  default: clsx(base, "bg-white text-secondary-100"),
  danger: clsx(base, "bg-red-500 text-white"),
};

const Button = ({
  children,
  variant = "default",
  className,
  width = "auto",
  icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
  width?: keyof typeof widths;
}) => {
  return (
    <button
      className={clsx(widths[width], variants[variant], className)}
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
