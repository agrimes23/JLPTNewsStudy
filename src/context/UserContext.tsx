"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { getUserInfo } from '@/api/userApi';

// Define types for user information
type UserInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

// Define the UserContextType
type UserContextType = {
  fetchUserData: any,
  setUserInfo: any,
  userInfo: UserInfo | null;
  getUser: any;
  updateUser: (updatedInfo: Partial<UserInfo>) => Promise<void>;
  deleteUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  
  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get<UserInfo>('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(response.data);
      setUserId(response.data.id); // Assuming 'id' is the user ID field in the user data
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const getUser = async () => {
    console.log("ohh getting the user nice")
    try {
      if (!accessToken || !userId) {
        throw new Error('Access token or user ID not found');
      }

      const response: any = await getUserInfo(userId, accessToken);
      console.log("ooo response in get user: " + JSON.stringify(response))
      setUserInfo(response);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  const updateUser = async (updatedInfo: Partial<UserInfo>) => {
    try {
      if (!accessToken || !userInfo) {
        throw new Error('Access token or user info not found');
      }

      const response = await axios.put<UserInfo>(
        `http://localhost:8080/users/${userInfo.id}`, // Use userInfo.id here
        updatedInfo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserInfo({ ...userInfo, ...response.data }); // Merge updated data with existing userInfo
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const deleteUser = async () => {
    try {
      if (!accessToken || !userInfo) {
        throw new Error('Access token or user info not found');
      }

      await axios.delete('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserInfo(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ fetchUserData, getUser, setUserInfo, userInfo, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};