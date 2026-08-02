import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Clock, Calendar, Tag, AlertCircle } from 'lucide-react';
import Fuse from 'fuse.js';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { fetchPosts } from '../../services/blogService';
import { useTheme } from '../../context/ThemeContext';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (activeTag) {
      result = result.filter(p => p.tags.includes(activeTag));
    }

    if (searchTerm) {
      const fuse = new Fuse(result, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3
      });
      result = fuse.search(searchTerm).map(r => r.item);
    }

    return result;
  }, [posts, activeCategory, activeTag, searchTerm]);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Header */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: theme === 'light' 
                ? 'radial-gradient(circle at 25px 25px, black 1px, transparent 0)'
                : 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Technical <span className="themed-text">Blog</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Deep dives into Linux, Containers, DevOps, and Systems
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls: Search and Filters */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => { setActiveCategory(category); setActiveTag(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeCategory === category && !activeTag
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
              {activeTag && (
                <div className="flex items-center gap-1 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                  <Tag className="w-4 h-4" />
                  {activeTag}
                  <button onClick={() => setActiveTag(null)} className="ml-2 hover:text-gray-300 dark:hover:text-gray-600">&times;</button>
                </div>
              )}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 text-gray-900 dark:text-gray-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Main Content Area */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center py-20 text-red-500">
              <AlertCircle className="w-10 h-10 mb-4" />
              <p className="text-lg font-medium">{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No posts found matching your criteria.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass-card rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:themed-border themed-glow-hover group cursor-pointer"
                    onClick={() => navigate(`/blogs/${post.slug}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 themed-bg text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3 transition-colors duration-300 group-hover:themed-text line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3 text-sm">
                        {post.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <button
                            key={tag}
                            onClick={(e) => { e.stopPropagation(); setActiveTag(tag); }}
                            className="themed-badge z-10"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {post.readingTime} min read
                        </span>
                      </div>
                      <div className="mt-4 pt-2">
                         <Link to={`/blogs/${post.slug}`} className="text-sm font-medium themed-text hover:underline" onClick={(e) => e.stopPropagation()}>
                           Read More &rarr;
                         </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
