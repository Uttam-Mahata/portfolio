import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/hashnode': {
        target: 'https://gql.hashnode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hashnode/, ''),
      }
    }
  }
})
