import clsx from "clsx";

const base = clsx("text-neutral-60 font-area-extended line-clamp-1");

const sizes = {
  sm: "text-[14px]!",
  md: "text-[16px]!",
  lg: "text-[18px]!",
};

const variants = {
  bold: clsx(base, "font-semibold text-[18px]"),
  light: clsx(base, "font-normal text-[14px] text-left"),
};

const Label = ({
  children,
  variant = "bold",
  size = "lg",
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) => {
  return <p className={clsx(variants[variant], sizes[size])}>{children}</p>;
};

export default Label;
