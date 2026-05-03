import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 150;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#blog', label: 'Blog' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://github.com/Uttam-Mahata', icon: <FaGithub size={18} />, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/uttam-mahata-4b0364259/', icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
    { href: 'mailto:uttam-mahata-cs@outlook.com', icon: <Mail size={18} strokeWidth={1.5} />, label: 'Email' },
    { href: 'https://x.com/daemonized_u', icon: <FaXTwitter size={18} />, label: 'X (Twitter)' },
    { href: 'https://www.instagram.com/daemonized_u/', icon: <FaInstagram size={18} />, label: 'Instagram' },
    { href: 'https://www.facebook.com/daemonized.u', icon: <FaFacebook size={18} />, label: 'Facebook' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center w-full px-4 pt-4 sm:pt-6 pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl mx-auto rounded-2xl md:rounded-full transition-all duration-500 ease-in-out border ${
          isScrolled 
            ? 'bg-white/70 dark:bg-[#0a0a0a]/70 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 py-2.5 px-4 md:px-6' 
            : 'bg-transparent shadow-none border-transparent py-4 px-2 md:px-4'
        }`}
      >
        {/* Logo Section */}
        <a 
          href="#" 
          className="group flex items-center gap-3 shrink-0 focus:outline-none"
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-white dark:text-gray-900 shadow-md transform group-hover:scale-105 transition-all duration-300 ease-out">
            <span className="text-sm font-bold tracking-wider">UM</span>
          </div>
          <span className={`hidden sm:block font-semibold tracking-tight transition-all duration-300 ${
            isScrolled 
              ? 'text-gray-800 dark:text-gray-100 text-base' 
              : 'text-gray-900 dark:text-white text-lg'
          }`}>
            Uttam Mahata
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 mx-4">
          {navLinks.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a 
                key={href} 
                href={href} 
                className={`group relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                  ${isActive 
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                {label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-[2px] w-4 mx-auto bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ease-out" />
                )}
              </a>
            );
          })}
        </div>
        
        {/* Controls Section (Social + Theme + Mobile Menu) */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Social Links (Hidden on small screens) */}
          <div className="hidden sm:flex items-center gap-1 border-r border-gray-200 dark:border-gray-800 pr-3 mr-1">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
          
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Sun className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`lg:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 max-w-6xl mx-auto rounded-2xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 p-4 flex flex-col gap-2">
          {navLinks.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
              </a>
            );
          })}
          
          <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
          
          {/* Mobile Social Links */}
          <div className="flex items-center justify-center gap-4 py-2">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
