import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Code, 
  Layout, 
  Database,
  Search,
  FilterIcon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with cart, payments, and admin dashboard.',
      image: '/images/projects/ecommerce.jpg',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://project.com',
      githubUrl: 'https://github.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time task management application with team collaboration features.',
      image: '/images/projects/taskapp.jpg',
      category: 'frontend',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      liveUrl: 'https://project.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 3,
      title: 'API Gateway Service',
      description: 'Microservices API gateway with authentication and rate limiting.',
      image: '/images/projects/api.jpg',
      category: 'backend',
      technologies: ['Node.js', 'Express', 'Redis', 'JWT'],
      liveUrl: 'https://project.com',
      githubUrl: 'https://github.com'
    },
    // Add more projects as needed
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' }
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
          <h2 className="section-title dark:text-dark-text">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of my recent work and personal projects
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 animate-slide-up">
          {/* Category Filters */}
          <div className="flex items-center space-x-2">
            <FilterIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5
                    ${filter === category.id
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className={`animate-slide-up`} style={{ animationDelay: `${index * 100}ms` }}>
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
  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:shadow-dark-border group">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 bg-primary-600 dark:bg-primary-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2 transition-colors duration-300">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">{project.description}</p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-dark-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
          >
            <Github className="w-5 h-5 mr-2" />
            Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;