import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./admin.router";
import { Root } from "./root.router";
import { AuthRoutes } from "./auth.routes";
// import PageLogin from "../pages/auth/login";

export const router = createBrowserRouter([Root, AdminRoutes, AuthRoutes]);
