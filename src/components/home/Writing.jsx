import { useTheme } from '../../context/ThemeContext';
import { BookOpen, Download, ExternalLink } from 'lucide-react';
import PropTypes from 'prop-types';

const Writing = () => {
  const { theme } = useTheme();

  const writings = [
    {
      id: 1,
      title: 'State of Emotions',
      subtitle: 'A personal, intellectual exercise in understanding the chaos of human emotions through the lens of computation.',
      description: 'This book explores how our feelings shape our reality and provides insights into understanding and managing them using formalisms of Automata Theory as metaphors with mathematical discipline. It is not a psychology textbook nor a treatise on automata theory, but a bridge between the two—a tool for thought.',
      image: '/stateofemotions.png', // Using a placeholder for now, ideally this would be the book cover
      link: '/State_of_Emotions.pdf',
      tags: ['Automata Theory', 'Philosophy', 'Human Behavior'],
      date: '2025'
    }
  ];

  return (
    <section id="writing" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
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
          <h2 className="section-title dark:text-dark-text">My Writings</span></h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Books, articles, and thoughts on technology and life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {writings.map((item) => (
            <WritingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WritingCard = ({ item }) => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:themed-border themed-glow-hover flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/3 h-64 md:h-auto relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
        {/* Placeholder for Book Cover - centered and contained */}
        <BookOpen className="w-24 h-24 text-gray-400 dark:text-gray-500 opacity-50 absolute" />
        <img 
            src={item.image} 
            alt={item.title} 
            className="relative z-10 w-full h-full object-contain shadow-lg rounded-md transform transition-transform duration-500 hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }} // Hide if fails, revealing icon
        />
      </div>

      <div className="w-full md:w-2/3 p-8 flex flex-col">
        <div className="mb-4">
            <span className="text-sm font-medium themed-text">{item.date}</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1 mb-2 group-hover:themed-text transition-colors">
            {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">
            {item.subtitle}
            </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
          <a 
            href={item.link}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg themed-bg text-white font-medium transition-all hover:opacity-90 hover:shadow-md"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

WritingCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
};

export default Writing;
