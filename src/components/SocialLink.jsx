import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SocialLink = ({ href, icon, label, className = '' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden ${className}`}
      aria-label={label}
    >
      {/* Add animated ring effect */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-500"></span>
      
      {/* Add shimmer effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
      
      {/* Icon with dynamic styling based on parent hover state */}
      {React.cloneElement(icon, { 
        className: 'transition-colors duration-300 relative z-10 group-hover:text-inherit' 
      })}
    </a>
  );
};

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SocialLink;