import PropTypes from 'prop-types';
import React from 'react';

const QuickFact = ({ icon, title, value }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-card rounded-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-lg border group relative overflow-hidden hover:themed-border themed-glow-hover no-pattern">
      {/* Remove any shimmer or background effects that might cause patterns */}
      
      {React.cloneElement(icon, { className: "w-6 h-6 themed-text relative z-10" })}
      <div className="relative z-10">
        <div className="font-bold text-gray-900 dark:text-dark-text group-hover:themed-text">{value}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      </div>
    </div>
  );
};

QuickFact.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default QuickFact;