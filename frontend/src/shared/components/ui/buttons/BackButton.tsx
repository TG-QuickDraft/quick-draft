import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Title from "../titles/Title";

export const BackButton = ({
  textContent = "Voltar",
}: {
  textContent?: string;
}) => {
  const navigate = useNavigate();

  return (
    <Button
      className="mt-6 bg-white border-0"
      icon={<MdKeyboardDoubleArrowLeft className="text-black" size={30} />}
      onClick={() => navigate(-1)}
    >
      <Title className="text-black">{textContent}</Title>
    </Button>
  );
};
