import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit from 500 KB to 1MB (optional)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Extract each dependency into its own chunk
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        }
      }
    }
  }
});
