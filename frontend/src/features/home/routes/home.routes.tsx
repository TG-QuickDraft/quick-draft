import { Home } from "../pages/Home";
import { OldHome } from "../pages/OldHome";
import { homePaths } from "@/features/home/routes/homePaths"

export const homeRoutes = [
  { path: homePaths.home, element: <Home /> },
  { path: homePaths.oldHome, element: <OldHome /> },
];