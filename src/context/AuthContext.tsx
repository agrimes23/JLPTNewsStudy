"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '@/api/userApi';

// Define the shape of the user data and context state
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  checkAndRefreshAccessToken: any;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  const refreshAccessToken = async () => {
    
    try {
      // Make a request to the backend to refresh the access token
      const response = await axios.get('http://localhost:8080/auth/refresh', {
        withCredentials: true,
      });
      // Extract the new access token from the response
      const { accessToken } = response.data;
      console.log("access token refresh: " + JSON.stringify(accessToken))

      // Update the access token in state
      setAccessToken(accessToken);

      // Proceed with fetching user information
      if (accessToken) {
        const userRes: any = await getUserInfo(accessToken);
        setUser(userRes)
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Handle error (e.g., redirect to login page)
    }
  };

  // Function to check and refresh access token on page reload
  const checkAndRefreshAccessToken = async () => {
    try {
      if (!accessToken) {       
        await refreshAccessToken();

      } else {
        await getUserInfo(accessToken);
      }
    } catch (error) {
      console.error('Error checking and refreshing access token:', error);
      // Handle error (e.g., redirect to login page)
    }
  };

  useEffect(() => {
    checkAndRefreshAccessToken();
  }, []);


  const login = async (email: string, password: string) => {
 
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password }, { withCredentials: true });
  
      const { accessToken, user } = response.data;
      setAccessToken(accessToken);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    // Optionally, you can also clear the refresh token cookie by making an API call to the logout endpoint.
    axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await axios.post('http://localhost:8080/auth/register', { firstName, lastName, email, password }, { withCredentials: true });
    const { accessToken, user } = response.data;
    setAccessToken(accessToken);
    setUser(user);
  };


  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, register, checkAndRefreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };