import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import Projects from '../components/home/Projects';
import Writing from '../components/home/Writing';
import Education from '../components/home/Education';
import Contact from '../components/home/Contact';
import Achievements from '../components/home/Achievements';
import Blog from '../components/home/Blog';
import FloatingControls from '../components/FloatingControls';
import { ArrowUp } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: "Brain Dead Hackathon, IIEST Shibpur",
    subtitle: "Secured 2nd position among 123 teams",
    description: "Inter-University Data Science & Machine Learning Hackathon.",
    date: "Mar 2025 | Howrah, India",
    url: null,
  },
  {
    id: 2,
    title: "Mi India Scholarship 2021",
    subtitle: "Awarded by Xiaomi India & Buddy4Study",
    description: "For academic excellence in Class 12.",
    date: "2021",
    url: null,
  },
];

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Set default identity for the challenge
    if (!localStorage.getItem('identity_token')) {
      localStorage.setItem('identity_token', 'guest');
    }

    // Hint for CTF players
    console.log("%cSystem Status: Operational", "color: green; font-weight: bold;");
    console.log("Admin Portal: Moved to /rootaccess [Restricted]");

    const checkScrollTop = () => {
      if (!showScrollTop && window.scrollY > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.scrollY <= 400) {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        {/* Apply the no-pattern class to completely disable any background patterns */}
        <div className="no-pattern">
          <About />
        </div>
        <Education />
        <Experience />
        <Projects />
        <Writing />
        <Blog />
        <Achievements achievements={achievements} />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating right-edge controls */}
      <FloatingControls />

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-30 p-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Home;
