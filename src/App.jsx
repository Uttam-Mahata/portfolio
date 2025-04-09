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
import Certifications from './components/home/Certifications';
import Blog from './components/home/Blog';
import ThemeColorPicker from './components/ThemeColorPicker';
import FontPicker from './components/FontPicker';

const certifications = [

  {
    id: 1,
    name: "HTML Essential Training",
    issuer: "LinkedIn Learning",
    date: "July 2023",
    credentialUrl: "https://www.linkedin.com/learning/certificates/95099347c0c3f6ac10b6adffe58b8f492ceea8935b3abbd23d18b00c5290f661"
  },
  {
    id: 2,
    name: "Introducing Generative AI with AWS",
    issuer: "Udacity",
    date: "Nov 2023",
    credentialUrl: "https://www.udacity.com/certificate/e/9d122b9c-726b-11ef-ac1d-8387fb3368ea"
  },
  {
    id: 3,
    name: "Foundation of Generative AI",
    issuer: "Udacity",
    date: "Feb 2024",
    credentialUrl: "https://www.udacity.com/certificate/e/90f366be-b7bc-11ef-86e4-ab5a9d7d071c"
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
            <Certifications certifications={certifications} />
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