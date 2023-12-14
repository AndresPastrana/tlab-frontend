import { RouteObject } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";
import StudentMainView from "../pages/student/StudentMainView";
import WelcomePage from "../pages/student/WelcomePage";
import StudentsEvaluationsComponent from "../pages/student/StudentsEvaluationsComponent";

export const StudentRoutes: RouteObject = {
  path: "/student",
  element: <StudentLayout />,

  children: [
    { index: true, element: <WelcomePage /> },
    { path: "proyecto/", element: <StudentMainView /> },
    { path: "evaluaciones/", element: <StudentsEvaluationsComponent /> },
  ],
};
