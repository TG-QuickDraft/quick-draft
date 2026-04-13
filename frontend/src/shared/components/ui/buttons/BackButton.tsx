import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Title from "../titles/Title";
import clsx from "clsx";

export const BackButton = ({
  textContent = "Voltar",
  children,
  className,
}: {
  textContent?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx("bg-white border-0 flex gap-2 cursor-default", className)}
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={clsx(
          "text-black hover:-translate-x-1 ",
          "transition duration-200 cursor-pointer",
        )}
      >
        <MdKeyboardDoubleArrowLeft size={30} />
      </button>
      <Title className="text-black">{children || textContent}</Title>
    </div>
  );
};
