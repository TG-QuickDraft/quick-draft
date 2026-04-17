import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

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
        <div className=" h-20 border p-2 border-neutral-20 rounded-xl">
          <IoCardOutline className="w-full h-full" />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CreditCard;
