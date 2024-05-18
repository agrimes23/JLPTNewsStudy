"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

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
  refreshAccessToken: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
 
    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:8080/auth/login', { email, password }, { withCredentials: true });
  
      // Extract accessToken from the response
      const { accessToken, user } = response.data;
  
      // Set the accessToken in the context state
      setAccessToken(accessToken);
  
      // Optionally, set the user information in the context state
      setUser(user);
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
      // Optionally, you can handle login error and display appropriate messages to the user
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

  const refreshAccessToken = async () => {
    const response = await axios.post('http://localhost:8080/auth/refresh', {}, { withCredentials: true });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, register, refreshAccessToken }}>
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