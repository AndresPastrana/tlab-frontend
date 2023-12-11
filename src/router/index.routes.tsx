import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./admin.routes";
import { Root } from "./root.router";
import { AuthRoutes } from "./auth.routes";
import { StudentRoutes } from "./student.routes";
// import PageLogin from "../pages/auth/login";

export const router = createBrowserRouter([
  Root,
  AdminRoutes,
  AuthRoutes,
  StudentRoutes,
]);
