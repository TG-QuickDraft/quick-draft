import clsx from "clsx";

const base = "px-4 py-2 rounded cursor-pointer transition";

export const variants = {
  primary: clsx(
    base,
    "bg-gray-100 text-black",
    "hover:shadow-xl hover:shadow-gray-600/50"
  ),

  secondary: clsx(
    base,
    "bg-black/60 text-white",
    "hover:shadow-xl hover:shadow-gray-600/20"
  ),
};

const Button = ({
  children,
  variant = "primary",
  className,
  icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
}) => {
  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      <div className="flex items-center justify-center gap-2">
        {icon}
        {children}
      </div>
    </button>
  );
};

export default Button;
