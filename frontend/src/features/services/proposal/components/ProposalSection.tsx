import clsx from "clsx";

const ProposalSection = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const base = clsx("flex flex-col flex-1 p-10 lg:p-8 md:p-5");
  const variants = {
    primary: clsx(base, "gap-5"),
    secondary: clsx(base, "bg-neutral-10 gap-8"),
  };

  return <div className={variants[variant]}>{children}</div>;
};

export default ProposalSection;
