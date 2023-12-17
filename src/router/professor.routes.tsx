import { RouteObject } from "react-router-dom";

import ProfessorView from "../pages/profesor/ProfessorView";
import ProfessorLayout from "../layouts/ProfessorLayout";

export const ProfessorRoutes: RouteObject = {
  path: "/profesors",
  element: <ProfessorLayout />,

  children: [{ path: "proyectos/", element: <ProfessorView /> }],
};
