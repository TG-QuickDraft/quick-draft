import clsx from "clsx";
import { useLocation } from "react-router-dom";

import { homePaths } from "@/features/home/routes/homePaths";
import { servicoPaths } from "@/features/services/routes/servicoPaths";

const fullScreenPaths = [homePaths.home, servicoPaths.chatServico];

const Content = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isFullScreen = fullScreenPaths.includes(location.pathname);

  return (
    <div className={clsx("flex flex-col flex-1 p-6", isFullScreen && "p-0!")}>
      {children}
    </div>
  );
};

export default Content;
