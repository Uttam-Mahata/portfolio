import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Code, Server, Database, Terminal, Coffee, Award } from 'lucide-react';
import QuickFact from '../QuickFact';
import TechCategory from '../TechCategory';
import { useTheme } from '../../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();
  
  const techIcons = {
    // Programming Languages
    'C/C++': 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png',
    'Java': 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png',
    'Python': 'https://img.icons8.com/color/48/000000/python.png',
    
    // Technical Skills
    'Data Structures': 'https://img.icons8.com/external-flaticons-flat-flat-icons/48/000000/external-algorithm-computer-science-flaticons-flat-flat-icons.png',
    'Algorithms': 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/48/000000/external-algorithm-data-analytics-flaticons-lineal-color-flat-icons.png',
    'Computer Architecture': 'https://img.icons8.com/?size=100&id=nQuaNO36nu68&format=png&color=000000',
    'DBMS': 'https://img.icons8.com/color/48/000000/database.png',
    'OS': 'https://img.icons8.com/color/48/000000/operating-system.png',
    'Computer Networking': 'https://img.icons8.com/color/48/000000/network.png',
    // Web Development
    'HTML': 'https://img.icons8.com/color/48/000000/html-5.png',
    'CSS': 'https://img.icons8.com/color/48/000000/css3.png',
    'JavaScript': 'https://img.icons8.com/color/48/000000/javascript.png',
    'Tailwind CSS': 'https://img.icons8.com/color/48/000000/tailwindcss.png',
    'Material UI': 'https://img.icons8.com/color/48/000000/material-ui.png',
    'TypeScript': 'https://img.icons8.com/color/48/000000/typescript.png',
    'Angular': '/angular_gradient.png',
    'React': 'https://img.icons8.com/color/48/000000/react-native.png',
    'Spring Boot': 'https://img.icons8.com/color/48/000000/spring-logo.png',
    'Bootstrap': 'https://img.icons8.com/color/48/000000/bootstrap.png',
    'PrimeNG': 'https://www.primefaces.org/presskit/primeng-logo.svg',
    'Flask': 'https://img.icons8.com/cute-clipart/48/000000/flask.png',
    'FastAPI': 'https://fastapi.tiangolo.com/img/logo-margin/logo-teal.svg',
    'Firebase': 'https://img.icons8.com/color/48/000000/firebase.png',
    'Google Cloud': 'https://img.icons8.com/color/600/google-cloud.png',
    
    // Others
    'Linux': 'https://img.icons8.com/color/48/000000/linux.png',
    'Git': 'https://img.icons8.com/color/48/000000/git.png',
    'AWS': 'https://img.icons8.com/color/48/000000/amazon-web-services.png',
    'GitHub': 'https://img.icons8.com/fluency/48/000000/github.png',
    'Bitbucket': 'https://img.icons8.com/color/48/000000/bitbucket.png',
    'Docker': 'https://img.icons8.com/color/48/000000/docker.png',
  };

  return (
    <section id="about" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300 no-pattern">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title dark:text-dark-text">About <span className="themed-text">Me</span></h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know my skills, experience, and background
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 items-start">
          {/* Left Column - Personal Info */}
          <div className="space-y-6 animate-slide-up p-6 glass-card group relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text group-hover:themed-text">
              About <span className="themed-text">Me</span>
            </h3>
            <div className="prose prose-lg text-gray-600 dark:text-gray-400 space-y-4">
              <p>
                Focused on Systems Engineering — Operating Systems, Computer Networks, and Distributed Systems.
              </p>
              <p>
                Interested in DevOps, Cloud Infrastructure, and Scalable Backend Systems.
              </p>
              <p>
                I like breaking down systems — from kernel-level concepts to distributed architectures.
              </p>
            </div>
            
            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <QuickFact icon={<Coffee />} title="Projects" value="5+" />
              <QuickFact icon={<Award />} title="Experience" value="1+ Years" />
            </div>
          </div>

          {/* Right Column - Tech Stacks */}
          <div className="space-y-6 animate-slide-up delay-200 p-6 glass-card group relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text group-hover:themed-text">
              <span className="themed-text">Technical</span> Skills
            </h3>
            
            <div className="space-y-4">
              <TechCategory 
                icon={<Code />}
                title="Programming Languages"
                technologies={['C/C++', 'Java', 'Python', 'TypeScript']}
                techIcons={techIcons}
              />

              <TechCategory 
                icon={<Database />}
                title="Technical Skills"
                technologies={['Data Structures', 'Algorithms', 'DBMS', 'OS', 'Computer Networking', 'Computer Architecture & Organization']}
                techIcons={techIcons}
              />

              <TechCategory 
                icon={<Server />}
                title="Web Development"
                technologies={[
                  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React',
                  'Spring Boot', 'Bootstrap', 'Tailwind CSS', 'PrimeNG', 'Flask', 'FastAPI', 'Firebase'
                ]}
                techIcons={techIcons}
              />

              <TechCategory 
                icon={<Terminal />}
                title="Others"
                technologies={[
                  'Linux', 'Git', 'AWS', 'GitHub',
                  'Bitbucket', 'Docker', 'Google Cloud'
                ]}
                techIcons={techIcons}
              />
            </div>
          </div>
        </div>

        {/* GitHub Contribution Calendar */}
        <div className="mt-16 animate-slide-up delay-300 p-6 md:p-8 glass-card group relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text mb-6">
            Days I <span className="themed-text">Code</span>
          </h3>
          <div className="w-full overflow-x-auto flex justify-center p-4 rounded-xl bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 shadow-sm">
            <GitHubCalendar 
              username="Uttam-Mahata" 
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              fontSize={14}
              blockSize={14}
              blockMargin={5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
