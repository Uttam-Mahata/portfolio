import { fetchPosts, fetchPostBySlug, getRecentPosts, clearBlogCache } from './blogService.js';

async function testBlogService() {
  console.log('Testing blogService.js...');

  const mockMetadata = [
    {
      slug: 'docker-namespaces',
      title: 'How Docker Uses Linux Namespaces',
      description: 'Deep dive...',
      date: '2026-07-20',
      readingTime: 8,
      category: 'DevOps',
      tags: ['Linux', 'Docker'],
      cover: '/blog-posts/images/docker-namespaces.png'
    },
    {
      slug: 'k8s-networking-deep-dive',
      title: 'Kubernetes Networking Deep Dive',
      description: 'Master the K8s network model...',
      date: '2026-07-25',
      readingTime: 12,
      category: 'Kubernetes',
      tags: ['Kubernetes', 'Networking'],
      cover: '/blog-posts/images/k8s-networking-deep-dive.png'
    }
  ];

  const mockPostContent = `---
slug: docker-namespaces
title: How Docker Uses Linux Namespaces
---

# How Docker Uses Linux Namespaces

Containers are process isolation.`;

  globalThis.fetch = async (url) => {
    if (url.includes('metadata.json')) {
      return {
        ok: true,
        json: async () => mockMetadata
      };
    }
    if (url.includes('docker-namespaces.md')) {
      return {
        ok: true,
        text: async () => mockPostContent
      };
    }
    return { ok: false, status: 404 };
  };

  clearBlogCache();

  // Test 1: fetchPosts
  const posts = await fetchPosts();
  if (posts.length !== 2) throw new Error('fetchPosts should return 2 posts');
  if (posts[0].slug !== 'k8s-networking-deep-dive') throw new Error('Posts should be sorted newest first');
  console.log('✔ fetchPosts passed');

  // Test 2: fetchPostBySlug
  const post = await fetchPostBySlug('docker-namespaces');
  if (!post) throw new Error('fetchPostBySlug should return post');
  if (post.content !== '# How Docker Uses Linux Namespaces\n\nContainers are process isolation.') {
    throw new Error(`Frontmatter stripping failed. Received: ${JSON.stringify(post.content)}`);
  }
  console.log('✔ fetchPostBySlug passed');

  // Test 3: getRecentPosts
  const recent = await getRecentPosts(1);
  if (recent.length !== 1) throw new Error('getRecentPosts(1) should return 1 post');
  if (recent[0].slug !== 'k8s-networking-deep-dive') throw new Error('getRecentPosts should return newest post');
  console.log('✔ getRecentPosts passed');

  console.log('ALL BLOG SERVICE TESTS PASSED!');
}

testBlogService().catch((err) => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
