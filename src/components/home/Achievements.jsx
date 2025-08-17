import { Award, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const Achievements = ({ achievements }) => (
  <section id="achievements" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="section-title dark:text-dark-text">My <span className="themed-text">Achievements</span></h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A collection of my notable achievements and awards.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className="bg-white dark:bg-dark-card rounded-lg shadow p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg border group relative overflow-hidden hover:themed-border themed-glow-hover"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex items-start justify-between relative z-10">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-dark-text group-hover:themed-text">{achievement.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{achievement.subtitle}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{achievement.description}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{achievement.date}</span>
            </div>
            {achievement.url && (
              <a
                href={achievement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center themed-text"
              >
                <Award className="w-4 h-4 mr-1" />
                View Credential
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

Achievements.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      description: PropTypes.string.isRequired,
      date: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default Achievements;
