import { RouteObject } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";

import ProfessorView from "../pages/profesor/ProfessorView";

export const ProfessorRoutes: RouteObject = {
  path: "/profesors",
  element: <StudentLayout />,

  children: [{ path: "fg/", element: <ProfessorView /> }],
};
