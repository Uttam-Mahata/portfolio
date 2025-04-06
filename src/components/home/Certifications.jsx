import { Award } from 'lucide-react';
import PropTypes from 'prop-types';

// Map certification sources to specific theme colors
const certificationThemes = {
  'LinkedIn Learning': {
    light: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200',
      title: 'text-blue-800',
      issuer: 'text-blue-600',
      credential: 'text-blue-600 hover:text-blue-800 group-hover:text-blue-700'
    },
    dark: {
      bg: 'dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-blue-900/10 dark:hover:from-blue-900/30 dark:hover:to-blue-900/20 dark:border-blue-900/30',
      title: 'dark:text-blue-200',
      issuer: 'dark:text-blue-400',
      credential: 'dark:text-blue-400 dark:hover:text-blue-300 dark:group-hover:text-blue-300'
    }
  },
  'Udacity': {
    light: {
      bg: 'bg-gradient-to-br from-indigo-50 to-purple-100 hover:from-indigo-100 hover:to-purple-200 border-indigo-200',
      title: 'text-indigo-800',
      issuer: 'text-indigo-600',
      credential: 'text-indigo-600 hover:text-indigo-800 group-hover:text-indigo-700'
    },
    dark: {
      bg: 'dark:bg-gradient-to-br dark:from-indigo-900/20 dark:to-purple-900/10 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/20 dark:border-indigo-900/30',
      title: 'dark:text-indigo-200',
      issuer: 'dark:text-indigo-400',
      credential: 'dark:text-indigo-400 dark:hover:text-indigo-300 dark:group-hover:text-indigo-300'
    }
  },
  'default': {
    light: {
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-gray-200',
      title: 'text-gray-900',
      issuer: 'text-gray-600',
      credential: 'text-primary-600 hover:text-primary-700 group-hover:text-primary-700'
    },
    dark: {
      bg: 'dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-700/30 dark:hover:from-gray-800/60 dark:hover:to-gray-700/40 dark:border-gray-700/30',
      title: 'dark:text-gray-200',
      issuer: 'dark:text-gray-400',
      credential: 'dark:text-primary-400 dark:hover:text-primary-300 dark:group-hover:text-primary-300'
    }
  }
};

const Certifications = ({ certifications }) => (
  <section id="certifications" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="section-title dark:text-dark-text">Professional <span className="themed-text">Certifications</span></h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          My professional certifications and achievements
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (         
          <div 
            key={cert.id}
            className="bg-white dark:bg-dark-card rounded-lg shadow p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg border group relative overflow-hidden hover:themed-border themed-glow-hover"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-dark-text group-hover:themed-text">{cert.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{cert.date}</span>
            </div>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center themed-text"
            >
              <Award className="w-4 h-4 mr-1" />
              View Credential
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

Certifications.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      issuer: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      credentialUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Certifications;
