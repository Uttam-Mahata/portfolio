import { Award } from 'lucide-react';
import PropTypes from 'prop-types';

const Certifications = ({ certifications }) => (
  <section id="certifications" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="section-title dark:text-dark-text">Professional Certifications</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          My professional certifications and achievements
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <div 
            key={cert.id}
            className="bg-white dark:bg-dark-card rounded-lg shadow p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-dark-text">{cert.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{cert.date}</span>
            </div>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
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
