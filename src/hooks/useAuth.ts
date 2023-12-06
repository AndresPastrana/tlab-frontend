import { useContext } from "react";
import { AuthContext } from "../context/AuthConext";

// Custom hook to consume the AuthContext
// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
