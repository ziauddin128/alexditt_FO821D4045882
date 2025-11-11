"use client";

import { privateAxios, publicAxios } from "@/components/axiosInstance/axios";
import { storage } from "@/lib/storage";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { io } from "socket.io-client";

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
  login: async () => { },
  logout: async () => { },
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
          const { data } = await privateAxios.get("/users/get-me");

          if (data?.data?.role == "admin") {
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
    // console.log("Logging from context:", credentials);
    setIsLoading(true);
    try {
      const response = await publicAxios.post("/users/login", credentials);

      const authorization = response.data;
      storage.setItem("authToken", authorization.token);
      setUser(authorization?.user);
      return authorization;
    } catch (error: any) {
      let errorRes = error?.response?.data?.message;

      if (errorRes === "deactivated") {
        errorRes = (
          <>
            Your account is deactivated. Please activate your account to log in.{" "}
            <Link
              href="/auth/active-account"
              className="text-blue-400 underline"
            >
              Activate your account
            </Link>
          </>
        );
      }
      setError(errorRes || "Unknown error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Socket For Real-time notification
  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_NOTIFICATION_BASE_URL, {
      extraHeaders: {
        Auth: storage.getItem("authToken") || "",
      },
    });
  }, []);

  const handleNotification = useCallback(async (payload: any) => {
    console.log(payload);
    setIsNotification(payload);
  }, []);

  useEffect(() => {
    socket.on("notification", handleNotification);

    /* socket.on("connect", () => {
      console.log("Connect");
    }); */

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

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
