import clsx from "clsx";

const CreditCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "border-2 rounded-xl border-secondary-100 p-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 h-20 w-20 rounded-xl" />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CreditCard;
