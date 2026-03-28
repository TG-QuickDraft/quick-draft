import clsx from "clsx";
import { useLocation } from "react-router-dom";

import { homePaths } from "@/features/home/routes/homePaths"

const Content = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === homePaths.home;
  return (
    <div className={clsx("flex flex-col h-full", !isHome && "p-6")}>
      {children}
    </div>
  );
};

export default Content;
