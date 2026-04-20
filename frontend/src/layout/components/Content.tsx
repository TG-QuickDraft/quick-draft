import clsx from "clsx";
import { useLocation } from "react-router-dom";

import { homePaths } from "@/features/home/routes/homePaths";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import { executionPaths } from "@/features/services/execution/routes/executionPaths";

const fullScreenPaths = [
  homePaths.home,
  executionPaths.chatServico,
  servicoPaths.meuServico,
];

const Content = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isFullScreen = fullScreenPaths.some((path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path),
  );

  return (
    <div className={clsx("flex flex-col flex-1 p-6", isFullScreen && "p-0!")}>
      {children}
    </div>
  );
};

export default Content;
