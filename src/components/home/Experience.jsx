import { Briefcase, ExternalLink, Calendar, MapPin } from 'lucide-react';
import PropTypes from 'prop-types';

const experiences = [
  {
    id: 2,
    role: 'Engineer Trainee',
    company: 'OpenLM',
    url: 'https://www.openlm.com',
    location: 'Kolkata, India',
    period: 'Jan 2026 – Present',
    current: true,
    description: 'Joined the DevOps team as an Engineer Trainee, contributing to infrastructure automation and observability.',
    achievements: [
      'Working on the implementation of CI/CD pipelines and Observability.',
      'Optimizing Docker images using multistage builds, reducing image size by ~61%.',
      'Performing RCA across multiple microservices, analysing CPU and memory health metrics to identify and resolve bottlenecks.',
    ],
    technologies: ['CI/CD', 'Observability', 'DevOps', 'DevSecOps', 'Docker', 'Kubernetes', 'Datadog'],
  },
  {
    id: 1,
    role: 'Software Development Intern',
    company: 'Alpha AI Service Pvt Ltd',
    url: null,
    location: 'Remote · New Delhi, India',
    period: 'June 2025 – Aug 2025',
    current: false,
    description: 'Integrated advanced content generation features using Gemini and Langchain, supporting 10+ content types.',
    achievements: [
      'Built and optimized 15+ scalable, stateless AI service endpoints using Python (FastAPI, Flask), reducing latency by 16%.',
      'Developed a FastAPI backend for a travel assistant mobile app with 6+ AI-powered services using MongoDB + JWT auth.',
      'Created a Generative AI voice generation platform (~90% speech synthesis accuracy) with a React real-time interface.',
    ],
    technologies: ['Python', 'FastAPI', 'Flask', 'Gemini', 'Langchain', 'MongoDB', 'JWT', 'React'],
  },
];

const ExperienceCard = ({ experience, isLast }) => (
  <div className="relative pl-12 sm:pl-14 group/entry animate-slide-up">
    {/* Timeline dot */}
    <div
      className={`absolute left-0 top-6 flex items-center justify-center w-9 h-9 rounded-full border-2 shadow-sm z-10 transition-all duration-300 group-hover/entry:scale-110 ${
        experience.current
          ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] shadow-[0_0_12px_var(--theme-primary)] opacity-90'
          : 'bg-white dark:bg-dark-bg border-gray-300 dark:border-gray-600'
      }`}
    >
      <Briefcase
        className={`w-4 h-4 ${experience.current ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}
        strokeWidth={1.8}
      />
    </div>

    {/* Connector line to next card */}
    {!isLast && (
      <div className="absolute left-[17px] top-[52px] bottom-[-40px] w-px bg-gradient-to-b from-gray-200 dark:from-gray-700 to-transparent" />
    )}

    {/* Card */}
    <div className="relative bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Colored left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-opacity duration-300 opacity-50 group-hover/entry:opacity-100"
        style={{ background: 'var(--theme-primary)' }}
      />

      <div className="px-5 py-5 sm:px-6 sm:py-6 pl-6 sm:pl-7">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text leading-tight">
              {experience.role}
            </h3>
            {experience.current && (
              <span
                className="px-2 py-0.5 text-[11px] font-semibold rounded-full border"
                style={{
                  color: 'var(--theme-primary)',
                  borderColor: 'var(--theme-primary)',
                  background: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                }}
              >
                Current
              </span>
            )}
          </div>

          {/* Period pill */}
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700 shrink-0">
            <Calendar className="w-3 h-3" strokeWidth={1.8} />
            {experience.period}
          </span>
        </div>

        {/* Company */}
        <a
          href={experience.url ?? undefined}
          target={experience.url ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-sm font-medium mb-3 transition-opacity duration-200 ${
            experience.url
              ? 'themed-text hover:opacity-80'
              : 'text-gray-500 dark:text-gray-400 pointer-events-none'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" strokeWidth={1.8} />
          {experience.company}
          {experience.url && <ExternalLink className="w-3 h-3 opacity-70" />}
        </a>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
          {experience.location}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Achievements */}
        {experience.achievements.length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5">
              Key Achievements
            </p>
            <ul className="space-y-2">
              {experience.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'var(--theme-primary)' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {experience.technologies.length > 0 && (
          <div className="pt-4 border-t border-gray-50 dark:border-gray-800">
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 transition-colors duration-200 hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    url: PropTypes.string,
    location: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    current: PropTypes.bool,
    description: PropTypes.string.isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isLast: PropTypes.bool,
};

const Experience = () => (
  <section id="experience" className="relative py-20 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
    <div className="relative z-10 max-w-3xl mx-auto pl-4 pr-14 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-14 animate-fade-in">
        <h2 className="section-title dark:text-dark-text">
          Professional <span className="themed-text">Experience</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          My professional journey and key achievements throughout my career
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-10">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            isLast={i === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
