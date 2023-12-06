import React from "react";
import { UserRole } from "../const";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LogedUser } from "../types";

type RoleProtectedRouteProps = {
  allowedRoles: UserRole[]; // Array of allowed roles for this route
  redirectTo: string; // Path to redirect if the user doesn't have the required role
  children: React.ReactNode;
};

const hasRequiredRole = (user: LogedUser | null, allowedRoles: UserRole[]) => {
  return user && allowedRoles.includes(user.role as UserRole);
};

const ProtectedRoutes: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
  children,
  redirectTo,
}) => {
  // TODO: read the loged user
  const { user, token } = useAuth();

  // No Loged user
  if (!user || !token) {
    return <Navigate to={redirectTo} />;
  }

  // has access
  if (hasRequiredRole(user, allowedRoles)) {
    return <>{children}</>;
  }
  // no access
  return <h1>Unauthorized this router</h1>;
};

export default ProtectedRoutes;
