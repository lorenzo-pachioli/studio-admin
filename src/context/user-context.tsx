"use client";

import { getAdminById, getNullAdmin } from "@/services/operations";
import { IAdmin } from "@/types";
import { SessionPayload } from "@/types/session";
import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext<{
  user: IAdmin;
  setUser: React.Dispatch<React.SetStateAction<IAdmin>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  login: (userData: IAdmin) => void;
}>({
  user: getNullAdmin(),
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
  login: () => {},
});

export default function UserProvider({
  children,
  session,
}: {
  children: any;
  session: SessionPayload;
}) {
  const newUser: IAdmin = getNullAdmin();
  const [user, setUser] = useState(newUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const reLogin = async () => {
      try {
        if (session.uid) {
          const userData = await getAdminById(session.uid);
          login(userData);
        } else {
          logout();
        }
      } catch (error) {
        logout();
        console.error("Error during re-login:", error);
      }
    };
    !isAuthenticated && reLogin();
  }, [session]);

  const logout = () => {
    const userNull: IAdmin = getNullAdmin();
    setIsAuthenticated(false);
    setUser(userNull);
  };

  const login = (userData: IAdmin) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
