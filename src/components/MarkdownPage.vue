<template>
  <div class="markdown-page">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading {{ title }}...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <h2>Error Loading {{ title }}</h2>
      <p>{{ error }}</p>
    </div>
    
    <article v-else class="markdown-content" v-html="renderedContent"></article>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)

export default {
  name: 'MarkdownPage',
  props: {
    file: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Page'
    }
  },
  data() {
    return {
      content: '',
      loading: true,
      error: null,
      renderedContent: ''
    }
  },
  async mounted() {
    await this.loadMarkdown()
    this.updatePageTitle()
  },
  watch: {
    file: async function(newFile) {
      await this.loadMarkdown()
    }
  },
  methods: {
    async loadMarkdown() {
      this.loading = true
      this.error = null
      
      try {
        // Fetch markdown content
        const response = await fetch(this.file)
        if (!response.ok) {
          throw new Error(`Failed to load ${this.file}: ${response.statusText}`)
        }
        
        this.content = await response.text()
        this.renderMarkdown()
        
      } catch (err) {
        this.error = err.message
        console.error('Error loading markdown:', err)
      } finally {
        this.loading = false
      }
    },
    
    renderMarkdown() {
      // Initialize markdown-it with syntax highlighting
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                     '</code></pre>'
            } catch (__) {}
          }
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
        }
      })
      
      this.renderedContent = md.render(this.content)
    },
    
    updatePageTitle() {
      if (this.title) {
        document.title = `${this.title} - OCTOPATH COTC META GUIDE`
      }
    }
  }
}
</script>

<style scoped>
.markdown-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.loading-state, .error-state {
  text-align: center;
  padding: 48px 24px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #ddd;
  border-top: 3px solid #4a9eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  color: var(--red-500);
}

/* Markdown Content Styles */
.markdown-content {
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.markdown-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
  color: var(--text-primary);
}

.markdown-content :deep(h2) {
  font-size: 2rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem 0;
  color: var(--text-primary);
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.25rem 0 0.5rem 0;
  color: var(--text-primary);
}

.markdown-content :deep(h4) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
  color: var(--text-primary);
}

.markdown-content :deep(p) {
  margin: 0.75rem 0;
}

.markdown-content :deep(ul), .markdown-content :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin: 0.25rem 0;
}

.markdown-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--primary-color);
  background: var(--bg-secondary);
  border-radius: 0 4px 4px 0;
}

.markdown-content :deep(code) {
  background: var(--bg-primary);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: var(--text-primary);
}

.markdown-content :deep(pre) {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow-x: auto;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.9rem;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.markdown-content :deep(th), .markdown-content :deep(td) {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  text-align: left;
}

.markdown-content :deep(th) {
  background: var(--bg-primary);
  font-weight: 600;
}

.markdown-content :deep(tr:nth-child(even)) {
  background: var(--bg-primary);
}

.markdown-content :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(strong) {
  font-weight: 600;
}

.markdown-content :deep(em) {
  font-style: italic;
}

/* Responsive design */
@media (max-width: 768px) {
  .markdown-page {
    padding: 16px;
  }
  
  .markdown-content :deep(h1) {
    font-size: 2rem;
  }
  
  .markdown-content :deep(h2) {
    font-size: 1.75rem;
  }
  
  .markdown-content :deep(pre) {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
}
</style>