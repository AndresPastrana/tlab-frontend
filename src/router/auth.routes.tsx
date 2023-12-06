import { RouteObject } from "react-router-dom";
import PageLogin from "../pages/auth/login";

export const AuthRoutes: RouteObject = {
  path: "/login",
  element: <PageLogin />,
};
