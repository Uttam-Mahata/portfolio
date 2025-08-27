import { Code, Server, Database, Brain, Terminal, Coffee, Award } from 'lucide-react';
import QuickFact from '../QuickFact';
import TechCategory from '../TechCategory';

const About = () => {
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
    'Google Cloud': 'https://gcpicons.com/gcp-logo.svg',
    
    
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
              My <span className="themed-text">Journey</span>
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
                  'Bitbucket', 'Docker', 'Google Cloud'
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

export default About;