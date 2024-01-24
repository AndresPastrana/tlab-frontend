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
import ProyectsView from "../pages/admin/proyects/ProyectsView";
import CreateProyectView from "../pages/admin/proyects/CreateProyectView";
import Evaluaciones from "../pages/admin/evaluaciones/Evaluaciones";
import { EvaluationsFilterProvider } from "../context/EvaluationFilterContext";
import { EvalSubmissions } from "../pages/admin/evaluaciones/EvalSubmissions";
import DefenseCreationComponent from "../components/admin/defense/CreateNewDefense";
import DefenseSearchComponent from "../components/admin/defense/Repository";
import ProtectedRoute from "../components/ProtectedRoutes";
import { UserRole } from "../const";
import TesisProjectStatsComponent from "../pages/admin/Admin";
import Footer from "../components/Footer";
import AcademicRanksComponent from "../pages/admin/categorias/AcademicRank";
import CategoriasConatiner from "../pages/admin/categorias/CategoriasConatiner";

export const AdminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <ProtectedRoute requiredRole={UserRole.Admin}>
      <AdminLayout />,
      <Footer />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <TesisProjectStatsComponent /> },
    { path: "personas/", element: <PagePersonas /> },
    { path: "courts/", element: <CourtsView /> },
    { path: "personas/profesors", element: <ProfesorView /> },
    { path: "personas/students", element: <StudentsView /> },
    { path: "personas/profesors/create", element: <CreateProfesorsView /> },
    { path: "personas/students/create", element: <CreateStudentView /> },
    { path: "proyectos/", element: <ProyectsView /> },
    {
      path: "proyectos/create",
      element: <CreateProyectView />,
    },

    {
      path: "defense/",

      children: [
        { index: true, element: <DefenseSearchComponent /> },
        {
          path: "create",
          element: <DefenseCreationComponent />,
        },
      ],
    },
    {
      path: "evaluaciones/",
      element: (
        <EvaluationsFilterProvider>
          <Evaluaciones />
        </EvaluationsFilterProvider>
      ),
    },

    {
      path: "evaluaciones/:id/submissions",
      element: <EvalSubmissions />,
    },
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
    { path: "/admin/personas/categorias", element: <CategoriasConatiner /> },
  ],
};
