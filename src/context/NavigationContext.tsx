"use client"
import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/router';

interface NavigationContextType {
  previousLocation: string;
  setPreviousLocation: (location: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }: any) => {
  const [previousLocation, setPreviousLocation] = useState<string>('/');
  return (
    <NavigationContext.Provider value={{ previousLocation, setPreviousLocation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};