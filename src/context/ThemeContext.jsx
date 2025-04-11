import React, { createContext, useContext, useState, useEffect } from 'react';

// Available color themes
export const COLOR_THEMES = {
  blue: {
    name: 'Blue',
    primary: {
      light: { 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
      dark: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' }
    },
    secondary: {
      light: { 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490' },
      dark: { 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' }
    },
    accent: {
      light: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd' },
      dark: { 800: '#075985', 900: '#0c4a6e', 950: '#082f49' }
    }
  },
  green: {
    name: 'Green',
    primary: {
      light: { 500: '#10b981', 600: '#059669', 700: '#047857' },
      dark: { 400: '#34d399', 500: '#10b981', 600: '#059669' }
    },
    secondary: {
      light: { 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e' },
      dark: { 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' }
    },
    accent: {
      light: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0' },
      dark: { 800: '#065f46', 900: '#064e3b', 950: '#022c22' }
    }
  },
  purple: {
    name: 'Purple',
    primary: {
      light: { 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9' },
      dark: { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' }
    },
    secondary: {
      light: { 500: '#d946ef', 600: '#c026d3', 700: '#a21caf' },
      dark: { 400: '#e879f9', 500: '#d946ef', 600: '#c026d3' }
    },
    accent: {
      light: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe' },
      dark: { 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' }
    }
  },
  amber: {
    name: 'Amber',
    primary: {
      light: { 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
      dark: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' }
    },
    secondary: {
      light: { 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
      dark: { 400: '#f87171', 500: '#ef4444', 600: '#dc2626' }
    },
    accent: {
      light: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a' },
      dark: { 800: '#92400e', 900: '#78350f', 950: '#451a03' }
    }
  },
  rose: {
    name: 'Rose',
    primary: {
      light: { 500: '#f43f5e', 600: '#e11d48', 700: '#be123c' },
      dark: { 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48' }
    },
    secondary: {
      light: { 500: '#ec4899', 600: '#db2777', 700: '#be185d' },
      dark: { 400: '#f472b6', 500: '#ec4899', 600: '#db2777' }
    },
    accent: {
      light: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3' },
      dark: { 800: '#9f1239', 900: '#881337', 950: '#4c0519' }
    }
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Light/Dark Mode
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // First try to get the saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // If no saved theme, check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Color Theme
  const [colorTheme, setColorTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedColorTheme = localStorage.getItem('colorTheme');
      if (savedColorTheme && COLOR_THEMES[savedColorTheme]) {
        return savedColorTheme;
      }
    }
    return 'blue'; // Default color theme
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply light/dark mode
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Apply color theme
    root.style.setProperty('--theme-primary', COLOR_THEMES[colorTheme].primary[theme === 'light' ? 'light' : 'dark'][500]);
    root.style.setProperty('--theme-primary-light', COLOR_THEMES[colorTheme].primary[theme === 'light' ? 'light' : 'dark'][400] || COLOR_THEMES[colorTheme].primary[theme === 'light' ? 'light' : 'dark'][500]);
    root.style.setProperty('--theme-primary-dark', COLOR_THEMES[colorTheme].primary[theme === 'light' ? 'light' : 'dark'][600]);
    
    root.style.setProperty('--theme-secondary', COLOR_THEMES[colorTheme].secondary[theme === 'light' ? 'light' : 'dark'][500]);
    root.style.setProperty('--theme-secondary-light', COLOR_THEMES[colorTheme].secondary[theme === 'light' ? 'light' : 'dark'][400] || COLOR_THEMES[colorTheme].secondary[theme === 'light' ? 'light' : 'dark'][500]);
    root.style.setProperty('--theme-secondary-dark', COLOR_THEMES[colorTheme].secondary[theme === 'light' ? 'light' : 'dark'][600]);
    
    root.style.setProperty('--theme-accent-50', COLOR_THEMES[colorTheme].accent[theme === 'light' ? 'light' : 'dark'][50] || '#f9fafb');
    root.style.setProperty('--theme-accent-100', COLOR_THEMES[colorTheme].accent[theme === 'light' ? 'light' : 'dark'][100] || '#f3f4f6');
    root.style.setProperty('--theme-accent-200', COLOR_THEMES[colorTheme].accent[theme === 'light' ? 'light' : 'dark'][200] || '#e5e7eb');
    
    // Save preferences to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorTheme', colorTheme);
    
  }, [theme, colorTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      // Only update if user hasn't manually set a theme
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const changeColorTheme = (color) => {
    if (COLOR_THEMES[color]) {
      setColorTheme(color);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, changeColorTheme, availableThemes: COLOR_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};