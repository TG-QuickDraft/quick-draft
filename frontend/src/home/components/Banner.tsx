import clsx from "clsx";
import BannerImg from "@/assets/img/banner.png";

export const Banner = () => {
  const containerClasses = clsx(
    "relative",
    "h-80 w-full",
    "overflow-hidden",
    "select-none",
    "shadow-inner",
  );

  const imageClasses = clsx(
    "absolute inset-0",
    "w-full h-full",
    "object-cover",
  );

  const overlayClasses = clsx(
    "absolute inset-0",
    "bg-gradient-to-b",
    "from-black/70",
    "via-black/40",
    "to-black/70",
    "z-10",
  );

  const textWrapperClasses = clsx(
    "relative z-20",
    "flex items-center justify-center",
    "h-full px-4",
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
      <img src={BannerImg} alt="Banner" className={imageClasses} />
      <div className={overlayClasses} />
      <div className={textWrapperClasses}>
        <p className={textClasses}>
          Encontre os Melhores Freelancers Designers do Brasil Aqui!
        </p>
      </div>
    </div>
  );
};
