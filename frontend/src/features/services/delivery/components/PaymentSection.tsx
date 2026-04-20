import clsx from "clsx";

const PaymentSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("flex flex-col flex-1 gap-6", className)}>
      {children}
    </div>
  );
};

export default PaymentSection;
