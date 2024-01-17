import { RouteObject } from "react-router-dom";

import ProfessorView from "../pages/profesor/ProfessorView";
import ProfessorLayout from "../layouts/ProfessorLayout";
import ProtectedRoute from "../components/ProtectedRoutes";
import { UserRole } from "../const";
import Home from "../pages/profesor/Home";

export const ProfessorRoutes: RouteObject = {
  path: "/profesors",
  element: (
    <ProtectedRoute requiredRole={UserRole.Profesor}>
      <ProfessorLayout />
    </ProtectedRoute>
  ),

  children: [
    { path: "proyectos/", element: <ProfessorView /> },
    { index: true, element: <Home /> },
  ],
};
