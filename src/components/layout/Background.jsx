// If this file exists, check and update to exclude patterns from About section

// If there's a separate background component being used, we need to modify it to skip the About section
// This is just a template - adjust based on your actual file structure
import React from 'react';

const Background = ({ sectionId, children }) => {
  // Skip pattern for About section
  const isAboutSection = sectionId === 'about';
  
  return (
    <div className={`relative ${isAboutSection ? 'no-pattern' : ''}`}>
      {!isAboutSection && (
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pattern-dots" />
      )}
      {children}
    </div>
  );
};

export default Background;
