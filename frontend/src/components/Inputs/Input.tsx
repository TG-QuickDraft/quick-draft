import clsx from "clsx";

const variants = {
  primary: clsx(
    "border w-full transition focus:shadow-xl border-gray-500/30 p-3 rounded focus:outline-none"
  ),
};

const Input = ({
  variant = "primary",
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: keyof typeof variants;
}) => {
  return <input className={`${variants[variant]} ${className}`} {...rest} />;
};

export default Input;
