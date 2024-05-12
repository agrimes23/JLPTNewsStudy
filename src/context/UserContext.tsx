"use client"
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Define types for user information
type UserInfo = {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
};

// Define the UserContextType
type UserContextType = {
  userInfo: UserInfo | null;
  updateUser: (updatedInfo: Partial<UserInfo>) => Promise<void>;
  deleteUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const getUser = async (userId: string) => {
    try{

        const sessionToken = localStorage.getItem('sessionToken');
        if (!sessionToken) {
        throw new Error('Session token not found');
        }

        const response = await axios.get<UserInfo>(`http://localhost:8080/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            }
        })
        console.log(`response: ${response}`)
    } catch (error) {
        console.error('Failed to update user info:', error);
    }
  }

  const updateUser = async (userId: string, updatedInfo: Partial<UserInfo>) => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      if (!sessionToken) {
        throw new Error('Session token not found');
      }

      const response = await axios.put<UserInfo>(`http://localhost:8080/users/${userId}`, updatedInfo, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
   
      setUserInfo(response.data);
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const deleteUser = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      if (!sessionToken) {
        throw new Error('Session token not found');
      }

      await axios.delete('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      // After deletion, optionally clear user info from state
      setUserInfo(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUser, deleteUser }}>
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