import clsx from "clsx";

const PaymentWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col border rounded-xl border-neutral-20 p-5",
        "gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PaymentWrapper;
