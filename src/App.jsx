import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Experience from './components/home/Experience';
import Projects from './components/home/Projects';
import Education from './components/home/Education';
import Contact from './components/home/Contact';
import Certifications from './components/home/Certifications';
import Blog from './components/home/Blog'; // Add this import

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
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Blog /> {/* Add the Blog component here */}
          <Certifications certifications={certifications} />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;