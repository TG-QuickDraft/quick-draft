import clsx from "clsx";
import MockProfile from "@/assets/mock-profile.png";
import { Link } from "react-router-dom";

export const CreateAccountCard = () => {
  const buttonClasses = clsx(
    "group",
    "flex flex-col items-center gap-4",
    "px-10 py-8",
    "rounded-2xl",
    "bg-white",
    "transition-all duration-300",
    "hover:-translate-y-1",
    "active:scale-95",
    "cursor-pointer",
  );

  const imageWrapperClasses = clsx(
    "w-28 h-28",
    "transition-transform duration-300",
    "group-hover:scale-110",
  );

  const textClasses = clsx(
    "text-md font-semibold",
    "text-gray-700",
    "transition-colors",
    "group-hover:text-black",
  );

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Link to="/cadastrarUsuario">
        <button className={buttonClasses}>
          <div className={imageWrapperClasses}>
            <img src={MockProfile} alt="Account" />
          </div>
          <p className={textClasses}>Criar conta</p>
        </button>
      </Link>
    </div>
  );
};
