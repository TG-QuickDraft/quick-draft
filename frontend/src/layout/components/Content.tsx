import clsx from "clsx";
import { useLocation } from "react-router-dom";

const Content = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className={clsx("flex-1 flex flex-col", !isHome && "p-6")}>
      {children}
    </div>
  );
};

export default Content;
