import MockProfile from "@/assets/mock-profile.png";
import clsx from "clsx";

export const Home = () => {
  return (
    <>
      <Banner />
      <CreateAccountCard />
    </>
  );
};

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
      <button className={buttonClasses}>
        <div className={imageWrapperClasses}>
          <img src={MockProfile} alt="Account" />
        </div>

        <p className={textClasses}>Criar conta</p>
      </button>
    </div>
  );
};

export const Banner = () => {
  const containerClasses = clsx(
    "flex flex-col items-center justify-center",
    "h-80",
    "bg-gradient-to-b",
    "from-gray-700",
    "via-gray-500",
    "to-gray-400",
    "shadow-inner",
    "select-none",
  );

  const textClasses = clsx(
    "text-4xl",
    "text-center",
    "max-w-[720px]",
    "text-white",
    "drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]",
  );

  return (
    <div className={containerClasses}>
      <p className={textClasses}>
        Encontre os Melhores Freelancers Designers do Brasil Aqui!
      </p>
    </div>
  );
};
