import React from 'react';
import { Briefcase, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Experience = () => {
  const { theme } = useTheme();
  const experiences = [
      {
          id: 1,
          role: 'Full Stack Developer',
          company: 'Winners Education',
          location: 'Remote',
          period: 'Jun 2023 - Present',
          description: 'A scalable web application for a coaching institute, enhancing both UI/UX and backend performance.',
          achievements: [
              'Designed a Comprehensive Scoreboard Management System for tracking offline exam scores',
              'Smooth and responsive UI components for better user engagement and overall interface quality',
              'Integrated REST APIs with frontend components to facilitate dynamic content updates and real-time functionality',
              'Developed features for the admin interface, enabling download options for question papers as PDFs'
          ],
          technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Bootstrap', 'PrimeNG', 'MySQL', 'REST APIs', 'Docker', 'Bitbucket']
      },
    //    {
    //   id: 2,
    //   role: 'Junior Developer',
    //   company: 'StartUp Vision',
    //   location: 'Boston, MA',
    //   period: 'Jun 2018 - Feb 2020',
    //   description: 'Started as a junior developer working on web applications.',
    //   achievements: [
    //     'Developed and maintained company website',
    //     'Assisted in creating user authentication system',
    //     'Collaborated with design team on UI implementations',
    //     'Participated in daily scrum meetings'
    //   ],
    //   technologies: ['JavaScript', 'HTML/CSS', 'PHP', 'MySQL']
    // }
  ];

  const isSingleExperience = experiences.length === 1;

  return (
    <section id="experience" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'light' 
            ? 'radial-gradient(circle at 25px 25px, black 1px, transparent 0)'
            : 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title dark:text-dark-text">Professional Experience</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey and key achievements throughout my career
          </p>
        </div>

        <div className={`relative ${isSingleExperience ? 'flex justify-center' : ''}`}>
            {/* Conditional Timeline Line (Only when multiple experiences) */}
          {!isSingleExperience && (
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
          )}

          {/* Experience Cards */}
          <div className={`space-y-16 ${isSingleExperience ? 'max-w-3xl' : ''}`}>
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={exp.id} 
                experience={exp} 
                isLeft={!isSingleExperience && index % 2 === 0} // Determine side only if multiple
                isSingle={isSingleExperience}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience, isLeft, delay, isSingle }) => {
  return (
    <div 
      className={`relative flex flex-col md:flex-row items-center ${
        !isSingle && (isLeft ? 'md:flex-row-reverse' : '')
      } ${isSingle ? 'justify-center' : ''} animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {!isSingle && (
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-dark-bg" />
      )}

      {/* Card */}
      <div className={`w-full ${isSingle ? 'md:w-full': 'md:w-5/12' } ${
           !isSingle && (isLeft ? 'md:ml-8' : 'md:mr-8')
      } ${isSingle ? 'ml-0 md:ml-0' : 'ml-12 md:ml-0'}`}>
         <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text">{experience.role}</h3>
              <div className="flex items-center mt-1 space-x-2">
                <Briefcase className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                  {experience.company}
                  <ExternalLink className="inline-block w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {experience.period}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {experience.location}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">{experience.description}</p>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-dark-text">Key Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-dark-text mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;