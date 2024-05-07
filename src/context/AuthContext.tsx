"use client"
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
// import Router from 'next/router';

// Define the type for login function
type LoginFunction = (email: string, password: string) => Promise<void>;

// Define the AuthContextType
type AuthContextType = {
  isAuthenticated: boolean;
  login: LoginFunction;
  logout: () => void;
  checkAuth: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define the login function
  const login: LoginFunction = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });

      // Handle different response status codes
      if (response.status === 200) {
        // Save the session token in local storage or cookie
        localStorage.setItem('sessionToken', response.data.authentication.sessionToken);
        // Set isAuthenticated to true
        setIsAuthenticated(true);
        // Optionally, redirect the user to a different page
        // Router.push('/dashboard');
      } else {
        console.log("oof did not get sc 200 for login :(")
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login failed:', error);
      // Optionally, display a generic error message to the user
    }
  };

  // Define the logout function
  const logout = () => {
    // perform logout logic, set isAuthenticated to false
    setIsAuthenticated(false);
  };

  const checkAuth = () => {
    // Check if session token exists or other authentication state
    // Update isAuthenticated state accordingly
    const sessionToken = localStorage.getItem('sessionToken');
    setIsAuthenticated(!!sessionToken); // Set isAuthenticated based on presence of sessionToken
  };

  // Run checkAuth when component mounts to initialize authentication state
  useEffect(() => {
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
