import PropTypes from 'prop-types';
import React from 'react';

// Color config for different technology categories
const categoryColors = {
  'Programming Languages': {
    light: {
      container: 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-800',
      tag: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    dark: {
      container: 'dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-indigo-900/10 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/20 dark:border-blue-900/30',
      icon: 'dark:text-blue-400',
      title: 'dark:text-blue-300',
      tag: 'dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40'
    }
  },
  'Web Development': {
    light: {
      container: 'bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border-emerald-200',
      icon: 'text-emerald-600',
      title: 'text-emerald-800',
      tag: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
    },
    dark: {
      container: 'dark:bg-gradient-to-br dark:from-emerald-900/20 dark:to-green-900/10 dark:hover:from-emerald-900/30 dark:hover:to-green-900/20 dark:border-emerald-900/30',
      icon: 'dark:text-emerald-400',
      title: 'dark:text-emerald-300',
      tag: 'dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/40'
    }
  },
  'Technical Skills': {
    light: {
      container: 'bg-gradient-to-br from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border-amber-200',
      icon: 'text-amber-600',
      title: 'text-amber-800',
      tag: 'bg-amber-100 text-amber-700 hover:bg-amber-200'
    },
    dark: {
      container: 'dark:bg-gradient-to-br dark:from-amber-900/20 dark:to-yellow-900/10 dark:hover:from-amber-900/30 dark:hover:to-yellow-900/20 dark:border-amber-900/30',
      icon: 'dark:text-amber-400',
      title: 'dark:text-amber-300',
      tag: 'dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/40'
    }
  },
  'Data Science & ML': {
    light: {
      container: 'bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 border-purple-200',
      icon: 'text-purple-600',
      title: 'text-purple-800',
      tag: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    },
    dark: {
      container: 'dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-violet-900/10 dark:hover:from-purple-900/30 dark:hover:to-violet-900/20 dark:border-purple-900/30',
      icon: 'dark:text-purple-400',
      title: 'dark:text-purple-300',
      tag: 'dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/40'
    }
  },
  'Others': {
    light: {
      container: 'bg-gradient-to-br from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 border-gray-200',
      icon: 'text-gray-600',
      title: 'text-gray-800',
      tag: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    },
    dark: {
      container: 'dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-slate-800/30 dark:hover:from-gray-800/60 dark:hover:to-slate-800/40 dark:border-gray-700/50',
      icon: 'dark:text-gray-400',
      title: 'dark:text-gray-300',
      tag: 'dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/60'
    }
  }
};

const TechCategory = ({ icon, title, technologies, techIcons }) => {
  return (
    <div className="p-6 rounded-lg transition-all duration-500 hover:shadow-lg group border themed-accent-bg-light hover:themed-glow no-pattern">
      {/* Remove any background patterns by adding no-pattern class */}
      {/* Remove any absolute positioning that might be causing pattern issues */}
      
      <div className="flex items-center space-x-2 mb-4 relative z-10">
        {React.cloneElement(icon, { className: "w-5 h-5 themed-text" })}
        <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text">{title}</h4>
      </div>
      
      <div className="flex flex-wrap gap-3 relative z-10">
        {technologies.map((tech) => (
          <div 
            key={tech}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium 
                     transition-colors duration-300 themed-badge no-pattern"
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
};

TechCategory.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  techIcons: PropTypes.object.isRequired,
};

export default TechCategory;