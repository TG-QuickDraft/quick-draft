import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Title from "../titles/Title";
import clsx from "clsx";

export const BackButton = ({
  textContent = "Voltar",
  className,
}: {
  textContent?: string;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <Button
      className={clsx("mt-6 bg-white border-0", className)}
      icon={<MdKeyboardDoubleArrowLeft className="text-black" size={30} />}
      onClick={() => navigate(-1)}
    >
      <Title className="text-black">{textContent}</Title>
    </Button>
  );
};
