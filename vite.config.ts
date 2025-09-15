import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      features: path.resolve(__dirname, 'src/features'),
      shared: path.resolve(__dirname, 'src/shared'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      context: path.resolve(__dirname, 'src/context'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
});
