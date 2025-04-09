import PropTypes from 'prop-types';
import React from 'react';

const QuickFact = ({ icon, title, value }) => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100 dark:border-gray-700/30 hover:themed-border group relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800/50 themed-text">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="font-bold text-gray-900 dark:text-gray-100 group-hover:themed-text">{value}</p>
        </div>
      </div>
    </div>
  );
};

QuickFact.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default QuickFact;