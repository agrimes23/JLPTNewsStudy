"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { getUserInfo } from "@/api/userApi";

// Define types for user information
type UserInfo = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};

// Define the UserContextType
type UserContextType = {
  setUserInfo: any;
  userInfo: UserInfo | null;
  getUser: any;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { accessToken } = useAuth();

  const getUser = async () => {
    try {
      if (accessToken) {
        const response: any = await getUserInfo(accessToken);
        setUserInfo(response);
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

 

  return (
    <UserContext.Provider
      value={{ getUser, setUserInfo, userInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
