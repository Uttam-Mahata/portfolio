import React, { createContext, useContext, useState, useEffect } from 'react';

// Available font families
export const FONT_FAMILIES = {
  'inter': {
    name: 'Inter',
    fontFamily: "'Inter', sans-serif",
    weights: [400, 500, 600, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  },
  'poppins': {
    name: 'Poppins',
    fontFamily: "'Poppins', sans-serif",
    weights: [400, 500, 600, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
  },
  'roboto': {
    name: 'Roboto',
    fontFamily: "'Roboto', sans-serif",
    weights: [400, 500, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
  },
  'montserrat': {
    name: 'Montserrat',
    fontFamily: "'Montserrat', sans-serif",
    weights: [400, 500, 600, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
  },
  'opensans': {
    name: 'Open Sans',
    fontFamily: "'Open Sans', sans-serif",
    weights: [400, 500, 600, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
  },
  // Additional fonts
  'lato': {
    name: 'Lato',
    fontFamily: "'Lato', sans-serif",
    weights: [400, 700, 900],
    cssImport: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
  },
  'nunito': {
    name: 'Nunito',
    fontFamily: "'Nunito', sans-serif",
    weights: [400, 600, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
  },
  'playfair': {
    name: 'Playfair Display',
    fontFamily: "'Playfair Display', serif",
    weights: [400, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
  },
  'firacode': {
    name: 'Fira Code',
    fontFamily: "'Fira Code', monospace",
    weights: [400, 500, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap"
  },
  'merriweather': {
    name: 'Merriweather',
    fontFamily: "'Merriweather', serif",
    weights: [400, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
  },
  'raleway': {
    name: 'Raleway',
    fontFamily: "'Raleway', sans-serif",
    weights: [400, 500, 600, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap"
  },
  'sourcesans': {
    name: 'Source Sans Pro',
    fontFamily: "'Source Sans Pro', sans-serif",
    weights: [400, 600, 700],
    cssImport: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
  }
};

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  // Font Family
  const [fontFamily, setFontFamily] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedFont = localStorage.getItem('fontFamily');
      if (savedFont && FONT_FAMILIES[savedFont]) {
        return savedFont;
      }
    }
    return 'inter'; // Default font
  });

  useEffect(() => {
    // Apply font family to the root element
    const root = window.document.documentElement;
    root.style.setProperty('--font-family', FONT_FAMILIES[fontFamily].fontFamily);
    
    // Save preference to localStorage
    localStorage.setItem('fontFamily', fontFamily);
    
    // Load the font CSS if not already loaded
    const fontLink = document.getElementById(`font-${fontFamily}`);
    if (!fontLink) {
      const link = document.createElement('link');
      link.id = `font-${fontFamily}`;
      link.rel = 'stylesheet';
      link.href = FONT_FAMILIES[fontFamily].cssImport;
      document.head.appendChild(link);
    }
  }, [fontFamily]);

  const changeFontFamily = (font) => {
    if (FONT_FAMILIES[font]) {
      setFontFamily(font);
    }
  };

  return (
    <FontContext.Provider value={{ fontFamily, changeFontFamily, availableFonts: FONT_FAMILIES }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
