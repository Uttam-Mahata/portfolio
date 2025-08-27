import { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Search,
  FilterIcon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PropTypes from 'prop-types';
const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const projects = [
    {
      id: 1,
      title: 'CourseWagon – AI-Powered Course Authoring & Management Tool',
      description: 'Built using Angular + Flask, automated curriculum generation via Gemini API (60% manual effort reduction). Deployed using Docker on GCP with role-based access control.',
      image: '/coursewagon.svg',
      category: 'fullstack',
      technologies: ['Angular', 'Flask', 'Gemini API', 'Docker', 'GCP'],
      liveUrl: 'https://www.coursewagon.live/',
      githubUrl: null,
      featured: true,
      period:''
    },
    {
      id: 2,
      title: 'BAFCC - Football Coaching Camp Management System',
      description: 'Web app for football camp management using React (TypeScript) + FastAPI. Designed modular financial dashboard handling 100+ records with real-time management and RBAC.',
      image: '/course.svg',
      category: 'fullstack',
      technologies: ['React', 'TypeScript', 'FastAPI', 'RBAC'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/bafcc',
      featured: true,
      period:''
    },
    {
      id: 3,
      title: 'Winners Education – Coaching Institute Management System',
      description: 'Developed with Angular + Spring Boot + MySQL. Enabled seamless course & exam tracking for 100+ students with secure admin/student modules. Built scoreboard management system with PDF export for question papers, automating offline exam results.',
      image: '/course.svg',
      category: 'fullstack',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'PDF Export'],
      liveUrl: 'https://winnerseducation.org/',
      githubUrl: null,
      featured: true,
      period:''
    },
    {
      id: 4,
      title: 'QuestCart - AI-Powered Question Paper Generator',
      description: 'An AI-powered application that generates custom question papers using the Gemini API. This application allows you to create exams with multiple sections and automatically generates questions for each section based on the requirements.',
      image: '/shortly.svg',
      category: 'fullstack',
      technologies: ['React', 'FastAPI', 'TypeScript', 'Tailwind CSS'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/questcart',
      featured: true,
      period:''
    },
    {
      id: 5,
      title: 'ICRoGen - Central Routine Generator',
      description: 'A Go-based backend for the ICRoGen (Central Routine Generator) system. This system automates the creation of conflict-free academic schedules.',
      image: '/shortly.svg',
      category: 'fullstack',
      technologies: ['React', 'Go', 'TypeScript', 'Material UI'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/icrogen',
      featured: true,
      period:''
    },
    {
      id: 6,
      title: 'Project Aegis: A Framework for a Secure Financial Environment',
      description: 'The Aegis Security API provides comprehensive device security and fraud detection services for mobile applications. It includes device registration, cryptographic signature validation, organization management, and advanced fraud detection capabilities.',
      image: '/shortly.svg',
      category: 'fullstack',
      technologies: ['Java', 'Kotlin', 'Spring Boot', 'React', 'TypeScript', 'Material UI'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/aegis',
      featured: true,
      period:''
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'datascience', label: 'Data Science' }
  ];

  const filteredProjects = projects
    .filter(project => 
      (filter === 'all' || project.category === filter) &&
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.technologies.some(tech => 
         tech.toLowerCase().includes(searchTerm.toLowerCase())
       ))
    );

  return (
    <section id="projects" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
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
          <h2 className="section-title dark:text-dark-text">Featured <span className="themed-text">Projects</span></h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of my recent work and personal projects
          </p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 animate-slide-up">
          <div className="flex items-center space-x-2">
            <FilterIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${filter === category.id
                      ? 'themed-bg text-white'
                      : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus-themed bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-600 dark:text-gray-400">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const isLiveLinkAvailable = project.liveUrl !== null && project.liveUrl !== undefined;
  const isGithubLinkAvailable = project.githubUrl !== null && project.githubUrl !== undefined;

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:themed-border themed-glow-hover group">
      <div className="relative h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 themed-bg text-white px-3 py-1 rounded-full text-sm">
            Featured
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2 transition-colors duration-300 group-hover:themed-text">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">
          {project.period}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow transition-colors duration-300">
          {project.description}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="themed-badge"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(isGithubLinkAvailable || isLiveLinkAvailable) && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-dark-border mt-auto">
            {isGithubLinkAvailable && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-400 hover-themed-text transition-colors duration-300"
              >
                <Github className="w-5 h-5 mr-2" />
                Code
              </a>
            )}
            {isLiveLinkAvailable && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-400 hover-themed-text transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    liveUrl: PropTypes.string,
    githubUrl: PropTypes.string,
    featured: PropTypes.bool,
    period: PropTypes.string.isRequired,
  }).isRequired,
};

export default Projects;