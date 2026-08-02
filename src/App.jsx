import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FontProvider } from './context/FontContext';
import Home from './components/Home';
import RootAccess from './components/RootAccess';
import BlogList from './components/blog/BlogList';
import BlogDetail from './components/blog/BlogDetail';

function App() {
  return (
    <ThemeProvider>
      <FontProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rootaccess" element={<RootAccess />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
          </Routes>
        </Router>
      </FontProvider>
    </ThemeProvider>
  );
}

export default App;
