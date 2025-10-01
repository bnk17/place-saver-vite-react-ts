/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
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
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    // Include only integration tests (unit and component tests)
    include: ['src/tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    // Explicitly exclude e2e tests to avoid conflicts with Playwright
    exclude: ['src/tests/e2e/**/*', 'node_modules/**/*'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['src/tests/**/*', 'src/**/*.d.ts'],
    },
  },
});
