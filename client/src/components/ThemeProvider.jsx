import React, { useEffect } from 'react';
import useNameStore from '../store/useNameStore';

const ThemeProvider = ({ children }) => {
  const { isDarkMode } = useNameStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Always apply dark mode for premium experience
    root.classList.add('dark');
    
    // Set the body background to match our premium dark theme
    document.body.style.backgroundColor = '#020617'; // dark-950
    document.body.style.fontFamily = 'Inter, ui-sans-serif, system-ui';
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-dark-950 text-white transition-colors duration-300">
      {children}
    </div>
  );
};

export default ThemeProvider; 