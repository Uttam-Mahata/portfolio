import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdDownload, MdKeyboardArrowDown } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-50 to-primary-100 dark:from-dark-bg dark:to-dark-bg transition-colors duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'light' 
            ? 'radial-gradient(circle at 25px 25px, black 1px, transparent 0)'
            : 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile Image */}
        <div className="p-4 mb-8 inline-block animate-fade-in">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white dark:border-dark-border shadow-lg hover:scale-105 transition-transform duration-300">
            <img 
              src="/u.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-slide-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-dark-text">
            Uttam Mahata
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            Full Stack Developer & AI/ML Enthusiast
          </p>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            I'm a full-stack developer and ML enthusiast who builds innovative web applications with modern technologies. 
            I focus on writing clean code while exploring AI and creating scalable solutions.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <SocialLink href="https://github.com/Uttam-Mahata" icon={<FaGithub size={20} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/uttam-mahata-4b0364259/" icon={<FaLinkedin size={20} />} label="LinkedIn" />
            <SocialLink href="mailto:uttam-mahata-cs@outlook.com" icon={<MdEmail size={20} />} label="Email" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a 
              href="/Resume_Uttam_Mahata.pdf"
              className="px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <MdDownload className="w-5 h-5 mr-2" />
              Download CV
            </a>
            <button 
              onClick={handleProjectsClick}
              className="px-6 py-3 rounded-full bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              View Projects
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <MdKeyboardArrowDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
    aria-label={label}
  >
    {React.cloneElement(icon, { 
      className: 'text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300' 
    })}
  </a>
);

export default Hero;