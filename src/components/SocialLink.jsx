import PropTypes from 'prop-types';
import React from 'react';

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
    aria-label={label}
  >
    {React.cloneElement(icon, { 
      className: 'text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300' 
    })}
  </a>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

export default SocialLink;