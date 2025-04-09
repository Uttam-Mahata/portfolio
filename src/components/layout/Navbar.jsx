import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ThemeColorPicker from '../ThemeColorPicker';
import FontPicker from '../FontPicker';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#blog', label: 'Blog' }, // Add this new navigation link
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://github.com/Uttam-Mahata', icon: <Github size={18} />, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/uttam-mahata-4b0364259/', icon: <Linkedin size={18} />, label: 'LinkedIn' },
    { href: 'mailto:uttam-mahata-cs@outlook.com', icon: <Mail size={18} />, label: 'Email' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-dark-card/80 shadow-lg backdrop-blur-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a 
            href="#" 
            className="group flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-dark-text"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300 themed-bg">
              UM
            </div>
            <span className="hidden sm:block group-hover:glow-text">Uttam Mahata</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <a 
                key={href} 
                href={href} 
                className={`relative py-2 text-sm font-medium transition-colors duration-300
                  ${activeSection === href.slice(1)
                    ? 'themed-text'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 themed-bg ${
                  activeSection === href.slice(1) ? 'scale-x-100 animate-glow-pulse' : 'scale-x-0'
                }`} />
              </a>
            ))}

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:themed-text transition-colors duration-300"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
            
            {/* Theme and Font Controls */}
            <div className="flex items-center space-x-2">
              {/* Font Family Picker */}
              {/* <FontPicker /> */}
              
              {/* Color Theme Picker */}
              {/* <ThemeColorPicker /> */}
              
              {/* Light/Dark Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:animate-glow-pulse"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeColorPicker />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="px-4 py-2 bg-white dark:bg-dark-card shadow-lg divide-y divide-gray-200 dark:divide-dark-border">
          <div className="py-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-300 ${
                  activeSection === href.slice(1)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 glow-border-hover'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          
          {/* Mobile Social Links */}
          <div className="py-3">
            <div className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400">Connect</div>
            <div className="mt-2 flex items-center space-x-4 px-3">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 hover:animate-glow-pulse"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;