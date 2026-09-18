import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../context/ThemeContext';
import { Copy, Check } from 'lucide-react';

// A custom code block component to handle mermaid and regular code
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const isMermaid = match && match[1] === 'mermaid';
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isMermaid) {
    return <MermaidChart chart={codeString} theme={theme} />;
  }

  if (!inline && match) {
    return (
      <div className="relative group rounded-md my-6 overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center bg-gray-100 dark:bg-[#1e1e1e] px-4 py-2 border-b border-gray-200 dark:border-gray-700/50">
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{match[1]}</span>
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <SyntaxHighlighter
          style={theme === 'dark' ? vscDarkPlus : vs}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: 0, borderRadius: 0 }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className="bg-gray-100 dark:bg-gray-800 text-pink-500 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  );
};

// Component for rendering mermaid diagrams
const MermaidChart = ({ chart, theme }) => {
  const [svgCode, setSvgCode] = useState('');
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const renderChart = async () => {
      setSvgCode('');
      setRenderError(null);
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
        });

        // Mermaid v10/v11: needs a real DOM node appended to body
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.visibility = 'hidden';
        document.body.appendChild(container);

        try {
          const { svg } = await mermaid.render(id, chart, container);
          if (!cancelled) setSvgCode(svg);
        } finally {
          if (document.body.contains(container)) {
            document.body.removeChild(container);
          }
        }
      } catch (error) {
        console.error('Mermaid render error:', error);
        if (!cancelled) setRenderError(error.message || 'Failed to render diagram');
      }
    };
    renderChart();
    return () => { cancelled = true; };
  }, [chart, theme]);

  if (renderError) {
    return (
      <div className="my-8 p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <p className="text-xs font-mono text-red-500 dark:text-red-400">Diagram render error: {renderError}</p>
        <pre className="mt-2 text-xs text-gray-500 dark:text-gray-400 overflow-auto whitespace-pre-wrap">{chart}</pre>
      </div>
    );
  }

  return (
    <div className="my-8 overflow-x-auto bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
      {svgCode ? (
        <div
          className="mermaid-svg-wrapper"
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: svgCode }}
        />
      ) : (
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm py-8 justify-center">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading diagram...
        </div>
      )}
    </div>
  );
};

// Heading renderer to inject IDs
const HeadingRenderer = (props) => {
  const children = React.Children.toArray(props.children);
  const text = children.reduce((acc, child) => {
    if (typeof child === 'string') return acc + child;
    if (React.isValidElement(child) && child.props.children) {
        return acc + child.props.children;
    }
    return acc;
  }, '');
  
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const Tag = `h${props.level}`;
  
  return <Tag id={id} {...props} className="group relative scroll-mt-24">{props.children}</Tag>;
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none
      text-gray-900 dark:text-gray-100
      prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
      prose-p:text-gray-700 dark:prose-p:text-gray-200
      prose-li:text-gray-700 dark:prose-li:text-gray-200
      prose-strong:text-gray-900 dark:prose-strong:text-white
      prose-a:text-blue-600 dark:prose-a:text-blue-400
      prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
      prose-img:rounded-lg prose-img:shadow-md
      prose-blockquote:border-l-4
      prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
      prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50
      prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
      prose-table:border-collapse prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700
      prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700
      prose-th:p-2 prose-td:p-2 prose-th:bg-gray-100 dark:prose-th:bg-gray-800"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: CodeBlock,
          h1: (props) => <HeadingRenderer level={1} {...props} />,
          h2: (props) => <HeadingRenderer level={2} {...props} />,
          h3: (props) => <HeadingRenderer level={3} {...props} />,
          h4: (props) => <HeadingRenderer level={4} {...props} />,
          h5: (props) => <HeadingRenderer level={5} {...props} />,
          h6: (props) => <HeadingRenderer level={6} {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
