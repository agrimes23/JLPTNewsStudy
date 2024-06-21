"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { register as apiRegister } from '@/api/authentication'; 
import { login as apiLogin } from '@/api/authentication'; 
import { getRefreshToken } from "@/api/authentication";
import { logout as apiLogout } from '@/api/authentication'
import { getUserInfo } from "@/api/userApi";

// Define the shape of the user data and context state
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  checkAndRefreshAccessToken: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const response = await getRefreshToken()
      const {accessToken} = response.data;
      setAccessToken(accessToken);

      if (accessToken) {
        const userRes: any = await getUserInfo(accessToken);
        setUser(userRes);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // Handle error (e.g., redirect to login page)
    }
  };

  // Function to check and refresh access token on page reload
  const checkAndRefreshAccessToken = async () => {
    try {
      if (!accessToken) {
        await refreshAccessToken();
      } else {
        const userRes: any = await getUserInfo(accessToken);
        setUser(userRes);
      }
    } catch (error) {
      console.error("Error checking and refreshing access token:", error);
      // Handle error (e.g., redirect to login page)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAndRefreshAccessToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password)

      const { accessToken, user } = response;
      setAccessToken(accessToken);
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    apiLogout()
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const response = await apiRegister(firstName, lastName, email, password)
    const { accessToken, user } = response;
    setAccessToken(accessToken);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        register,
        checkAndRefreshAccessToken,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };