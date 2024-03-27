import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // TODO use user to display some identfiying information
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setCurrentUser("user");
    setToken(token);
    // TODO use cookies instead of localStorage
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
