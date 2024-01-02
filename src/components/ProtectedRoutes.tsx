import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user } = useAuth();

  // Check if the user has the required role
  const hasRequiredRole = user && user.role === requiredRole;

  // If the user has the required role, render the children
  if (hasRequiredRole) {
    return <>{children}</>;
  }

  // If the user doesn't have the required role, redirect or render an error message
  return <Navigate to="/unauthorized" />;
  // Alternatively, you can render an error message component instead of redirecting
  // return <ErrorMessage message="You don't have permission to access this page" />;
};

export default ProtectedRoute;
