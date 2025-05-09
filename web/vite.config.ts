import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(config => {
  const env = loadEnv(config.mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_SERVER,
          changeOrigin: true,
        }
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './tests/setup.ts'
    }
  }
})