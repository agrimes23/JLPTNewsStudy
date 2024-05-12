"use client"
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
// import Router from 'next/router';

type LoginFunction = (email: string, password: string) => Promise<void>;

// Define the AuthContextType
type AuthContextType = {
  isAuthenticated: boolean;
  login: LoginFunction;
  logout: () => void;
  checkAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login: LoginFunction = async (email, password) => {
    console.log("helloooo login in auth context")
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      console.log(response.data.authentication.sessionToken)
      if (response.status === 200) {
        localStorage.setItem('sessionToken', response.data.authentication.sessionToken);
        setIsAuthenticated(true);
        console.log("yay the response was 200")
        // Router.push('/dashboard');
      } else {
        console.log("oof did not get sc 200 for login :(")
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    // perform logout logic, set isAuthenticated to false
    setIsAuthenticated(false);
  };

  const checkAuth = () => {

    const sessionToken = localStorage.getItem('sessionToken');
    setIsAuthenticated(!!sessionToken);
  };

  // Run checkAuth when component mounts to initialize authentication state
  useEffect(() => {
    console.log(localStorage);
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
