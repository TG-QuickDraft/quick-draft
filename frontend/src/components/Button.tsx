import clsx from "clsx";

const base = "px-4 py-2 rounded cursor-pointer transition-shadow";

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
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) => {
  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
