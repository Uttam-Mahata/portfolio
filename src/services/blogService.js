/**
 * Blog Service - Data fetching layer for GitHub CDN & Local Fallback Blog Pipeline
 */

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/Uttam-Mahata/blog-content@main';
const LOCAL_BASE_URL = '/blog-posts';
const FETCH_TIMEOUT_MS = 3500;

// In-memory cache & state
let postsCache = null;
let activeSource = null; // 'cdn' | 'local' | null

/**
 * Helper to fetch with timeout via AbortController
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Resolves cover image URLs depending on whether CDN or local fallback is active.
 */
function resolveCoverUrl(coverPath, source) {
  if (!coverPath) return '/blog-posts/images/default-cover.png';
  if (coverPath.startsWith('http://') || coverPath.startsWith('https://')) {
    return coverPath;
  }

  if (source === 'cdn') {
    const cleanPath = coverPath.replace(/^\/?(blog-posts\/)?/, '');
    return `${CDN_BASE_URL}/${cleanPath}`;
  } else {
    if (coverPath.startsWith('/blog-posts/')) return coverPath;
    const cleanPath = coverPath.replace(/^\//, '');
    return `${LOCAL_BASE_URL}/${cleanPath}`;
  }
}

/**
 * Normalizes metadata objects and sorts them by date descending (newest first).
 */
function normalizeAndSortPosts(rawPosts, source) {
  if (!Array.isArray(rawPosts)) return [];

  const normalized = rawPosts.map((post) => ({
    slug: post.slug || '',
    title: post.title || 'Untitled Post',
    description: post.description || '',
    date: post.date || new Date().toISOString().split('T')[0],
    readingTime: Number(post.readingTime) || 5,
    category: post.category || 'General',
    tags: Array.isArray(post.tags) ? post.tags : [],
    cover: resolveCoverUrl(post.cover, source)
  }));

  // Sort descending by publish date
  return normalized.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Helper to strip YAML frontmatter (if present) from raw Markdown text.
 */
function stripFrontmatter(text) {
  if (typeof text !== 'string') return '';
  if (text.startsWith('---')) {
    const endHeaderIndex = text.indexOf('---', 3);
    if (endHeaderIndex !== -1) {
      return text.substring(endHeaderIndex + 3).trim();
    }
  }
  return text;
}

/**
 * Fetches all blog posts metadata.
 * Prioritizes jsDelivr CDN, falls back to local public folder on failure.
 *
 * @returns {Promise<Array<Object>>} List of sorted blog post metadata
 */
export async function fetchPosts() {
  if (postsCache) {
    return postsCache;
  }

  // 1. Try CDN
  try {
    const cdnRes = await fetchWithTimeout(`${CDN_BASE_URL}/metadata.json`);
    if (cdnRes.ok) {
      const data = await cdnRes.json();
      activeSource = 'cdn';
      postsCache = normalizeAndSortPosts(data, 'cdn');
      return postsCache;
    }
    console.warn(`[blogService] CDN metadata fetch returned status ${cdnRes.status}. Falling back to local.`);
  } catch (err) {
    console.warn(`[blogService] CDN metadata fetch failed (${err.message}). Falling back to local.`);
  }

  // 2. Fallback to Local
  try {
    const localRes = await fetchWithTimeout(`${LOCAL_BASE_URL}/metadata.json`);
    if (localRes.ok) {
      const data = await localRes.json();
      activeSource = 'local';
      postsCache = normalizeAndSortPosts(data, 'local');
      return postsCache;
    }
    console.error(`[blogService] Local metadata fetch failed with status ${localRes.status}.`);
  } catch (err) {
    console.error(`[blogService] Local metadata fetch error:`, err);
  }

  // If both fail, return empty list
  postsCache = [];
  return [];
}

/**
 * Fetches a single post by slug (metadata + raw markdown content).
 *
 * @param {string} slug - The slug identifier of the blog post
 * @returns {Promise<{ metadata: Object, content: string } | null>} Post object or null if not found
 */
export async function fetchPostBySlug(slug) {
  if (!slug) return null;

  const posts = await fetchPosts();
  const metadata = posts.find((p) => p.slug === slug);
  if (!metadata) {
    console.warn(`[blogService] Post metadata not found for slug "${slug}".`);
    return null;
  }

  const primaryBase = activeSource === 'cdn' ? CDN_BASE_URL : LOCAL_BASE_URL;
  const secondaryBase = activeSource === 'cdn' ? LOCAL_BASE_URL : CDN_BASE_URL;

  // Try active source first
  try {
    const res = await fetchWithTimeout(`${primaryBase}/posts/${slug}.md`);
    if (res.ok) {
      const rawText = await res.text();
      return { metadata, content: stripFrontmatter(rawText) };
    }
  } catch (err) {
    console.warn(`[blogService] Failed to fetch post content from primary source (${primaryBase}):`, err.message);
  }

  // Try alternate source if primary failed
  try {
    const res = await fetchWithTimeout(`${secondaryBase}/posts/${slug}.md`);
    if (res.ok) {
      const rawText = await res.text();
      return { metadata, content: stripFrontmatter(rawText) };
    }
  } catch (err) {
    console.error(`[blogService] Failed to fetch post content from secondary source (${secondaryBase}):`, err.message);
  }

  return null;
}

/**
 * Returns top N recent posts sorted by date descending.
 *
 * @param {number} count - Number of posts to return (default: 3)
 * @returns {Promise<Array<Object>>} Array of recent post metadata
 */
export async function getRecentPosts(count = 3) {
  const posts = await fetchPosts();
  return posts.slice(0, count);
}

/**
 * Resets the in-memory cache. Useful for tests or force re-fetching.
 */
export function clearBlogCache() {
  postsCache = null;
  activeSource = null;
}
