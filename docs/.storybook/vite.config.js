import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.CI': JSON.stringify(process.env.CI),
      },
      optimizeDeps: {
        include: ['@emotion/react'],
      },
      resolve: {
        dedupe: ['@emotion/react'],
      },
      plugins: [
        react({
          jsxImportSource: '@emotion/react',
          babel: {
            plugins: ['@emotion/babel-plugin'],
          },
        }),
      ],
    },
  },
});
