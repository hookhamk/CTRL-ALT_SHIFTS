import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/signUp': {target: 'http://localhost:3001'},
      '/auth': {target: 'http://localhost:3001'},
      '/api': {target: 'http://localhost:3001'}
    }
  },
});
