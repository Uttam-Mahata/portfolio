import PropTypes from 'prop-types';
import React from 'react';

const TechCategory = ({ icon, title, technologies, techIcons }) => (
  <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-lg hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-2 mb-4">
      {React.cloneElement(icon, { className: 'w-5 h-5 text-primary-600 dark:text-primary-400' })}
      <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-3">
      {technologies.map((tech) => (
        <div 
          key={tech}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 
                     text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium 
                     hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
        >
          {techIcons[tech] && (
            <img 
              src={techIcons[tech]} 
              alt={`${tech} icon`}
              className="w-5 h-5"
            />
          )}
          <span>{tech}</span>
        </div>
      ))}
    </div>
  </div>
);

TechCategory.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  techIcons: PropTypes.object.isRequired,
};

export default TechCategory;