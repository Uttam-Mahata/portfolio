# Project: Portfolio Blog System Integration

## Architecture
React 19 + Vite + TailwindCSS v4 application.
- **State & Theme**: `src/context/ThemeContext.jsx` with dynamic CSS variables (`--theme-primary`, etc.)
- **Routing**: `react-router-dom` v7 in `src/App.jsx`
- **Content Pipeline**: `src/services/blogService.js` (fetches metadata & markdown from jsDelivr / local `/blog-posts/`)
- **Rendering Engine**: `src/components/blog/MarkdownRenderer.jsx` with syntax highlighting, Mermaid SVG rendering, KaTeX math rendering, sticky Table of Contents.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Content Pipeline & Dependencies | npm packages, public/blog-posts mock data, blogService | none | PLANNED |
| 2 | M2: Blog List Page | /blogs route, search, tag filter, card grid | M1 | PLANNED |
| 3 | M3: Blog Detail Page & Rendering | /blogs/:slug route, MarkdownRenderer, ToC, Mermaid, KaTeX | M1 | PLANNED |
| 4 | M4: Nav & Home Integration | Navbar.jsx Link, home page 3-post preview, theme support | M2, M3 | PLANNED |
| 5 | M5: E2E Test & Verification Track | Build check, test runner, full criteria validation | M1-M4 | PLANNED |

## Interface Contracts
### `blogService` API
- `fetchPosts()` -> `Promise<Array<BlogPostMetadata>>`
- `fetchPostBySlug(slug)` -> `Promise<{ metadata: BlogPostMetadata, content: string } | null>`
- `getRecentPosts(count)` -> `Promise<Array<BlogPostMetadata>>`

### Metadata Schema (`metadata.json`)
```json
[
  {
    "slug": "docker-namespaces",
    "title": "How Docker Uses Linux Namespaces",
    "description": "Deep dive into Linux namespaces...",
    "date": "2026-07-20",
    "readingTime": 8,
    "category": "DevOps",
    "tags": ["Linux", "Docker", "Containers"],
    "cover": "/blog-posts/images/docker-namespaces.png"
  }
]
```

## Code Layout
- `public/blog-posts/metadata.json`: Blog post index metadata
- `public/blog-posts/posts/*.md`: Markdown files for blog posts
- `public/blog-posts/images/*`: Cover images for blog posts
- `src/services/blogService.js`: Data fetching layer
- `src/components/blog/MarkdownRenderer.jsx`: Markdown parsing & rich custom components
- `src/components/blog/MermaidDiagram.jsx`: Client-side Mermaid rendering component
- `src/components/blog/TableOfContents.jsx`: Sticky TOC generator
- `src/components/blog/BlogCard.jsx`: Post card component for list & home preview
- `src/pages/BlogList.jsx`: Main `/blogs` page
- `src/pages/BlogDetail.jsx`: Main `/blogs/:slug` page
- `src/components/layout/Navbar.jsx`: Updated navbar with Blog link
- `src/components/home/Writing.jsx`: Home page recent posts preview
