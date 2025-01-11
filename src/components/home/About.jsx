import React from 'react';
import { Code, Server, Database, Brain, Terminal, Coffee, Globe, Award } from 'lucide-react';
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
    'DBMS': 'https://img.icons8.com/color/48/000000/database.png',
    'OS': 'https://img.icons8.com/color/48/000000/operating-system.png',
    'Computer Networking': 'https://img.icons8.com/color/48/000000/network.png',
    
    // Web Development
    'HTML': 'https://img.icons8.com/color/48/000000/html-5.png',
    'CSS': 'https://img.icons8.com/color/48/000000/css3.png',
    'JavaScript': 'https://img.icons8.com/color/48/000000/javascript.png',
    'TypeScript': 'https://img.icons8.com/color/48/000000/typescript.png',
    'Angular': '/angular_gradient.png',
    'React': 'https://img.icons8.com/color/48/000000/react-native.png',
    'Spring Boot': 'https://img.icons8.com/color/48/000000/spring-logo.png',
    'Bootstrap': 'https://img.icons8.com/color/48/000000/bootstrap.png',
    'PrimeNG': 'https://www.primefaces.org/presskit/primeng-logo.svg',
    'Flask': 'https://img.icons8.com/cute-clipart/48/000000/flask.png',
    
    
    // Data Science & ML
    'NumPy': 'https://img.icons8.com/color/48/000000/numpy.png',
    'Pandas': 'https://img.icons8.com/color/48/000000/pandas.png',
    'Scikit-learn': 'https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png',
    'Jupyter': 'https://img.icons8.com/fluency/48/000000/jupyter.png',
    'Matplotlib': 'https://img.icons8.com/color/48/000000/graph.png',
    'Seaborn': 'https://img.icons8.com/external-soft-fill-juicy-fish/48/000000/external-chart-graphs-and-charts-soft-fill-soft-fill-juicy-fish.png',
    'Keras': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Keras_Logo.jpg?20160918183624',
    'TensorFlow': 'https://img.icons8.com/color/48/000000/tensorflow.png',
    // Others
    'Linux': 'https://img.icons8.com/color/48/000000/linux.png',
    'Git': 'https://img.icons8.com/color/48/000000/git.png',
    'AWS': 'https://img.icons8.com/color/48/000000/amazon-web-services.png',
    'GitHub': 'https://img.icons8.com/fluency/48/000000/github.png',
    'Bitbucket': 'https://img.icons8.com/color/48/000000/bitbucket.png',
    'Docker': 'https://img.icons8.com/color/48/000000/docker.png',
  };

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
    

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Personal Info */}
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
              My Journey
            </h3>
            <div className="prose prose-lg text-gray-600 dark:text-gray-400">
              <p>
                My journey in technology began in high school, where I discovered my passion for coding and web development. 
                Through self-learning and curiosity about how the internet works, I taught myself programming despite having 
                no formal computer science education. This self-driven exploration sparked my ongoing passion for technology.
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

          {/* Right Column - Tech Stacks */}
          <div className="space-y-6 animate-slide-up delay-200">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
              Technical Skills
            </h3>
            
            <div className="space-y-4">
              <TechCategory 
                icon={<Code />}
                title="Programming Languages"
                technologies={['C/C++', 'Java', 'Python']}
                techIcons={techIcons}
              />

              <TechCategory 
                icon={<Database />}
                title="Technical Skills"
                technologies={['Data Structures', 'Algorithms', 'DBMS', 'OS', 'Computer Networking']}
                techIcons={techIcons}
              />

              <TechCategory 
                icon={<Server />}
                title="Web Development"
                technologies={[
                  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React',
                  'Spring Boot', 'Bootstrap', 'PrimeNG', 'Flask'
                ]}
                techIcons={techIcons}
              />

              <TechCategory 
                icon={<Brain />}
                title="Data Science & ML"
                technologies={[
                  'NumPy', 'Pandas', 'Scikit-learn', 'Jupyter',
                  'Matplotlib', 'Seaborn', 'Keras', 'TensorFlow'
                ]}
                techIcons={techIcons}
              />

              <TechCategory 
                icon={<Terminal />}
                title="Others"
                technologies={[
                  'Linux', 'Git', 'AWS', 'GitHub',
                  'Bitbucket', 'Docker'
                ]}
                techIcons={techIcons}
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

const TechCategory = ({ icon, title, technologies, techIcons }) => (
  <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-lg hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-2 mb-4">
      {React.cloneElement(icon, { className: 'w-5 h-5 text-primary-600 dark:text-primary-400' })}
      <h4 className="text-lg font-medium text-gray-900 dark:text-dark-text">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-3">
      {technologies.map((tech) => (
        <div 
          key={tech}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 
                     text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium 
                     hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
        >
          {techIcons[tech] && (
            <img 
              src={techIcons[tech]} 
              alt={`${tech} icon`}
              className="w-5 h-5"
            />
          )}
          <span>{tech}</span>
        </div>
      ))}
    </div>
  </div>
);

export default About;