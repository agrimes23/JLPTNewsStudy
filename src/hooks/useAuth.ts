import React from 'react'

import { useState } from 'react';

// FIXME: need to test

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          return userData;
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
  };


  const logout = () => {
    setUser(null);
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!user; 
  };

  return { user, login, logout, isAuthenticated };
};

export default useAuth