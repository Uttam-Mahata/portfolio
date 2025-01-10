import React from 'react';
import { Code, Server, Palette, Globe, Coffee, Award } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

  return (
    <section id="about" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
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
          <h2 className="section-title dark:text-dark-text">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate developer with a keen eye for detail and a commitment to creating 
            efficient, scalable, and user-friendly applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
              My Journey
            </h3>
            <div className="prose prose-lg text-gray-600 dark:text-gray-400">
              <p>
                With over 5 years of experience in web development, I've worked on 
                various projects ranging from small business websites to large-scale 
                enterprise applications.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying up-to-date 
                with the latest technologies and best practices in the industry.
              </p>
            </div>
            
            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <QuickFact icon={<Coffee />} title="Projects" value="50+" />
              <QuickFact icon={<Globe />} title="Clients" value="30+" />
              <QuickFact icon={<Award />} title="Experience" value="5+ Years" />
              <QuickFact icon={<Code />} title="Technologies" value="20+" />
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-6 animate-slide-up delay-200">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
              Technical Skills
            </h3>
            
            <div className="space-y-8">
              <SkillCategory 
                icon={<Code />}
                title="Frontend Development"
                skills={[
                  { name: 'React', level: 90 },
                  { name: 'JavaScript', level: 85 },
                  { name: 'HTML/CSS', level: 90 },
                  { name: 'Vue.js', level: 75 },
                ]}
              />

              <SkillCategory 
                icon={<Server />}
                title="Backend Development"
                skills={[
                  { name: 'Node.js', level: 85 },
                  { name: 'Python', level: 80 },
                  { name: 'SQL', level: 75 },
                  { name: 'MongoDB', level: 70 },
                ]}
              />

              <SkillCategory 
                icon={<Palette />}
                title="Design & Others"
                skills={[
                  { name: 'UI/UX Design', level: 75 },
                  { name: 'Git', level: 85 },
                  { name: 'DevOps', level: 70 },
                  { name: 'Agile', level: 80 },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuickFact = ({ icon, title, value }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-card rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    {React.cloneElement(icon, { className: 'w-6 h-6 text-primary-600 dark:text-primary-400' })}
    <div>
      <div className="font-bold text-gray-900 dark:text-dark-text">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  </div>
);

const SkillCategory = ({ icon, title, skills }) => (
  <div className="space-y-4 p-6 bg-gray-50 dark:bg-dark-card rounded-lg hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-2">
      {React.cloneElement(icon, { className: 'w-5 h-5 text-primary-600 dark:text-primary-400' })}
      <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text">{title}</h4>
    </div>
    <div className="space-y-3">
      {skills.map((skill) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default About;