"use client";

import { privateAxios, publicAxios } from "@/components/axiosInstance/axios";
import { storage } from "@/lib/storage";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isNotification: any;
  error: string | null;
  login: (credential: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// Default value for context (used by createContext)
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  isNotification: null,
  error: null,
  login: async () => {},
  logout: async () => {},
};

//   create context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// custom hook to access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an authProvider");
  }
  return context;
};

// provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotification, setIsNotification] = useState<any>(null);

  // console.log("Inside auth context", user);
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true); // Start loading
      const token = storage.getItem("authToken");

      if (token) {
        try {
          const { data } = await privateAxios.get("/auth/me");

          if (data?.data?.type == "admin") {
            setUser(data?.data);
          } else {
            storage.removeItem("authToken");
          }
        } catch (error) {
          // storage.removeItem("authToken");
          setUser(null);
          //console.log("Auth error", error);
        }
      }
      setIsLoading(false); // End loading (always runs)
    };

    checkUser();
  }, []);

  // Login method
  const login = async (credentials: { email: string; password: string }) => {
    //console.log("Logging from context:", credentials);
    setIsLoading(true);
    try {
      const response = await publicAxios.post("/auth/login", credentials);

      const authorization = response.data;
      storage.setItem("authToken", authorization.authorization.access_token);
      // setUser(authorization?.user); //login er time ey data return korle directly set kore deowa jaito

      // Set up user state on first login time
      const token = storage.getItem("authToken");
      if (token) {
        try {
          const { data } = await privateAxios.get("/auth/me");
          if (data?.data?.type == "admin") {
            setUser(data?.data);
          } else {
            storage.removeItem("authToken");
          }
        } catch (error) {
          setUser(null);
        }
      }

      return authorization;
    } catch (error: any) {
      let errorRes = error?.response?.data?.message?.message;
      setError(errorRes || "Unknown error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // await privateAxios.post("/users/logout");
      setUser(null);
      storage.removeItem("authToken");
    } catch (error) {
      setError(`Error from logout: ${error} `);
    } finally {
      setIsLoading(false);
    }
  };

  // auth info
  const authInfo: AuthContextType = {
    user,
    isLoading,
    isNotification,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
export default AuthProvider;
