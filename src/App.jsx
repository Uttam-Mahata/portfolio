import { ThemeProvider } from './context/ThemeContext';
import { FontProvider } from './context/FontContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Experience from './components/home/Experience';
import Projects from './components/home/Projects';
import Education from './components/home/Education';
import Contact from './components/home/Contact';
import Achievements from './components/home/Achievements';
import Blog from './components/home/Blog';
import ThemeColorPicker from './components/ThemeColorPicker';
import FontPicker from './components/FontPicker';

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
  {
    id: 3,
    title: "IIEST-UCO Bank Hackathon",
    subtitle: "Finalist in UCO Bank–sponsored Hackathon at IIEST Shibpur",
    description: "Designed and developed a prototype focused on building a secure financial environment through innovative technology solutions.",
    date: "Jul 2025 – Aug 2025",
    url: null,
  }
];

function App() {
  return (
    <ThemeProvider>
      <FontProvider>
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
            <Blog />
            <Achievements achievements={achievements} />
            <Contact />
          </main>
          <Footer />
          
          {/* Fixed Position Controls for Mobile - Now with isMobile prop */}
          <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-4">
            <ThemeColorPicker 
              className="bg-white dark:bg-dark-card rounded-full shadow-xl p-2" 
              isMobile={true}
            />
            <FontPicker 
              className="bg-white dark:bg-dark-card rounded-full shadow-xl p-2" 
              isMobile={true}
            />
          </div>
        </div>
      </FontProvider>
    </ThemeProvider>
  );
}

export default App;