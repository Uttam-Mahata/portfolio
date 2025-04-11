import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  // Your Hashnode username
  const HASHNODE_USERNAME = 'uttammahata'; 

  // Corrected GraphQL query for Hashnode API
  const GET_USER_ARTICLES = `
    query GetUserArticles($username: String!) {
      user(username: $username) {
        publications(first: 1) {
          edges {
            node {
              title
              posts(first: 6) {
                totalDocuments
                edges {
                  node {
                    title
                    brief
                    slug
                    url
                    coverImage {
                      url
                    }
                    publishedAt
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // Function to fetch posts from Hashnode API
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log(`Fetching posts for ${HASHNODE_USERNAME}...`);

    try {
      const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_USER_ARTICLES,
          variables: { username: HASHNODE_USERNAME },
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Hashnode API Response:', result); // For debugging

      if (result.errors) {
        throw new Error(`GraphQL Error: ${result.errors[0].message}`);
      } 
      
      if (!result.data?.user) {
        throw new Error(`User "${HASHNODE_USERNAME}" not found on Hashnode.`);
      } 
      
      if (!result.data.user.publications?.edges || result.data.user.publications.edges.length === 0) {
        throw new Error(`User "${HASHNODE_USERNAME}" does not have any Hashnode publications.`);
      }

      // Access the first publication's node
      const publicationNode = result.data.user.publications.edges[0]?.node;
      
      if (!publicationNode) {
        throw new Error(`Could not retrieve publication data for user "${HASHNODE_USERNAME}".`);
      }
      
      if (publicationNode.posts.totalDocuments === 0) {
        setPosts([]);
        throw new Error(`You have a publication ("${publicationNode.title}"), but no posts have been published yet.`);
      }

      if (publicationNode.posts.edges) {
        // Format posts for our component
        const fetchedPosts = publicationNode.posts.edges.map(edge => ({
          title: edge.node.title,
          brief: edge.node.brief,
          slug: edge.node.slug,
          coverImage: edge.node.coverImage?.url,
          dateAdded: edge.node.publishedAt,
          url: edge.node.url
        }));

        console.log('Formatted Posts:', fetchedPosts);
        setPosts(fetchedPosts);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [GET_USER_ARTICLES, HASHNODE_USERNAME]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Default placeholder image
  const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/eee/ccc?text=No+Image';

  return (
    <section id="blog" className="relative py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'light' 
            ? 'radial-gradient(circle at 25px 25px, black 1px, transparent 0)'
            : 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title dark:text-dark-text">Latest <span className="themed-text">Blog Posts</span></h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights from my technical journey
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 themed-text animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading blog posts...</span>
          </div>
        ) : error ? (
          <div className="text-center py-10 animate-fade-in max-w-3xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Blog Connection Error</h3>
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <div className="mt-4 p-4 bg-white dark:bg-dark-card rounded-lg text-left">
                <p className="font-medium text-gray-900 dark:text-gray-200 mb-2">Troubleshooting Steps:</p>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Verify your Hashnode username is <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{HASHNODE_USERNAME}</span></li>
                  <li>Check if you have published any articles on your Hashnode blog</li>
                  <li>Visit <a href={`https://hashnode.com/@${HASHNODE_USERNAME}`} className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">your Hashnode profile</a> to confirm</li>
                  <li>Try creating a new blog post on Hashnode and publishing it</li>
                </ol>
              </div>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No blog posts found on your Hashnode account.</p>
            <a 
              href="https://hashnode.com/create-blog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 themed-bg hover:bg-opacity-90 text-white rounded-md"
            >
              Create Your First Blog Post
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={post.slug || index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <BlogPostCard post={post} username={HASHNODE_USERNAME} placeholderImage={PLACEHOLDER_IMAGE} />
              </div>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <a
              href={`https://hashnode.com/@${HASHNODE_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white themed-gradient-primary hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus-themed"
            >
              View All Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

const BlogPostCard = ({ post, username, placeholderImage }) => {
  const { title, brief, slug, coverImage, dateAdded, url } = post;

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:themed-border themed-glow-hover group">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={coverImage || placeholderImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
        {/* Add a glowing overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(dateAdded)}</span>
          <span className="mx-2">•</span>
          <User className="w-4 h-4 mr-1" />
          <span>Uttam Mahata</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3 transition-colors duration-300 group-hover:themed-text">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow transition-colors duration-300">
          {brief && brief.length > 150 ? brief.substring(0, 150) + '...' : brief}
        </p>

        <a
          href={url || `https://${username}.hashnode.dev/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center themed-text font-medium"
        >
          Read More
          <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    brief: PropTypes.string,
    slug: PropTypes.string.isRequired,
    coverImage: PropTypes.string,
    dateAdded: PropTypes.string.isRequired,
    url: PropTypes.string
  }).isRequired,
  username: PropTypes.string.isRequired,
  placeholderImage: PropTypes.string.isRequired
};

const formatDate = (dateString) => {
  if (!dateString) return 'Date not available';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return 'Invalid Date';
  }
};

export default Blog;
