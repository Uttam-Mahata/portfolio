import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Search,
  Filter
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
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
      image: '/coursewagon.png',
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
      image: '/bafcc-logo.png',
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
      image: '/logo_wnrs.png',
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
      image: '/questcart.png',
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
      image: '/icrogen.png',
      category: 'backend',
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
      image: '/aegis.png',
      category: 'fullstack',
      technologies: ['Java', 'Kotlin', 'Spring Boot', 'React', 'TypeScript', 'Material UI'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/aegis',
      featured: true,
      period:''
    },
    {
      id: 7,
      title: 'RootAccess - CTF Platform',
      description: 'A high-performance, full-stack Capture The Flag (CTF) platform built with Go (Gin) for the backend and Angular (v21) for the frontend. Designed for scalability with Redis caching and Turso DB (LibSQL) for high-performance data storage.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      category: 'fullstack',
      technologies: ['Go', 'Gin', 'Angular', 'Redis', 'Turso DB'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/RootAccess',
      featured: true,
      period:''
    },
    {
      id: 8,
      title: 'BloomGate',
      description: 'A Smart Exam Paper Generator powered by BloomJoin. This full-stack application streamlines the process of creating, managing, and generating exam papers, utilizing advanced filtering and management techniques.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      category: 'fullstack',
      technologies: ['React', 'Database Management', 'BloomJoin'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/bloomgate',
      featured: true,
      period:''
    },
    {
      id: 9,
      title: 'Urbis',
      description: 'A high-performance C library for spatial indexing of city-scale geographic data. It uses KD-trees for block partitioning and quadtrees for adjacent page lookups, designed to minimize disk seeks when working with massive datasets.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      category: 'systems',
      technologies: ['C', 'KD-trees', 'Quadtrees', 'Spatial Indexing'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/urbis',
      featured: true,
      period:''
    },
    {
      id: 10,
      title: 'ভাষা (Bhasa) - A Bengali Programming Language',
      description: 'A compiled programming language that uses Bengali keywords, built with Go as a hobby and for fun.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
      category: 'systems',
      technologies: ['Go', 'Compiler Design', 'Interpreters'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/bhasa',
      featured: true,
      period:''
    },
    {
      id: 11,
      title: 'MIRA — Microservice Incident Response Agent',
      description: 'An AI-powered incident response system built with Java 25 + Spring Boot 3.4 and Google ADK. Connects via Model Context Protocol (MCP) to observability platforms, investigates using Gemini 2.0 Flash, and dispatches findings to Slack/Jira.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
      category: 'backend',
      technologies: ['Java 25', 'Spring Boot 3.4', 'Google ADK', 'MCP', 'Gemini 2.0 Flash'],
      liveUrl: null,
      githubUrl: 'https://github.com/Uttam-Mahata/MIRA',
      featured: true,
      period:''
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'backend', label: 'Backend' },
    { id: 'systems', label: 'Systems & Core' }
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title dark:text-dark-text">Featured <span className="themed-text">Projects</span></h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of my recent work and personal projects
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${filter === category.id
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md'
                      : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
            />
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">No projects found matching your criteria.</p>
          </motion.div>
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
                <FaGithub className="w-5 h-5 mr-2" />
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