import React from 'react';
import { Briefcase, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Experience = () => {
  const { theme } = useTheme();
  const experiences = [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      period: 'Jan 2022 - Present',
      description: 'Led the frontend development team in creating modern web applications.',
      achievements: [
        'Improved application performance by 40% through code optimization',
        'Led a team of 5 developers in implementing new features',
        'Established coding standards and best practices',
        'Mentored junior developers and conducted code reviews'
      ],
      technologies: ['React', 'TypeScript', 'Redux', 'Tailwind CSS']
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Digital Innovations Lab',
      location: 'New York, NY',
      period: 'Mar 2020 - Dec 2021',
      description: 'Developed and maintained full-stack applications for various clients.',
      achievements: [
        'Built and deployed 10+ client projects',
        'Implemented responsive designs and improved UX',
        'Integrated third-party APIs and services',
        'Reduced server response time by 50%'
      ],
      technologies: ['Node.js', 'React', 'MongoDB', 'Express']
    },
    {
      id: 3,
      role: 'Junior Developer',
      company: 'StartUp Vision',
      location: 'Boston, MA',
      period: 'Jun 2018 - Feb 2020',
      description: 'Started as a junior developer working on web applications.',
      achievements: [
        'Developed and maintained company website',
        'Assisted in creating user authentication system',
        'Collaborated with design team on UI implementations',
        'Participated in daily scrum meetings'
      ],
      technologies: ['JavaScript', 'HTML/CSS', 'PHP', 'MySQL']
    }
  ];

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

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

          {/* Experience Cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={exp.id} 
                experience={exp} 
                isLeft={index % 2 === 0}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience, isLeft, delay }) => {
  return (
    <div 
      className={`relative flex flex-col md:flex-row items-center ${
        isLeft ? 'md:flex-row-reverse' : ''
      } animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-dark-bg" />

      {/* Card */}
      <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
        isLeft ? 'md:ml-8' : 'md:mr-8'
      }`}>
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