import { LogoIcon } from "@/shared/assets";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { homePaths } from "@/features/home/routes/homePaths"

const sizes = {
  sm: "h-10",
  md: "h-14",
  lg: "h-20",
};

const SystemLogo = ({ size = "lg" }: { size?: keyof typeof sizes }) => {
  return (
    <div className="flex w-full justify-center items-center">
      <Link to={homePaths.home}>
        <img
          className={clsx(
            "object-contain transition-transform duration-200 hover:scale-105",
            sizes[size],
          )}
          src={LogoIcon}
          onError={(e) => {
            e.currentTarget.src = LogoIcon;
          }}
          alt="Logo do sistema"
        />
      </Link>
    </div>
  );
};

export default SystemLogo;
