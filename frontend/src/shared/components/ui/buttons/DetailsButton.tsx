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
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
    >
      <FiEye size={18} />
      {children}
    </button>
  );
};

export default DetailsButton;
