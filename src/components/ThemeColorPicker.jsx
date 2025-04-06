import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme, COLOR_THEMES } from '../context/ThemeContext';

const ThemeColorPicker = ({ className = '', isMobile = false }) => {
  const { colorTheme, changeColorTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleColorChange = (color) => {
    changeColorTheme(color);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={toggleDropdown}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-bg focus-themed flex items-center space-x-2"
        aria-label="Change color theme"
      >
        <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline-block">Theme Colors</span>
      </button>

      {isOpen && (
        <div className={`
          ${isMobile 
            ? 'fixed top-16 left-4 right-4 z-50' // Position at top of screen on mobile
            : 'absolute right-0 z-50'}
          mt-2 rounded-md shadow-lg bg-white dark:bg-dark-card ring-1 ring-black ring-opacity-5 py-1`
        }>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            Choose Theme Color
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2 my-1"></div>
          <div className="grid grid-cols-5 gap-2 p-2">
            {Object.keys(COLOR_THEMES).map(color => {
              const colorObj = COLOR_THEMES[color];
              const primaryColor = theme === 'light' ? colorObj.primary.light[500] : colorObj.primary.dark[500];
              
              return (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 ${colorTheme === color ? 'ring-2 ring-gray-600 dark:ring-gray-300' : ''}`}
                  style={{ backgroundColor: primaryColor }}
                  aria-label={`Change theme to ${colorObj.name}`}
                  title={colorObj.name}
                >
                  {colorTheme === color && (
                    <span className="flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeColorPicker;
