import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FontProvider } from './context/FontContext';
import Home from './components/Home';
import RootAccess from './components/RootAccess';

function App() {
  return (
    <ThemeProvider>
      <FontProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rootaccess" element={<RootAccess />} />
          </Routes>
        </Router>
      </FontProvider>
    </ThemeProvider>
  );
}

export default App;
