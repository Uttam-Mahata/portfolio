import React, { useState } from 'react';
import { Type } from 'lucide-react';
import { useFont, FONT_FAMILIES } from '../context/FontContext';

const FontPicker = ({ className = '', isMobile = false }) => {
  const { fontFamily, changeFontFamily } = useFont();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleFontChange = (font) => {
    changeFontFamily(font);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={toggleDropdown}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-300 focus:outline-none focus-themed flex items-center space-x-2"
        aria-label="Change font family"
      >
        <Type className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline-block">Font</span>
      </button>

      {isOpen && (
        <div className={`
          ${isMobile 
            ? 'fixed top-16 left-4 right-4 z-50' // Position at top of screen on mobile
            : 'absolute right-0 z-50'} 
          mt-2 rounded-md shadow-lg bg-white dark:bg-dark-card ring-1 ring-black ring-opacity-5 py-1 max-h-96 overflow-y-auto`
        }>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 sticky top-0 bg-white dark:bg-dark-card">
            Choose Font Family
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2 my-1"></div>
          <div className="py-1">
            {Object.keys(FONT_FAMILIES).map(font => {
              const fontObj = FONT_FAMILIES[font];
              
              return (
                <button
                  key={font}
                  onClick={() => handleFontChange(font)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                  style={{ fontFamily: fontObj.fontFamily }}
                >
                  <div className="flex flex-col">
                    <span className="text-gray-800 dark:text-gray-200 text-base">{fontObj.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">The quick brown fox jumps over the lazy dog</span>
                  </div>
                  {fontFamily === font && (
                    <span className="flex-shrink-0 ml-2 text-primary-600 dark:text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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

export default FontPicker;
