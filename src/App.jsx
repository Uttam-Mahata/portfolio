import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FontProvider } from './context/FontContext';
import Home from './components/Home';
import RootAccess from './components/RootAccess';

function RedirectToMkDocs() {
  useEffect(() => {
    window.location.replace('/blogs/');
  }, []);
  return null;
}

function RedirectToMkDocsSlug() {
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      window.location.replace(`/blogs/posts/${slug}/`);
    } else {
      window.location.replace('/blogs/');
    }
  }, [slug]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <FontProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rootaccess" element={<RootAccess />} />
            <Route path="/blogs" element={<RedirectToMkDocs />} />
            <Route path="/blogs/:slug" element={<RedirectToMkDocsSlug />} />
          </Routes>
        </Router>
      </FontProvider>
    </ThemeProvider>
  );
}

export default App;
