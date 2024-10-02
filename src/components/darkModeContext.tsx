// src/contexts/DarkModeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context
interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context with default values
export const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Create a provider component
export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  // Apply the dark mode class to document.body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
