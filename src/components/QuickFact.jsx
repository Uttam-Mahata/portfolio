import PropTypes from 'prop-types';
import React from 'react';

const QuickFact = ({ icon, title, value }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-card rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    {React.cloneElement(icon, { className: 'w-6 h-6 text-primary-600 dark:text-primary-400' })}
    <div>
      <div className="font-bold text-gray-900 dark:text-dark-text">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  </div>
);

QuickFact.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default QuickFact;