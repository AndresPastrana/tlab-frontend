import { RouteObject } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";
import StudentMainView from "../pages/student/StudentMainView";
import WelcomePage from "../pages/student/WelcomePage";

export const StudentRoutes: RouteObject = {
  path: "/student",
  element: <StudentLayout />,

  children: [
    { index: true, element: <WelcomePage /> },
    { path: "proyecto/", element: <StudentMainView /> },
    { path: "evaluaciones/", element: <h1>Student</h1> },
  ],
};
