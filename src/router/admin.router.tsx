import { RouteObject } from "react-router-dom";

import PagePersonas from "../pages/admin/Personas";
import AdminLayout from "../layouts/AdminLayout";
import ProfesorView from "../pages/admin/professors/ProfesorView";
import CreateProfesorsView from "../pages/admin/professors/CreateProfesorsView";
import EditProfesorView from "../pages/admin/professors/EditProfessorView";

export const AdminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "personas/", element: <PagePersonas /> },
    { path: "personas/profesors", element: <ProfesorView /> },
    { path: "personas/profesors/create", element: <CreateProfesorsView /> },
    {
      path: "personas/profesors/edit/:id",
      element: <EditProfesorView />,
    },
  ],
};
