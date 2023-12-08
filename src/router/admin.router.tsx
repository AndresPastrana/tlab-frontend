import { RouteObject } from "react-router-dom";

import PagePersonas from "../pages/admin/Personas";
import AdminLayout from "../layouts/AdminLayout";
import ProfesorView from "../pages/admin/professors/ProfesorView";
import CreateProfesorsView from "../pages/admin/professors/CreateProfesorsView";
import EditProfesorView from "../pages/admin/professors/EditProfessorView";
import StudentsView from "../pages/admin/students/StudentsView";
import CreateStudentView from "../pages/admin/students/CreateStudentView";
import HistoryView from "../pages/admin/students/HistoryView";
import EditStudentView from "../pages/admin/students/EditStudentView";
import CourtsView from "../pages/admin/courts/CourtsView";

export const AdminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "personas/", element: <PagePersonas /> },
    { path: "courts/", element: <CourtsView /> },
    { path: "personas/profesors", element: <ProfesorView /> },
    { path: "personas/students", element: <StudentsView /> },
    { path: "personas/profesors/create", element: <CreateProfesorsView /> },
    { path: "personas/students/create", element: <CreateStudentView /> },
    {
      path: "personas/profesors/edit/:id",
      element: <EditProfesorView />,
    },
    {
      path: "personas/students/edit/:id",
      element: <EditStudentView />,
    },
    {
      path: "personas/students/:id/historial",
      element: <HistoryView />,
    },
  ],
};
