import { ReactNode, createContext, useCallback, useState } from "react";
import { LogedUser } from "../types";

// Define a type for the context
type AuthContextType = {
  token: string | null;
  user: LogedUser | null;
  login: (token: string, user: LogedUser) => void;
  logout: () => void;
};

// Create a context with initial values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define a provider component that will wrap your app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from local storage or other sources
    return localStorage.getItem("token") || null;
  });
  const [user, setUser] = useState<LogedUser | null>(() => {
    // Initialize user data from local storage or other sources
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login function
  const login = useCallback((newToken: string, newUser: LogedUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  // Provide the context value to the components
  const contextValue: AuthContextType = {
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
