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
  setUserInfo: any,
  userInfo: UserInfo | null;
  getUser: any;
  updateUser: (updatedInfo: Partial<UserInfo>) => Promise<void>;
  deleteUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { accessToken } = useAuth()
  
  const getUser = async () => {
    
    try {
      const response: any = await getUserInfo(accessToken);
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
      const userJson:any = localStorage.getItem('user')
      const userParse = JSON.parse(userJson)
      const response = await axios.put<UserInfo>(
        `http://localhost:8080/users/${userParse.id}`,
        updatedInfo,
      );

      setUserInfo({ ...userInfo, ...response.data }); // Merge updated data with existing userInfo
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const deleteUser = async () => {
    try {

      await axios.delete('http://localhost:8080/user');

      setUserInfo(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ getUser, setUserInfo, userInfo, updateUser, deleteUser }}>
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