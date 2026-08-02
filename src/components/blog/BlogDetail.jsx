import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar, AlertCircle, Loader2, User } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import MarkdownRenderer from './MarkdownRenderer';
import TableOfContents from './TableOfContents';
import { fetchPostBySlug, fetchPosts } from '../../services/blogService';
import { useTheme } from '../../context/ThemeContext';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        
        const fetchedPost = await fetchPostBySlug(slug);
        setPost(fetchedPost);
        document.title = fetchedPost.metadata.title;

        // Fetch all posts for prev/next links
        const allPosts = await fetchPosts();
        const currentIndex = allPosts.findIndex(p => p.slug === slug);
        
        if (currentIndex > 0) {
          setNextPost(allPosts[currentIndex - 1]);
        } else {
          setNextPost(null);
        }
        
        if (currentIndex < allPosts.length - 1) {
          setPrevPost(allPosts[currentIndex + 1]);
        } else {
          setPrevPost(null);
        }

      } catch (err) {
        setError(err.message || 'Post not found');
        document.title = 'Post Not Found';
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="w-12 h-12 animate-spin text-gray-400" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col justify-center items-center px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link to="/blogs" className="btn-primary themed-gradient-primary text-white px-6 py-2 rounded-full font-medium transition-transform hover:scale-105">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { metadata, content } = post;

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link to="/blogs" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>

          {/* Hero Section */}
          <header className="mb-12">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img 
                src={metadata.cover} 
                alt={metadata.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 themed-bg text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                {metadata.category}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {metadata.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 border-l-4 border-gray-200 dark:border-gray-800 pl-4">
              {metadata.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium text-gray-900 dark:text-gray-200">Uttam Mahata</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(metadata.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {metadata.readingTime} min read
              </div>
              <div className="flex flex-wrap gap-2 ml-auto">
                {metadata.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <MarkdownRenderer content={content} />
            </div>
            
            {/* Sidebar / ToC */}
            <aside className="lg:w-1/4">
              <TableOfContents content={content} />
            </aside>
          </div>
          
          {/* Previous / Next Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevPost ? (
                <Link to={`/blogs/${prevPost.slug}`} className="flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2 flex items-center">
                    <ArrowLeft className="w-3 h-3 mr-1 transition-transform group-hover:-translate-x-1" /> Previous
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:themed-text transition-colors">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div></div>}
              
              {nextPost && (
                <Link to={`/blogs/${nextPost.slug}`} className="flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group text-right items-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2 flex items-center">
                    Next <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:themed-text transition-colors">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
