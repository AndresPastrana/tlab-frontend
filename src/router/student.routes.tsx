import { RouteObject } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";
import StudentMainView from "../pages/student/StudentMainView";

export const StudentRoutes: RouteObject = {
  path: "/student",
  element: <StudentLayout />,

  children: [
    { path: "project/", element: <StudentMainView /> },
    { path: "evaluations/", element: <h1>Student</h1> },
  ],
};
