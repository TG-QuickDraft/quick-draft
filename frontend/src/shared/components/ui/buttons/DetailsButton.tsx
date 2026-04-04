import clsx from "clsx";
import { FiEye } from "react-icons/fi";

const DetailsButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-lg ext-gray-700",
        "hover:bg-gray-100 hover:text-black transition cursor-pointer",
      )}
    >
      <FiEye size={18} />
      {children}
    </button>
  );
};

export default DetailsButton;
